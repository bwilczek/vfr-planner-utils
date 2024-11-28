import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Airspace } from "./airspace.js"

/**

| active_airspaces | CREATE TABLE `active_airspaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `airspace_id` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `extra_description` text,
  `level_min` int(11) DEFAULT NULL,
  `level_max` int(11) DEFAULT NULL,
  `time_from` int(11) DEFAULT NULL,
  `time_to` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `country` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_active_airspaces_on_airspace_id` (`airspace_id`),
  KEY `index_active_airspaces_on_country` (`country`),
  CONSTRAINT `fk_rails_5900bd3b6f` FOREIGN KEY (`airspace_id`) REFERENCES `airspaces` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |


create_table "active_airspaces", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
  t.integer  "airspace_id"
  t.integer  "day"
  t.text     "extra_description", limit: 65535
  t.integer  "level_min"
  t.integer  "level_max"
  t.integer  "time_from"
  t.integer  "time_to"
  t.datetime "created_at",                      null: false
  t.datetime "updated_at",                      null: false
  t.string   "country",           limit: 6
  t.index ["airspace_id"], name: "index_active_airspaces_on_airspace_id", using: :btree
  t.index ["country"], name: "index_active_airspaces_on_country", using: :btree
end
enum day: [:today, :tomorrow]

 */

export enum Day {
  Today,
  Tomorrow
}

@Entity("active_airspaces")
export class ActiveAirspace {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Airspace)
  @JoinColumn({ name: "airspace_id" })
  airspace: Airspace | null

  @Column("tinyint")
  day: Day | null

  @Column("text")
  extra_description: string | null

  @Column("int", {name: "level_min"})
  levelMin: number | null

  @Column("int", {name: "level_max"})
  levelMax: number | null

  @Column("int", {name: "time_from"})
  timeFrom: number | null

  @Column("int", {name: "time_to"})
  timeTo: number | null

  @CreateDateColumn({name: "created_at"})
  createdAt: Date | null

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date | null

  @Column("varchar")
  country: string | null

  constructor() {
    this.airspace = null
    this.day = null
    this.extra_description = null
    this.levelMin = null
    this.levelMax = null
    this.timeFrom = null
    this.timeTo = null
    this.createdAt = null
    this.updatedAt = null
    this.country = null
  }  
}
