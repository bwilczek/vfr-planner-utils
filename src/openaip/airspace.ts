import { dataSource } from "../data_source.js"
import { Airspace } from "../entities/airspace.js"
import { AirspacePayload } from "./types/airspace.js"

const fetchAirspaces = async (): Promise<Array<AirspacePayload>> => {
  return []
}

export const importAirspaces = async () => {
  await dataSource.initialize()
  const airspaceRepository = dataSource.getRepository(Airspace)

  await airspaceRepository.clear()

  const airspaces = await fetchAirspaces()

  for await (const airspace of airspaces) {
    console.log(`Inserting ${airspace.name}`)
    // await airspaceRepository.insert(buildAirspaceFromPayload(airspace))
  }

  await dataSource.destroy()
}
