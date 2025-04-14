import { parse, HTMLElement } from 'node-html-parser'
import axios from 'axios'
import { readFileSync } from 'node:fs'
import { ActiveAirspace, Day } from '../entities/active_airspace.js';
import { dataSource } from '../data_source.js';
import { In, Repository } from 'typeorm';
import { Airspace } from '../entities/airspace.js';

const sendSlackNotification = async (message: string) => {
  try {
    const response = await axios.post(
      process.env.SLACK_NOTIFICATIONS_URL!,
      { text: message },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}

type RawAupEntry = {
  designator: string,
  levelFrom: string,
  levelTo: string,
  timeFrom: string,
  timeTo: string,
  responsibleUnit: string,
  fuaEuRestrictions: string,
  remarks: string
}

const rowToEntry = (row: HTMLElement | undefined): RawAupEntry | null => {
  if(!row) {
    return null
  }

  const cellText: Array<string> = row.querySelectorAll('td').map(td => td.textContent)
  return {
    designator: cellText[1]!,
    levelFrom: cellText[2]!,
    levelTo: cellText[3]!,
    timeFrom: cellText[4]!,
    timeTo: cellText[5]!,
    responsibleUnit: cellText[6]!,
    fuaEuRestrictions: cellText[7]!,
    remarks: cellText[8]!
  }
}

const findAirspaceByDesignator = async (designator: string) : Promise<Airspace | null> => {
  const airspaceRepository = dataSource.getRepository(Airspace)
  return await airspaceRepository.findOne({
    where: {
      designator
    }
  })
}

const convertTime = (input: string): number => {
  return parseInt(input.replace(/\D/g, ""))
}

const convertLevel = (input: string): number => {
  if (input === 'GND') return 0;
  return parseInt(input.replace(/\D/g, "")) * 100;
}

const buildActiveAirspaceFromAupEntry = async (entry: RawAupEntry) : Promise<ActiveAirspace | null> => {
  const ret = new ActiveAirspace()
  ret.timeFrom = convertTime(entry.timeFrom)
  ret.timeTo = convertTime(entry.timeTo)

  if(ret.timeFrom == ret.timeTo) {
    ret.timeFrom = 0
    ret.timeTo = 2359
  }

  ret.levelMin = convertLevel(entry.levelFrom)
  
  if(ret.levelMin >= 9500) {
    console.log(`Airspace with designator ${entry.designator} has levelMin too high (${ret.levelMin}). Skipping.`)
    return null
  }
  
  ret.levelMax = convertLevel(entry.levelTo)
  ret.createdAt = new Date()
  ret.updatedAt = new Date()

  const airspace: Airspace | null = await findAirspaceByDesignator(entry.designator)
  if(!airspace) {
    const errorMessage = `Could not find an Airspace for designator ${entry.designator}`
    console.log(errorMessage)
    // sendSlackNotification(errorMessage)
    return null
  }

  ret.airspace = airspace
  ret.country = airspace.country
  ret.extra_description = entry.remarks || ""
  return ret
}

const importForDay = async (day: Day, url: string) => {
  const rawHtml = (await axios.get(url)).data
  const root = parse(rawHtml)
  const rows = root.querySelectorAll('table[data-table="bravo"] tbody tr')

  const activeAirspaceRepository = dataSource.getRepository(ActiveAirspace)
  let activeAirspace: ActiveAirspace | null
  let rawAupEntry: RawAupEntry
  
  // for await (const navaid of navaids) {
  for(const row of rows) {
    if(!row) continue

    rawAupEntry = rowToEntry(row)!
    activeAirspace = await buildActiveAirspaceFromAupEntry(rawAupEntry)
    if(!activeAirspace) continue

    activeAirspace.day = day

    console.log(`Inserting ${rawAupEntry.designator}...`)
    // console.log(rawAupEntry)
    // console.log("-")
    // console.log(activeAirspace)
    // console.log("===")
    await activeAirspaceRepository.insert(activeAirspace)
  }  
}

const importPermanentAirspaces = async (day: Day) => {
  const airspaceRepository = dataSource.getRepository(Airspace)
  const activeAirspaceRepository = dataSource.getRepository(ActiveAirspace)
  const permanentAirspaces = await airspaceRepository.find({
    where: {
      permanent: 1,
    },
  });
  //   for await (const navaid of navaids) {

  let activeAirspace: ActiveAirspace
  for(const airspace of permanentAirspaces) {
    activeAirspace = new ActiveAirspace()
    activeAirspace.airspace = airspace
    activeAirspace.country = airspace.country
    activeAirspace.extra_description = airspace.description
    activeAirspace.timeFrom = 0
    activeAirspace.timeTo = 2359
    activeAirspace.levelMin = airspace.levelMin
    activeAirspace.levelMax = airspace.levelMax
    activeAirspace.createdAt = new Date()
    activeAirspace.updatedAt = new Date()
    activeAirspace.day = day
    await activeAirspaceRepository.insert(activeAirspace)
  }
}


export const importAup = async () => {
  await dataSource.initialize()
  const activeAirspaceRepository = dataSource.getRepository(ActiveAirspace)
  await activeAirspaceRepository.clear()

  await importForDay(Day.Today, "https://airspace.pansa.pl/aup/current")
  await importForDay(Day.Tomorrow, "https://airspace.pansa.pl/aup/next")
  await importPermanentAirspaces(Day.Today)
  await importPermanentAirspaces(Day.Tomorrow)
  await dataSource.destroy()  
}
