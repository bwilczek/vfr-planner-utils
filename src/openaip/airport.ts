// query for fields name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways
// curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API_TOKEN" 'https://api.core.openaip.net/api/airports?page=1&limit=1&sortBy=name&sortDesc=true&country=PL&searchOptLwc=true&fields=name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways&search=EPWS' 
//
// {
//   "_id": "62614f5b4b027aab592aede3",
//   "name": "SZYMANOW",
//   "icaoCode": "EPWS",
//   "type": 2,
//   "magneticDeclination": 5.548,
//   "geometry": {
//     "type": "Point",
//     "coordinates": [
//       16.998055555556,
//       51.205833333333
//     ]
//   },
//   "elevation": {
//     "value": 124,
//     "unit": 0,
//     "referenceDatum": 1
//   },
//   "frequencies": [
//     {
//       "value": "124.115",
//       "unit": 2,
//       "type": 10,
//       "name": "Szymanow Radio",
//       "primary": true,
//       "publicUse": true,
//       "_id": "62614f5b4b027aab592aede4"
//     }
//   ],
//   "runways": [
//     {
//       "designator": "11",
//       "trueHeading": 110,
//       "alignedTrueNorth": false,
//       "operations": 0,
//       "mainRunway": false,
//       "turnDirection": 2,
//       "takeOffOnly": false,
//       "landingOnly": false,
//       "surface": {
//         "composition": [
//           2
//         ],
//         "mainComposite": 2,
//         "condition": 0,
//         "mtow": {
//           "value": 5.7,
//           "unit": 9
//         }
//       },
//       "dimension": {
//         "length": {
//           "value": 560,
//           "unit": 0
//         },
//         "width": {
//           "value": 100,
//           "unit": 0
//         }
//       },
//       "declaredDistance": {
//         "tora": {
//           "value": 560,
//           "unit": 0
//         },
//         "lda": {
//           "value": 560,
//           "unit": 0
//         }
//       },
//       "pilotCtrlLighting": false,
//       "_id": "62614f5b4b027aab592aede5"
//     },
//     {
//       "designator": "29",
//       "trueHeading": 290,
//       "alignedTrueNorth": false,
//       "operations": 0,
//       "mainRunway": false,
//       "turnDirection": 2,
//       "takeOffOnly": false,
//       "landingOnly": false,
//       "surface": {
//         "composition": [
//           2
//         ],
//         "mainComposite": 2,
//         "condition": 0,
//         "mtow": {
//           "value": 5.7,
//           "unit": 9
//         }
//       },
//       "dimension": {
//         "length": {
//           "value": 560,
//           "unit": 0
//         },
//         "width": {
//           "value": 100,
//           "unit": 0
//         }
//       },
//       "declaredDistance": {
//         "tora": {
//           "value": 560,
//           "unit": 0
//         },
//         "lda": {
//           "value": 560,
//           "unit": 0
//         }
//       },
//       "pilotCtrlLighting": false,
//       "_id": "62614f5b4b027aab592aede6"
//     },
//     {
//       "designator": "14R",
//       "trueHeading": 140,
//       "alignedTrueNorth": false,
//       "operations": 0,
//       "mainRunway": true,
//       "turnDirection": 2,
//       "takeOffOnly": false,
//       "landingOnly": false,
//       "surface": {
//         "composition": [
//           2
//         ],
//         "mainComposite": 2,
//         "condition": 0,
//         "mtow": {
//           "value": 5.7,
//           "unit": 9
//         }
//       },
//       "dimension": {
//         "length": {
//           "value": 700,
//           "unit": 0
//         },
//         "width": {
//           "value": 50,
//           "unit": 0
//         }
//       },
//       "declaredDistance": {
//         "tora": {
//           "value": 700,
//           "unit": 0
//         },
//         "lda": {
//           "value": 700,
//           "unit": 0
//         }
//       },
//       "pilotCtrlLighting": false,
//       "_id": "62614f5b4b027aab592aede7"
//     },
//     {
//       "designator": "32L",
//       "trueHeading": 320,
//       "alignedTrueNorth": false,
//       "operations": 0,
//       "mainRunway": true,
//       "turnDirection": 2,
//       "takeOffOnly": false,
//       "landingOnly": false,
//       "surface": {
//         "composition": [
//           2
//         ],
//         "mainComposite": 2,
//         "condition": 0,
//         "mtow": {
//           "value": 5.7,
//           "unit": 9
//         }
//       },
//       "dimension": {
//         "length": {
//           "value": 700,
//           "unit": 0
//         },
//         "width": {
//           "value": 50,
//           "unit": 0
//         }
//       },
//       "declaredDistance": {
//         "tora": {
//           "value": 700,
//           "unit": 0
//         },
//         "lda": {
//           "value": 700,
//           "unit": 0
//         }
//       },
//       "pilotCtrlLighting": false,
//       "_id": "62614f5b4b027aab592aede8"
//     },
//     {
//       "designator": "14L",
//       "trueHeading": 140,
//       "alignedTrueNorth": false,
//       "operations": 0,
//       "mainRunway": false,
//       "turnDirection": 2,
//       "takeOffOnly": false,
//       "landingOnly": false,
//       "surface": {
//         "composition": [
//           2
//         ],
//         "mainComposite": 2,
//         "condition": 0,
//         "mtow": {
//           "value": 5.7,
//           "unit": 9
//         }
//       },
//       "dimension": {
//         "length": {
//           "value": 700,
//           "unit": 0
//         },
//         "width": {
//           "value": 50,
//           "unit": 0
//         }
//       },
//       "declaredDistance": {
//         "tora": {
//           "value": 700,
//           "unit": 0
//         },
//         "lda": {
//           "value": 700,
//           "unit": 0
//         }
//       },
//       "pilotCtrlLighting": false,
//       "_id": "62614f5b4b027aab592aede9"
//     },
//     {
//       "designator": "32R",
//       "trueHeading": 320,
//       "alignedTrueNorth": false,
//       "operations": 0,
//       "mainRunway": false,
//       "turnDirection": 2,
//       "takeOffOnly": false,
//       "landingOnly": false,
//       "surface": {
//         "composition": [
//           2
//         ],
//         "mainComposite": 2,
//         "condition": 0,
//         "mtow": {
//           "value": 5.7,
//           "unit": 9
//         }
//       },
//       "dimension": {
//         "length": {
//           "value": 700,
//           "unit": 0
//         },
//         "width": {
//           "value": 50,
//           "unit": 0
//         }
//       },
//       "declaredDistance": {
//         "tora": {
//           "value": 700,
//           "unit": 0
//         },
//         "lda": {
//           "value": 700,
//           "unit": 0
//         }
//       },
//       "pilotCtrlLighting": false,
//       "_id": "62614f5b4b027aab592aedea"
//     }

import { Kind, NavPoint, Status } from "../entities/nav_point.js"
import axios from 'axios'
import { AirportPayload, FrequencyType, frequencyTypeToString, Type } from "./types/airport.js"
import { readFileSync } from "node:fs"

// elevation unit enum
// 0, always meters, referenceDatum always AMSL

// type enum
// The type of the airport. Possible values: \n\n 0: Airport (civil/military)\n\n1: Glider Site\n\n2: Airfield Civil\n\n3: International Airport\n\n4: Heliport Military\n\n5: Military Aerodrome\n\n6: Ultra Light Flying Site\n\n7: Heliport Civil\n\n8: Aerodrome Closed\n\n9: Airport resp. Airfield IFR\n\n10: Airfield Water\n\n11: Landing Strip\n\n12: Agricultural Landing Strip\n\n13: Altiport

// length unit enum
// The distance unit. Always meters.

// Frequency type:
// The frequency type. Possible values: \n\n 0: Approach\n\n1: APRON\n\n2: Arrival\n\n3: Center\n\n4: CTAF\n\n5: Delivery\n\n6: Departure\n\n7: FIS\n\n8: Gliding\n\n9: Ground\n\n10: Information\n\n11: Multicom\n\n12: Unicom\n\n13: Radar\n\n14: Tower\n\n15: ATIS\n\n16: Radio\n\n17: Other\n\n18: AIRMET\n\n19: AWOS\n\n20: Lights\n\n21: VOLMET\n\n22: AFIS

// The type of the operations. Possible values: \n\n 0: Active\n\n1: Temporarily Closed\n\n2: Closed

// The runway main composite. Possible values: \n\n 0: Asphalt\n\n1: Concrete\n\n2: Grass\n\n3: Sand\n\n4: Water\n\n5: Bituminous tar or asphalt ("earth cement")\n\n6: Brick\n\n7: Macadam or tarmac surface consisting of water-bound crushed rock\n\n8: Stone\n\n9: Coral\n\n10: Clay\n\n11: Laterite - a high iron clay formed in tropical areas\n\n12: Gravel\n\n13: Earth\n\n14: Ice\n\n15: Snow\n\n16: Protective laminate usually made of rubber\n\n17: Metal\n\n18: Landing mat portable system usually made of aluminium\n\n19: Pierced steel planking\n\n20: Wood\n\n21: Non Bituminous mix\n\n22: Unknown

// The runway main composite. Possible values: \n\n 0: Good\n\n1: Fair\n\n2: Poor\n\n3: Unsafe\n\n4: Deformed\n\n5: Unknown

// Available lighting systems for this runway. Possible values are: \n\n 0: Runway End Identifier Lights\n\n1: Runway End Lights\n\n2: Runway Edge Lights\n\n3: Runway Center Line Lighting System\n\n4: Touchdown Zone Lights\n\n5: Taxiway Centerline Lead Off Lights\n\n6: Taxiway Centerline Lead On Lights\n\n7: Land And Hold Short Lights\n\n8: Approach Lighting System\n\n9: Threshold Lights

// The frequency unit. Always 'MHz'.


type AirportsPayload = {
  limit: string,
  totalCount: number,
  totalPages: number,
  page: number,
  items: Array<AirportPayload>
}

export const fetchAirports = async (): Promise<Array<AirportPayload>> => {
  // curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API_TOKEN" 'https://api.core.openaip.net/api/airports?page=1&limit=1&sortBy=name&sortDesc=true&country=PL&searchOptLwc=true&fields=name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways&search=EPWS' 
  // Content-Type: application/json"
  // "x-openaip-api-key: $OPENAIP_API_TOKEN" 
  // 'https://api.core.openaip.net/api/airports
  // page=1
  // limit=1000
  // sortBy=name
  // sortDesc=true
  // country=PL
  // searchOptLwc=true
  // fields=name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-openaip-api-key": process.env.OPENAIP_API_TOKEN
    },
    params: {
      "page": 1,
      "limit": 1,
      "sortBy": "name",
      "sortDesc": true,
      "country": "PL",
      "searchOptLwc": true,
      "search": "EPWS",
      "fields": "name,icaoCode,elevation,type,geometry,elevation,magneticDeclination,frequencies,runways"
    }
  }

  const data: AirportsPayload = await (await axios.get("https://api.core.openaip.net/api/airports", config)).data
  return data.items as Array<AirportPayload>
}

export const fetchAirportsFromFile = (path: string): Array<AirportPayload> => {
  const rawJson = readFileSync(path).toString()
  return JSON.parse(rawJson).items as Array<AirportPayload>
}

const buildElevationString = (elevationInMeters: number | undefined): string | null => {
  if(!elevationInMeters) return null

  const elevationInFeet = Math.round(elevationInMeters * 3.28084)
  return `${elevationInFeet}ft (${elevationInMeters}m)`
}

const buildRadioString = (frequencies: AirportPayload["frequencies"]): string | null => {
  if(!frequencies) return null

  const primaryFrequency = frequencies.find( f => f.primary )

  return `${primaryFrequency?.value} MHz (${primaryFrequency?.name})`
}

const mapOpenAipTypeToNavPointKind = (openAipType: Type | undefined): Kind => {
  if(openAipType === undefined) return Kind.OTHER_AIRSTRIP

  switch(openAipType) {
    case Type.Airport:
    case Type.InternationalAirport:
      return Kind.CONTROLLED
    case Type.AirportRespAirfieldIfr:
    case Type.CivilAirfield:
      return Kind.UNCONTROLLED
    case Type.MilitaryHeliport:
    case Type.MilitaryAerodrome:
      return Kind.MILITARY
    case Type.CivilHeliport:
      return Kind.HELIPAD
    case Type.LandingStrip:
    case Type.UltraLightFlyingSite:
    case Type.GliderSite:
      return Kind.AIRSTRIP
    }
  return Kind.OTHER_AIRSTRIP
}

const buildDescription = (payload: AirportPayload): string => {
  return "Oh, what a fancy description!"
}

export const buildAirportNavPointFromPayload = (payload: AirportPayload): NavPoint => {
  const airport = new NavPoint()
  airport.name = payload.name || null
  airport.lat = payload.geometry?.coordinates[1] || null
  airport.lng = payload.geometry?.coordinates[0] || null
  airport.kind = mapOpenAipTypeToNavPointKind(payload.type)
  airport.status = Status.ACTIVE
  airport.height = null
  airport.elevation = buildElevationString(payload.elevation?.value)
  airport.icaoCode = payload.icaoCode || null
  airport.description = buildDescription(payload)
  airport.radio = buildRadioString(payload.frequencies)
  airport.country = 'pl'
  airport.declination = payload.magneticDeclination || null
  return airport
}
