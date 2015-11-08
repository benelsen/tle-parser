
import {split, length, equals, compose, when, slice, add, objOf, ifElse, gt, takeLast, reduce, and} from 'ramda'
import fixed from 'fixedwidth'

import checksum from './checksum'

/**
 * Parses a TLE and returns a human readable object of the orbital elements.
 * (Two and three line TLEs are supported)
 *
 * @example
 * import parser from 'tle-parser'
 * const tle = `0 ISS (ZARYA)
 * 1 25544U 98067A   15310.90801927  .00009031  00000-0  13975-3 0  9997
 * 2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970245`
 * const elements = parser(tle)
 *
 * @param  {string} tle The TLE as a string (with line breaks etc.)
 * @return {Elements}   Object containing the TLEs orbital elements.
 */
export default function parser (tle) {

  const lines = splitLines(tle)

  const isValid = reduce((m, e) => and(m, checksum(e)), true, takeLast(2, lines))
  if ( !isValid ) {
    throw new Error('TLE has invalid checksum(s)')
  }

  if ( isThreeLong(lines) ) {
    return Object.assign({}, line0(lines[0]), line1(lines[1]), line2(lines[2]))
  } else {
    return Object.assign({}, line1(lines[0]), line2(lines[1]))
  }

}

/**
 *
 * @typedef {object} Elements
 * @property {string} name
 * @property {string} intl_designator
 * @property {string} catalog_number
 * @property {string} classification_type
 * @property {string} epoch
 * @property {number} mean_motion_dot
 * @property {number} mean_motion_dot_dot
 * @property {number} b_star
 * @property {number} inclination
 * @property {number} right_ascension
 * @property {number} eccentricity
 * @property {number} arg_pericenter
 * @property {number} mean_anomaly
 * @property {number} mean_motion
 * @property {number} revolutions_at_epoch
 * @property {number} element_set_number
 * @property {number} ephemeris_type
 */

/**
 * Splits text into lines.
 * @private
 * @param  {string}   text
 * @return {[string]}
 */
const splitLines = split(/[\r\n]+/)

/**
 * Checks if length is equal to 3.
 * @private
 * @param  {(Array|string)}
 * @return {boolean}
 */
const isThreeLong = compose(equals(3), length)

/**
 * Removes line number from string.
 * @private
 * @param  {string} str
 * @return {string}
 */
const removeLineNumber = when(
  compose(equals('0 '), slice(0, 2)),
  slice(2, Infinity)
)

/**
 * Parses the zeroth TLE line and extracts the name.
 * @private
 * @param  {string} line0
 * @return {object}
 */
const line0 = compose(objOf('name'), removeLineNumber)

/**
 * Converts a two digit to a four digit year number.
 * (Follows NASA spec i.e. years less than 56 are considered to be in the 1900s)
 * @private
 * @param  {number} year
 * @return {number}
 */
const year2to4 = ifElse(gt(56), add(2000), add(1900))

/**
 * Converts a year and a fractional DOY into an ISO8601/RFC3339 style date
 * @private
 * @param  {number} year
 * @param  {number} doy
 * @return {string}      ISO8601/RFC3339 style date
 */
function doyToDate (year, doy) {
  const seconds = doy * 24 * 3600
  const microseconds = Math.round((seconds - Math.floor(seconds)) * 1e6)
  return new Date( Date.UTC( year, 0, 0) + Math.floor(seconds) * 1e3 ).toISOString().replace('000', microseconds)
}

/**
 * Parser for the scientific notations used for some TLE fields.
 * @private
 * @param  {string}  str
 * @param  {boolean} decimalPointAssumed Is the field assumed to be preceded by a decimal point?
 * @return {number}
 */
function parseValue (str, decimalPointAssumed) {
  return parseFloat( str.slice(0, 1) + (decimalPointAssumed ? '.' : '') + str.slice(1, -2) + 'e' + str.slice(-2) )
}

/**
 * Parses the first TLE line
 * @private
 * @param  {string} line
 * @return {object}
 */
function line1 (line) {
  const result = fixed(line, 'I1,X1,I5,A1,X1,I2,I3,A3,X1,I2,F12,X1,A10,X1,A8,X1,A8,X1,I1,X1,I4,I1')

  return {
    catalog_number: result[1],
    classification_type: result[2],
    intl_designator: `${year2to4(result[3])}-${'0'.repeat(3-result[4].toString().length) + result[4]}${result[5].trim()}`,
    epoch: doyToDate(year2to4(result[6]), result[7]),
    mean_motion_dot: parseFloat( result[8] ) * 2,
    mean_motion_dot_dot: parseValue( result[9], true ) * 6,
    b_star: parseValue( result[10], true ),
    ephemeris_type: result[11],
    element_set_number: result[12]
  }
}

/**
 * Parses the second TLE line
 * @private
 * @param  {string} line
 * @return {object}
 */
function line2 (line) {
  const result = fixed(line, 'I1,X1,I5,X1,F8,X1,F8,X1,A7,X1,F8,X1,F8,X1,F11,I5,I1')

  return {
    catalog_number: result[1],
    inclination: result[2],
    right_ascension: result[3],
    eccentricity: parseFloat('0.' + result[4]),
    arg_pericenter: result[5],
    mean_anomaly: result[6],
    mean_motion: result[7],
    revolutions_at_epoch: result[8]
  }
}
