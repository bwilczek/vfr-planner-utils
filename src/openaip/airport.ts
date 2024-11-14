import { Kind, NavPoint, Status, AerodromeKinds } from "../entities/nav_point.js"
import axios from 'axios'
import { AirportPayload, Type } from "./types/airport.js"
import { readFileSync } from "node:fs"
import { dataSource } from "../data_source.js"
import { In } from "typeorm"

type AirportsPayload = {
  limit: string,
  totalCount: number,
  totalPages: number,
  page: number,
  items: Array<AirportPayload>
}

const fetchAirports = async (): Promise<Array<AirportPayload>> => {
  // curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API_TOKEN" 'https://api.core.openaip.net/api/airports?page=1&limit=1&sortBy=name&sortDesc=true&country=PL&searchOptLwc=true&fields=name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways&search=EPWS' 
  // Content-Type: application/json"
  // "x-openaip-api-key: $OPENAIP_API_TOKEN" 
  // 'https://api.core.openaip.net/api/airports
  // page=1
  // limit=1000
  // sortBy=name
  // sortDesc=true
  // country=PL
  // searchOptLwc=true
  // fields=name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-openaip-api-key": process.env.OPENAIP_API_TOKEN
    },
    params: {
      "page": 1,
      "limit": 1000,
      "sortBy": "name",
      "sortDesc": true,
      "country": "PL",
      "searchOptLwc": true,
      // "search": "EPWS",
      "fields": "name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways"
    }
  }

  const data: AirportsPayload = await (await axios.get("https://api.core.openaip.net/api/airports", config)).data
  return data.items as Array<AirportPayload>
}

const fetchAirportsFromFile = (path: string): Array<AirportPayload> => {
  const rawJson = readFileSync(path).toString()
  return JSON.parse(rawJson).items as Array<AirportPayload>
}

const buildElevationString = (elevationInMeters: number | undefined): string | null => {
  if(!elevationInMeters) return null

  const elevationInFeet = Math.round(elevationInMeters * 3.28084)
  return `${elevationInFeet}ft (${elevationInMeters}m)`
}

const buildRadioString = (frequencies: AirportPayload["frequencies"]): string | null => {
  if(!frequencies) return null

  const primaryFrequency = frequencies.find( f => f.primary )
  if(!primaryFrequency) return null

  return `${primaryFrequency?.value} MHz (${primaryFrequency?.name})`
}

const mapOpenAipTypeToNavPointKind = (openAipType: Type | undefined): Kind => {
  if(openAipType === undefined) return Kind.OTHER_AIRSTRIP

  switch(openAipType) {
    case Type.Airport:
    case Type.InternationalAirport:
    case Type.AirportRespAirfieldIfr:
      return Kind.CONTROLLED
    case Type.CivilAirfield:
      return Kind.UNCONTROLLED
    case Type.MilitaryHeliport:
    case Type.MilitaryAerodrome:
      return Kind.MILITARY
    case Type.CivilHeliport:
      return Kind.HELIPAD
    case Type.LandingStrip:
    case Type.UltraLightFlyingSite:
    case Type.GliderSite:
      return Kind.AIRSTRIP
    }
  return Kind.OTHER_AIRSTRIP
}

const buildDescription = (payload: AirportPayload): string => {
  let ret = ""
  ret += `Żródło danych: <a href="https&colon;//www.openaip.net/data/airports/${payload._id}">OpenAIP</a><br /><br />`
  if(payload.icaoCode) {
    ret += `Kod ICAO: ${payload.icaoCode}<br /><br />`
  }
  ret += `Elewacja: ${buildElevationString(payload.elevation?.value)}<br /><br />`
  ret += "Drogi startowe:<br />"
  payload.runways?.forEach((runway) => {
    if(runway.mainRunway) ret += '<strong>'
    ret += ` - ${runway.designator} (${runway.dimension.length.value}m x ${runway.dimension.width.value}m)<br />`
    if(runway.mainRunway) ret += '</strong>'
  })

  if(payload.frequencies) {
    ret += "<br />Radio: "
  }
  return ret
}

const buildAirportNavPointFromPayload = (payload: AirportPayload): NavPoint => {
  const airport = new NavPoint()
  airport.name = payload.name || null
  airport.lat = payload.geometry?.coordinates[1] || null
  airport.lng = payload.geometry?.coordinates[0] || null
  airport.kind = mapOpenAipTypeToNavPointKind(payload.type)
  airport.status = Status.ACTIVE
  airport.height = null
  airport.elevation = buildElevationString(payload.elevation?.value)
  airport.icaoCode = payload.icaoCode || null
  airport.description = buildDescription(payload)
  airport.radio = buildRadioString(payload.frequencies)
  airport.country = 'pl'
  airport.declination = payload.magneticDeclination || null
  airport.createdAt = new Date()
  airport.updatedAt = new Date()
  return airport
}

export const importAirports = async () => {
  await dataSource.initialize()
  const navPointRepository = dataSource.getRepository(NavPoint)

  await navPointRepository.delete({kind: In(AerodromeKinds)})

  const airports = await fetchAirports()

  console.log(`Fetched ${airports.length} airports`)

  for await (const airport of airports) {
    console.log(`Inserting ${airport.name}`)
    await navPointRepository.insert(buildAirportNavPointFromPayload(airport))
  }

  await dataSource.destroy()
}