import "reflect-metadata"
import { importAirports } from "./openaip/airport.js"

const command = process.argv[2]

const printUsageAndExitWithError = () => {
  const usage = `
    Supported commands:
      airports  - Import airpors from openaip
      navaids   - Import nav aids from openaip
      points    - Import reporting points from openaip
      airspaces - Import airspaces from openaip
      aup       - Import AUP data from pansa
  `
  console.log(usage)
  process.exit(1)
}

switch(command) {
  case 'airports':
    await importAirports()
    break
  default:
    printUsageAndExitWithError()
}
