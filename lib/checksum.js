import {equals, compose, slice, add, test, reduce, always, modulo, cond, T, __} from 'ramda'

/**
 * Assigns a value to the character.
 * Numbers retain their value.
 * Dashes are valued as 1.
 * Other characters (spaces, plus signs, decimal points) are ignored.
 * @private
 * @param  {string} char A character
 * @return {number}      The value of the passed character in the checksum.
 */
const characterValue = cond([
  [test(/[0-9]/), Number],
  [equals('-'), always(1)],
  [T, always(0)]
])

const reduceFn = (m, e) => compose(add(m), characterValue)(e)

/**
 * Calculates the checksum of a TLE line
 * @private
 * @param  {string} tle
 * @return {number}     The checksum
 */
export const calculateChecksum = compose(modulo(__, 10), reduce(reduceFn, 0), slice(0, -1))

/**
 * Extracts the check digit from the line
 * @private
 * @param  {string} line
 * @return {number}      the check digit
 */
export const extractCheckDigit = compose(Number, slice(-1, Infinity))

/**
 * Calculate and verify the checksum of a TLE line
 * @param  {string}  tle
 * @return {boolean}
 */
export default (tle) => calculateChecksum(tle) === extractCheckDigit(tle)
