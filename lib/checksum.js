import {equals, compose, slice, add, test, reduce, always, modulo, cond, T, __} from 'ramda'

const characterValue = cond([
  [test(/[0-9]/), Number],
  [equals('-'), always(1)],
  [T, always(0)]
])

const reduceFn = (m, e) => compose(add(m), characterValue)(e)

export const calculateChecksum = compose(modulo(__, 10), reduce(reduceFn, 0), slice(0, -1))
export const extractCheckdigit = compose(Number, slice(-1, Infinity))

export default (tle) => calculateChecksum(tle) === extractCheckdigit(tle)
