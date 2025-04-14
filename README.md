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

Pulling from openaip:
```
curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API_TOKEN" 'https://api.core.openaip.net/api/airports?page=1&limit=1000&sortBy=name&sortDesc=true&country=PL&searchOptLwc=true'

curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API_TOKEN" 'https://api.core.openaip.net/api/airports?page=1&limit=1&sortBy=name&sortDesc=true&country=PL&searchOptLwc=true&fields=name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways&search=EPWS'

```
Airport data: https://www.openaip.net/data/airports/62614f5b4b027aab592aede3


Run scripts with:
```
npx tsx src/index.ts
```

Airport schema: https://api.core.openaip.net/api/schemas/response/airport/airport-schema.json

Start the stack with:
```
docker compose up -d
```

MySQL is exposed at `localhost:3306`. Run the import scripts and see the effects at http://localhost:3000

Affected tables:

```ruby
enum starts from 0
> In general, the i-th element is mapped to i-1 in the database.

-----

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

-----

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

-----

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


Running the PoC:

```
npm install
npx tsx src/index.ts
```

JSON Schema to typescript interface:
https://borischerny.com/json-schema-to-typescript-browser


# Dockerization

```
docker build -t vfr-planner-utils:main .

docker run --rm -e MYSQL_HOST=172.17.0.1 -e OPENAIP_API_TOKEN=$OPENAIP_API_TOKEN vfr-planner-utils:main airports
```


# Slack Notification

```
curl -X POST -H 'Content-type: application/json' --data '{"text":"$MESSAGE"}' $SLACK_NOTIFICATIONS_URL
```

# Import Magnetic Declination

```
mysql -h 127.0.0.1 vfr -P 3306 -u vfr --password=vfr < tmp/mag_declinations_dump.sql
```
