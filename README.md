Import tools for `vfr-planner`.

`TypeScript` playground.

Roadmap:

* [ ] Pull NavPoints from OpenAIP data over their REST API (https://docs.openaip.net/)
* [ ] Convert it into local table format and insert into `nav_points` table
* [ ] Pull Airspaces from OpenAIP data over their REST API (https://docs.openaip.net/)
* [ ] Convert it into local table format and insert into `airspaces` table
* [ ] Compute AUP `designator` for the Airspaces
* [ ] Pull AUP data from https://airspace.pansa.pl/aup/current
* [ ] Join with Airspaces over `designator` and insert into `active_airspaces`
 
Secrets live in `.env` and can be loaded with:

```sh
set -a; source .env; set +a
```

Start the stack with:
```
docker compose up -d
```

MySQL is exposed at `localhost:3306`. Run the import scripts and see the effects at http://localhost:3000

Affected tables:

```ruby
enum starts from 0
> In general, the i-th element is mapped to i-1 in the database.

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
```
