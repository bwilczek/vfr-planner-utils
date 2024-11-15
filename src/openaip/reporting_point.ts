import axios from "axios"
import { DataSource } from "typeorm"
import { dataSource } from "../data_source.js"
import { Kind, NavPoint, Status } from "../entities/nav_point.js"
import { fetchFromOpenAip } from "../openaip_fetch.js"
import { fetchSimplifiedAirportsDictionary } from "./airport.js"
import { ReportingPointPayload } from "./types/reporting_point.js"

type ReportingPointsPayload = {
  limit: string,
  totalCount: number,
  totalPages: number,
  page: number,
  items: Array<ReportingPointPayload>
}

const fetchReportingPoints = async ():Promise<Array<ReportingPointPayload>> => {
  const fields = "name,geometry,airports"
  return await fetchFromOpenAip<ReportingPointsPayload, ReportingPointPayload>("reporting-points", {fields})
}

const getMagneticDeclinationForLatLng = async (lat: number | null, lng: number | null): Promise<number | null> => {
  const sql = `select avg(declination) as declination from mag_declinations
      where lat in (floor(${lat}), ceil(${lat}))
      and lng in (floor(${lng}), ceil(${lng}))`
  const result = await dataSource.query(sql)
  return parseFloat(JSON.parse(JSON.stringify(result))[0]['declination'])
}

const buildDescription = (simplifiedAirports: Record<string, string>, airports: Array<string>): string => {
  let ret = ""
  for(const airportId of airports) {
    ret += `${simplifiedAirports[airportId]} <br />`
  }
  return ret
}

const buildReportingPointNavPointFromPayload = async (payload: ReportingPointPayload, simplifiedAirports: Record<string, string>): Promise<NavPoint> => {
  const airport = new NavPoint()
  const lat = payload.geometry?.coordinates[1] || null
  const lng = payload.geometry?.coordinates[0] || null
  airport.name = payload.name || null
  airport.lat = lat
  airport.lng = lng
  airport.kind = Kind.VFR_POINT
  airport.status = Status.ACTIVE
  airport.height = null
  airport.elevation = null
  airport.icaoCode = null
  airport.description = payload._id ? buildDescription(simplifiedAirports, payload.airports || []) : ""
  airport.radio = null
  airport.country = 'pl'
  airport.declination = await getMagneticDeclinationForLatLng(lat, lng)
  airport.createdAt = new Date()
  airport.updatedAt = new Date()
  return airport
}

export const importReportingPoints = async () => {
  await dataSource.initialize()

  const navPointRepository = dataSource.getRepository(NavPoint)

  await navPointRepository.delete({kind: Kind.VFR_POINT})

  const points = await fetchReportingPoints()
  const simplifiedAirports = await fetchSimplifiedAirportsDictionary()

  console.log(`Fetched ${points.length} points`)

  for await (const point of points) {
    console.log(`Inserting ${point.name}`)
    await navPointRepository.insert(await buildReportingPointNavPointFromPayload(point, simplifiedAirports))
  }

  await dataSource.destroy()
}
