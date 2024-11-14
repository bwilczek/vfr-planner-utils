import { parse, HTMLElement } from 'node-html-parser'
import axios from 'axios'
import { readFileSync } from 'node:fs'

// const rawHtml = (await axios.get("https://airspace.pansa.pl/aup/current")).data
const rawHtml = readFileSync("tmp/aup_current.html").toString()

const root = parse(rawHtml)

type RawAupEntry = {
  combinedDesignator: string,
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
    combinedDesignator: cellText[1]!,
    levelFrom: cellText[2]!,
    levelTo: cellText[3]!,
    timeFrom: cellText[4]!,
    timeTo: cellText[5]!,
    responsibleUnit: cellText[6]!,
    fuaEuRestrictions: cellText[7]!,
    remarks: cellText[8]!
  }
}

const rows = root.querySelectorAll('table[data-table="charlie"] tbody tr')
const row: HTMLElement = rows.at(0)!

// const cellText: Array<string> = row.querySelectorAll('td').map(td => td.textContent)
// console.log(cellText)
// console.log(cellText[0])

console.log(rowToEntry(row))
