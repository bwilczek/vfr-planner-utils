import axios from "axios"

const headers = {
  "Content-Type": "application/json",
  "x-openaip-api-key": process.env.OPENAIP_API_TOKEN
}

const EPWS_ID = "62614f5b4b027aab592aede3"
const EPJG_ID = "62614f464b027aab592ae599"

const points = [
  // { name: "DELTA EPWS", airport: EPWS_ID, coords: [17.192500, 51.180000] },
  // { name: "OSKAR EPWS", airport: EPWS_ID, coords: [16.909167, 51.297050] },
  // { name: "ROMEO EPWS", airport: EPWS_ID, coords: [16.958883, 51.155550] },
  // { name: "TANGO EPWS", airport: EPWS_ID, coords: [17.062500, 51.301383] },
  // { name: "ZULU EPWS", airport: EPWS_ID, coords: [16.841667, 51.250000] },
  
  // { name: "ALPHA EPJG", airport: EPJG_ID, coords: [15.796383, 50.961117] },
  // { name: "JULIET EPJG", airport: EPJG_ID, coords: [15.920000, 50.874717] },
  // { name: "PAPA EPJG", airport: EPJG_ID, coords: [15.645000, 50.963617] },
  // { name: "SIERRA EPJG", airport: EPJG_ID, coords: [15.707217, 50.829450] },
  // { name: "WHISKEY EPJG", airport: EPJG_ID, coords: [15.909167,50.938333] },
  { name: "ZULU EPJG", airport: EPJG_ID, coords: [15.811117, 50.883883] }
]

console.log("Before loop")

for(const point of points) {
  let payload = {
    "name": point.name,
    "compulsory": true,
    "country": "PL",
    "geometry": {
      "type": "Point",
      "coordinates": point.coords
    },
    "elevation": {
      "value": 0,
      "unit": 0,
      "referenceDatum": 1
    },
    "airports": [
      point.airport
    ],
    "rfcComment": "This point is present in AIRAC 2507"
  }

  try {
    console.log('============');
    console.log(`POST ${payload.name}`);
    const response = await axios.post("https://api.core.openaip.net/api/reporting-points/rfc", payload, { headers })
    console.log('Response:', response.data);
    break;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  }  
}

// Example invocation: node tools/new_reporting_point.js
