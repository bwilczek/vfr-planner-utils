import { In } from "typeorm"
import { dataSource } from "../data_source.js"
import { Kind, NavAidKinds, NavPoint, Status } from "../entities/nav_point.js"
import { fetchFromOpenAip } from "../openaip_fetch.js"
import { FrequencyUnitType, NavAidPaylod, NavAidType } from "./types/navaid.js"
import { buildElevationString } from "./airport.js"

const fetchNavAids = async ():Promise<Array<NavAidPaylod>> => {
  const fields = "name,identifier,type,channel,frequency,geometry,magneticDeclination,elevation"
  return await fetchFromOpenAip<NavAidPaylod>("navaids", {fields})
}

// export enum FrequencyUnitType {
//   kHz,
//   MHz
// }

const mapOpenAipTypeToNavPointKind = (openAipType: Type | undefined): Kind => {
  if(openAipType === undefined) return Kind.VOR

  switch(openAipType) {
    case NavAidType.DME:
      return Kind.DME
    case NavAidType.NDB:
      return Kind.NDB
    case NavAidType.TACAN:
    case NavAidType.VOR:
    case NavAidType.VORTAC:
    case NavAidType.DVOR:
    case NavAidType.DVORTAC:
      return Kind.VOR
    case NavAidType.VOR_DME:
    case NavAidType.DVOR_DME:
      return Kind.VOR_DME
    }
  return Kind.VOR
}

const buildRadioString = (frequency: NavAidPaylod["frequency"]): string | null => {
  if(!frequency) return null

  return `${frequency?.value} ${FrequencyUnitType[frequency?.unit]}`
}

const buildDescription = (payload: NavAidPaylod): string | null => {
  let ret = ""
  ret += `Żródło danych: <a href="https&colon;//www.openaip.net/data/navaids/${payload._id}" target="_blank">OpenAIP</a><br /><br />`
  ret += `Częstotliwość: ${buildRadioString(payload.frequency)}<br />`
  ret += `Kanał: ${payload.channel}<br />`
  ret += `Elewacja: ${buildElevationString(payload.elevation?.value)}<br /><br />`
  return ret
}

const buildNavAidNavPointFromPayload = (payload) => {
  const navpoint = new NavPoint()
  navpoint.name = `${payload.identifier} (${payload.name})` || null
  navpoint.lat = payload.geometry?.coordinates[1] || null
  navpoint.lng = payload.geometry?.coordinates[0] || null
  navpoint.kind = mapOpenAipTypeToNavPointKind(payload.type)
  navpoint.status = Status.ACTIVE
  navpoint.height = null
  navpoint.elevation = buildElevationString(payload.elevation?.value)
  navpoint.icaoCode = payload.icaoCode || null
  navpoint.description = buildDescription(payload)
  navpoint.radio = buildRadioString(payload.frequency)
  navpoint.country = 'pl'
  navpoint.declination = payload.magneticDeclination || null
  navpoint.createdAt = new Date()
  navpoint.updatedAt = new Date()
  return navpoint
}

export const importNavAids = async () => {
  await dataSource.initialize()
  const navPointRepository = dataSource.getRepository(NavPoint)

  await navPointRepository.delete({kind: In(NavAidKinds)})

  const navaids = await fetchNavAids()

  for await (const navaid of navaids) {
    console.log(`Inserting ${navaid.name}`)
    await navPointRepository.insert(buildNavAidNavPointFromPayload(navaid))
  }

  await dataSource.destroy()
}
