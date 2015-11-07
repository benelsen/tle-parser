
import {split, length, equals, compose, when, slice, add, test, objOf, ifElse, always, gt} from 'ramda'
import fixed from 'fixedwidth'

import checksum from './checksum'

const splitLines = split(/[\r\n]+/)
const isThreeLine = compose(equals(3), length)

const zeroLine = when(
  compose(equals('0 '), slice(0, 2)),
  slice(2, Infinity)
)
const line0 = compose(objOf('name'), zeroLine)

const year2to4 = ifElse(gt(56), add(2000), add(1900))

function doyToDate (year, doy) {
  const seconds = doy * 24 * 3600
  const microseconds = Math.round((seconds - Math.floor(seconds)) * 1e6)
  return new Date( Date.UTC( year, 0, 0) + Math.floor(seconds) * 1e3 ).toISOString().replace('000', microseconds)
}

function parseValue (str, decimalPointAssumed) {
  return str.slice(0, 1) + (decimalPointAssumed ? '.' : '') + str.slice(1, -2) + 'e' + str.slice(-2)
}

function line1 (line) {
  const result = fixed(line, 'I1,X1,I5,A1,X1,I2,I3,A3,X1,I2,F12,X1,A10,X1,A8,X1,A8,X1,I1,X1,I4,I1')

  return {
    catalog_number: result[1],
    classification_type: result[2],
    intl_designator: `${year2to4(result[3])}-${'0'.repeat(3-result[4].toString().length) + result[4]}${result[5].trim()}`,
    epoch: doyToDate(year2to4(result[6]), result[7]),
    mean_motion_dot: parseFloat( result[8] ) * 2,
    mean_motion_dot_dot: parseFloat( parseValue( result[9], true ) ) * 6,
    b_star: parseFloat( parseValue( result[10], true ) ),
    ephemeris_type: result[11],
    element_set_number: result[12]
  }
}

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

export default function parser (tle) {

  const lines = splitLines(tle)

  if ( isThreeLine(lines) ) {
    return Object.assign({}, line0(lines[0]), line1(lines[1]), line2(lines[2]))
  } else {
    return Object.assign({}, line1(lines[0]), line2(lines[1]))
  }

}
