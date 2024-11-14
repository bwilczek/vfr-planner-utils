import { DataSource } from "typeorm"
import { NavPoint } from "./entities/nav_point.js"

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "vfr",
  password: "vfr",
  database: "vfr",
  synchronize: false,
  logging: false,
  entities: [NavPoint]
})
