import { DataSource } from "typeorm"
import { NavPoint } from "./entities/nav_point.js"
import { Airspace } from "./entities/airspace.js"
import { ActiveAirspace } from "./entities/active_airspace.js"

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST ?? "localhost",
  port: parseInt(process.env.MYSQL_PORT ?? "3306"),
  username: process.env.MYSQL_USER ?? "vfr",
  password: process.env.MYSQL_PASSWORD ?? "vfr",
  database: process.env.MYSQL_DATABASE ?? "vfr",
  synchronize: false,
  logging: process.env.MYSQL_LOGGING ? true : false,
  entities: [NavPoint, Airspace, ActiveAirspace]
})
