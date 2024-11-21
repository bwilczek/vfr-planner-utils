
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Kind } from "./nav_point.js"

export enum Status {
  FIS,
  ATZ,
  CTR,
  MCTR,
  MATZ,
  PROHIBITED,
  RESTRICTED,
  DANGER,
  TRA,
  TSA,
  EA,
  TMA,
  MRT,
  TFR,
  RMZ,
  ADIZ,
  OTHER,
  NOTAM_POINT,
  IGNORE
}

/*
| airspaces | CREATE TABLE `airspaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `kind` int(11) DEFAULT NULL,
  `country` varchar(6) DEFAULT NULL,
  `points` text,
  `description` text,
  `level_min` int(11) DEFAULT NULL,
  `level_max` int(11) DEFAULT NULL,
  `permanent` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `designator` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_airspaces_on_country` (`country`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 |

create_table "airspaces", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
  t.string   "name"
  t.integer  "kind"
  t.string   "country",     limit: 6
  t.text     "points",      limit: 65535
  t.text     "description", limit: 65535
  t.integer  "level_min"
  t.integer  "level_max"
  t.boolean  "permanent"
  t.datetime "created_at",                null: false
  t.datetime "updated_at",                null: false
  t.string   "designator",  limit: 32
  t.index ["country"], name: "index_airspaces_on_country", using: :btree
end
enum kind: [:fis, :atz, :ctr, :mctr, :matz, :prohibited, :restricted,
            :danger, :tra, :tsa, :ea, :tma, :mrt, :tfr, :rmz, :adiz, :other, :notam_point, :ignore]
*/

@Entity("airspaces")
export class Airspace {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("varchar")
  name: string | null

  @Column("int")
  kind: Kind | null

  @Column("varchar")
  country: string | null

  @Column("text")
  points: string | null

  @Column("text")
  description: string | null

  @Column("int", {name: "level_min"})
  levelMin: number | null

  @Column("int", {name: "level_max"})
  levelMax: number | null

  @Column("tinyint")
  permanent: number | null

  @CreateDateColumn({name: "created_at"})
  createdAt: Date | null

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date | null

  @Column("varchar")
  designator: string | null

  constructor() {
    this.name = null
    this.kind = null
    this.country = null
    this.points = null
    this.description = null
    this.levelMin = null
    this.levelMax = null
    this.permanent = null
    this.createdAt = null
    this.updatedAt = null
    this.designator = null
  }  
}
