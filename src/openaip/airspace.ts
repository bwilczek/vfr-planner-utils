import { readFileSync } from "node:fs"
import { dataSource } from "../data_source.js"
import { ActiveAirspace } from "../entities/active_airspace.js"
import { Airspace } from "../entities/airspace.js"
import { fetchFromOpenAip } from "../openaip_fetch.js"
import { AirspacePayload } from "./types/airspace.js"

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

const buildAirspaceFromPayload = (payload: AirspacePayload): Airspace => {
  const airspace = new Airspace()
  airspace.name = sanitizeName(payload.name)
  return airspace
}

export const importAirspaces = async () => {
  await dataSource.initialize()
  const airspaceRepository = dataSource.getRepository(Airspace)
  const activeAirspaceRepository = dataSource.getRepository(ActiveAirspace)

  await activeAirspaceRepository.clear()
  await airspaceRepository.delete({})

  // const airspaces = await fetchAirspaces()
  const airspaces: Array<AirspacePayload> = fetchAirspacesFromFile('tmp/all_airspaces_pl.json')
  let airspace: Airspace

  for (const payload of airspaces) {
    // console.log(`---`)
    // console.log(`Inserting ${payload._id} ${payload.name}`)
    airspace = buildAirspaceFromPayload(payload)
    console.log(`Inserting ${payload._id} ${airspace.name}`)
    // await airspaceRepository.insert(buildAirspaceFromPayload(airspace))
  }

  await dataSource.destroy()
}
