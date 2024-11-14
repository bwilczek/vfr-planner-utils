import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

/**
create_table "nav_points", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
  t.string   "name"
  t.float    "lat",         limit: 24
  t.float    "lng",         limit: 24
  t.integer  "kind"
  t.integer  "status"
  t.string   "height"
  t.string   "elevation"
  t.string   "icao_code"
  t.text     "description", limit: 65535
  t.string   "radio"
  t.datetime "created_at",                null: false
  t.datetime "updated_at",                null: false
  t.string   "country",     limit: 6
  t.float    "declination", limit: 24
  t.index ["country"], name: "index_nav_points_on_country", using: :btree
end
enum kind: [:controlled, :uncontrolled, :military, :airstrip, :helipad, :vfr_point, :ifr_point, :vor, :ndb, :vor_dme, :dme, :other_airstrip]
enum status: [:active, :inactive]


| nav_points | CREATE TABLE `nav_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `kind` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `elevation` varchar(255) DEFAULT NULL,
  `icao_code` varchar(255) DEFAULT NULL,
  `description` text,
  `radio` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `country` varchar(6) DEFAULT NULL,
  `declination` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_nav_points_on_country` (`country`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 |

*/

export enum Status {
  ACTIVE,
  INACTIVE
}

export enum Kind {
  CONTROLLED,
  UNCONTROLLED,
  MILITARY,
  AIRSTRIP,
  HELIPAD,
  VFR_POINT,
  IFR_POINT,
  VOR,
  NDB,
  VOR_DME,
  DME,
  OTHER_AIRSTRIP
}

export const AerodromeKinds = [
  Kind.CONTROLLED,
  Kind.UNCONTROLLED,
  Kind.MILITARY,
  Kind.AIRSTRIP,
  Kind.HELIPAD,
  Kind.OTHER_AIRSTRIP
]

export const NavAidKinds = [
  Kind.VOR,
  Kind.NDB,
  Kind.VOR_DME,
  Kind.DME
]

export const ReportingPointKinds = [
  Kind.VFR_POINT,
  Kind.IFR_POINT
]

@Entity("nav_points")
export class NavPoint {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("varchar")
  name: string | null

  @Column("float")
  lat: number | null

  @Column("float")
  lng: number | null

  @Column("int")
  kind: Kind | null

  @Column("int")
  status: Status | null

  @Column("varchar")
  height: string | null

  @Column("varchar")
  elevation: string | null

  @Column("varchar", {name: "icao_code"})
  icaoCode: string | null

  @Column("text")
  description: string | null

  @Column("varchar")
  radio: string | null

  @CreateDateColumn({name: "created_at"})
  createdAt: Date | null

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date | null

  @Column("varchar")
  country: string | null

  @Column("float")
  declination: number | null

  constructor() {
    this.name = null
    this.lat = null
    this.lng = null
    this.kind = null
    this.status = null
    this.height = null
    this.elevation = null
    this.icaoCode = null
    this.description = null
    this.radio = null
    this.createdAt = null
    this.updatedAt = null
    this.country = null
    this.declination = null
  }
}
