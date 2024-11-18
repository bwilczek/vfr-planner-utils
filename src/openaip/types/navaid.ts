/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { ISO31661Alpha2CountryCode } from "./country_code.js";

export enum NavAidType {
  DME,
  TACAN,
  NDB,
  VOR,
  VOR_DME,
  VORTAC,
  DVOR,
  DVOR_DME,
  DVORTAC
}

export enum FrequencyUnitType {
  kHz = 1,
  MHz = 2
}

/**
 * Response payload of a navaid instance.
 */
export interface NavAidPaylod {
  /**
   * The document's internal reference ID value.
   */
  _id?: string;
  name?: string;
  /**
   * The navaid type. Possible values:
   *
   *  0: DME
   *
   * 1: TACAN
   *
   * 2: NDB
   *
   * 3: VOR
   *
   * 4: VOR-DME
   *
   * 5: VORTAC
   *
   * 6: DVOR
   *
   * 7: DVOR-DME
   *
   * 8: DVORTAC
   */
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  identifier?: string;
  country?: ISO31661Alpha2CountryCode;
  geometry?: {
    type: "Point";
    /**
     * @minItems 2
     * @maxItems 2
     */
    coordinates: [number, number];
  };
  elevation?: {
    value: number;
    /**
     * The elevation unit. Always 'meters'.
     */
    unit: 0;
    /**
     * The elevation reference datum. Always 'MSL'.
     */
    referenceDatum?: 1;
  };
  elevationGeoid?: {
    /**
     * Height above ellipsoid in meters.
     */
    hae: number;
    /**
     * Height of geoid in meters.
     */
    geoidHeight: number;
  };
  magneticDeclination?: number;
  alignedTrueNorth?: boolean;
  channel?: string;
  frequency?: {
    value: string;
    /**
     * The navaid frequency. Possible values:
     *
     * 1: kHz
     *
     * 2: MHz
     */
    unit: 1 | 2;
  };
  range?: {
    value: number;
    /**
     * The range of the navaid. Always 'NM'.
     */
    unit: 2;
  };
  /**
   * Defines the hours of operation for this navaid.
   */
  hoursOfOperation?: {
    /**
     * @minItems 1
     */
    operatingHours?: [
      (
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            startTime: string;
            endTime: string;
            sunrise: false;
            sunset: false;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            startTime: string;
            sunrise: false;
            sunset: true;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            endTime: string;
            sunrise: true;
            sunset: false;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            sunrise: false;
            sunset: false;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            sunrise: false;
            sunset: false;
            byNotam: true;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
      ),
      ...(
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            startTime: string;
            endTime: string;
            sunrise: false;
            sunset: false;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            startTime: string;
            sunrise: false;
            sunset: true;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            endTime: string;
            sunrise: true;
            sunset: false;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            sunrise: false;
            sunset: false;
            byNotam: false;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
        | {
            dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            sunrise: false;
            sunset: false;
            byNotam: true;
            publicHolidaysExcluded: boolean;
            remarks?: string;
          }
      )[]
    ];
    remarks?: string;
  };
  images?: {
    /**
     * The document's internal reference ID value.
     */
    _id?: string;
    filename: string;
    description?: string;
  }[];
  remarks?: string;
  /**
   * UID of user that created this document.
   */
  createdBy?: string;
  /**
   * UID of user that updated this document.
   */
  updatedBy?: string;
  /**
   * The creation date for this document as ISO 8601 date.
   */
  createdAt?: string;
  /**
   * The updated date for this document as ISO 8601 date.
   */
  updatedAt?: string;
}
