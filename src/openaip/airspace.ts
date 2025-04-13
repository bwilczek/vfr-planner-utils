import { readFileSync } from "node:fs"
import { dataSource } from "../data_source.js"
import { ActiveAirspace } from "../entities/active_airspace.js"
import { Airspace, Kind } from "../entities/airspace.js"
import { fetchFromOpenAip } from "../openaip_fetch.js"
import { AirspacePayload, VerticalLimitDatum, VerticalLimitUnit, Type } from "./types/airspace.js"

const fetchAirspaces = async (): Promise<Array<AirspacePayload>> => {
  // curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API_TOKEN" 'https://api.core.openaip.net/api/airspaces?page=1&limit=1&fields=name,icaoClass,activity,type,geometry,country,upperLimit,lowerLimit&sortBy=name&sortDesc=true&country=PL&searchOptLwc=true'
  const fields = "name,icaoClass,activity,type,geometry,country,upperLimit,lowerLimit"
  return await fetchFromOpenAip<AirspacePayload>("airspaces", {fields})
}

const fetchAirspacesFromFile = (path: string): Array<AirspacePayload> => {
  const rawJson = readFileSync(path).toString()
  return JSON.parse(rawJson).items as Array<AirspacePayload>

}

const sanitizeName = (name: string | undefined): string | null => {
  if(!name) return null

  let ret = name
  const substitutions = {
    "ÅÄKI KOÅCIELNE": "ŁĘKI KOŚCIELNE",
    "BAÅTRUCIE/KÄTRZYN": "BAŁTRUCIE/KĘTRZYN",
    "KRÄPA K/SÅUPSKA": "KRĘPA K/SŁUPSKA",
    "OKÄCIE": "OKĘCIE",
    "WÄDRZYN": "WĘDRZYN",
    "SULÄCIN": "SULĘCIN",
    "ÅWI": "ŚWI",
    "ÅC": "ŚC",
    "Å»": "Ż",
    "Å": "Ł",
    "Ä": "Ą",
    "ÄT": "ĘT",
    "Ä": "Ę",
    "Å": "Ś",
    "Ã": "Ó",
  }

  for (const [pattern, replacement] of Object.entries(substitutions)) {
    ret = ret.replaceAll(pattern, replacement)
  }

  return ret
}

const mapOpenAipTypeToKind = (openAipType: Type | undefined): Kind => {
  if(openAipType === undefined) return Kind.OTHER

  switch(openAipType) {
    case Type.Other:
      return Kind.OTHER
    case Type.Restricted:
      return Kind.RESTRICTED
    case Type.Danger:
      return Kind.DANGER
    case Type.Prohibited:
      return Kind.PROHIBITED
    case Type.CTR: // Controlled Tower Region
      return Kind.CTR
    case Type.TMA: // Terminal Maneuvering Area
      return Kind.TMA
    case Type.TRA: // Temporary Reserved Area
      return Kind.TRA
    case Type.TSA: // Temporary Segregated Area
      return Kind.TSA
    case Type.ADIZ: // Air Defense Identification Zone
      return Kind.ADIZ
    case Type.MATZ: // Military Airport Traffic Zone
      return Kind.MATZ
    case Type.MRT: // Military Route
      return Kind.MRT
    case Type.TFR: // TSA/TRA Feeding Route
      return Kind.TFR
    case Type.ATZ: // Airport Traffic Zone
      return Kind.ATZ
    case Type.MTR: // Military Training Route
    case Type.MTA: // Military Training Area
    case Type.GlidingSector:
      return Kind.OTHER
    case Type.RMZ: // Radio Mandatory Zone
      return Kind.RMZ
    case Type.FIR: // Flight Information Region
    case Type.TMZ: // Transponder Mandatory Zone
    case Type.UIR: // Upper Flight Information Region
    case Type.Airway:
    case Type.AlertArea:
    case Type.WarningArea:
    case Type.ProtectedArea:
    case Type.HTZ: // Helicopter Traffic Zone
    case Type.TRP: // Transponder Setting
    case Type.TIZ: // Traffic Information Zone
    case Type.TIA: // Traffic Information Area
    case Type.CTA: // Control Area
    case Type.ACC: // ACC Sector
    case Type.AerialSportingOrRecreationalActivity:
    case Type.LowAltitudeOverflightRestriction:
    case Type.VFRSector:
    case Type.FISSector:
    case Type.LTA: // Lower Traffic Area
    case Type.UTA:// Upper Traffic Area
      return Kind.IGNORE
  }
  return Kind.IGNORE
}

type VerticalLimit = {
  value: number
  unit: VerticalLimitUnit
  referenceDatum: VerticalLimitDatum
}

const convertLevel = (limit: VerticalLimit | undefined): number => {
  if(limit === undefined) return 0

  let ret: number = limit.value

  if(limit.unit === VerticalLimitUnit.Meter) {
    ret = ret * 3.28
  } else if(limit.unit === VerticalLimitUnit.FlightLevel) {
    ret = ret * 100
  }

  return ret;
}

const convertPoints = (input: Array<Array<[number, number]>> | undefined): string => {
  if(input === undefined) return ""

  let polygon = input[0]
  if(polygon === undefined) return ""

  return polygon
    .map(([lng, lat]) => `${lng},${lat}`)
    .join(' ');
}

const buildDesignator = (name: string | null): string | null => {
  if(name === null) return null

  // # AUP        : openaip
  // # EPTR99       EPTR12
  // # EPTRA10B     EPTR10B
  // # ATZ EPSY     ATZ EPSY
  // # ATZ EPWSA    ATZ EPWS A
  // # EPD21        D54 MIERZEJA
  // # EPTS12
  // # EPTS12B
  // # EPR161

  let match = name.match(/^ATZ\s([A-Z]{4})\s?([A-Z]?[0-9]?)$/);
  if (match) {
    const [, icao, suffix] = match;
    return `ATZ ${icao}${suffix}`;
  }

  match = name.match(/^D\d+/);
  if (match) {
    return `EP${match[0].slice(1)}`;
  }

  return name
}

const buildAirspaceFromPayload = (payload: AirspacePayload): Airspace => {
  const PermanentKinds = [Kind.CTR, Kind.RESTRICTED, Kind.PROHIBITED, Kind.TMA, Kind. ADIZ, Kind.RMZ]
  const airspace = new Airspace()
  airspace.name = sanitizeName(payload.name)
  airspace.kind = mapOpenAipTypeToKind(payload.type)
  airspace.country = 'pl'
  airspace.points = convertPoints(payload.geometry?.coordinates)
  airspace.description = airspace.name
  airspace.levelMin = convertLevel(payload.lowerLimit)
  airspace.levelMax = convertLevel(payload.upperLimit)
  airspace.permanent = PermanentKinds.includes(airspace.kind) ? 1 : 0
  airspace.createdAt = new Date()
  airspace.updatedAt = new Date()
  airspace.designator = buildDesignator(airspace.name)

  return airspace
}

export const importAirspaces = async () => {
  await dataSource.initialize()
  const airspaceRepository = dataSource.getRepository(Airspace)
  const activeAirspaceRepository = dataSource.getRepository(ActiveAirspace)

  await activeAirspaceRepository.clear()
  await airspaceRepository.delete({})

  const airspaces = await fetchAirspaces()
  // const airspaces: Array<AirspacePayload> = fetchAirspacesFromFile('tmp/all_airspaces_pl.json')
  let airspace: Airspace

  for (const payload of airspaces) {
    // console.log(`---`)
    // console.log(`Inserting ${payload._id} ${payload.name}`)
    airspace = buildAirspaceFromPayload(payload)
    console.log(`Inserting ${payload._id} ${airspace.name} ${airspace.designator}`)
    await airspaceRepository.insert(airspace)
  }

  await dataSource.destroy()
}
