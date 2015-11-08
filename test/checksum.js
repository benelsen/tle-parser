
import test from 'tape'

import checksum, {calculateChecksum, extractCheckDigit} from '../lib/checksum'

test('Valid TLE lines', t => {
  t.plan(2)

  const tle1 = '1 25544U 98067A   15310.90801927  .00009031  00000-0  13975-3 0  9997'
  t.ok(checksum(tle1), 'Line 1 checksum')

  const tle2 = '2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970245'
  t.ok(checksum(tle2), 'Line 2 checksum')

})

test('Invalid TLE lines', t => {
  t.plan(2)

  const tle1 = '1 25544U 98067A   15310.90801927  .00009032  00000-0  13975-3 0  9997'
  t.notOk(checksum(tle1), 'Line 1 checksum')

  const tle2 = '2 25544  51.6440  91.7796 0006748 114.3849  28.9641 15.54854844970247'
  t.notOk(checksum(tle2), 'Line 2 checksum')

})

test('Extract checkdigit from TLE', t => {
  t.plan(1)

  const tle1 = '1 25544U 98067A   15310.90801927  .00009032  00000-0  13975-3 0  9997'
  t.strictEqual(extractCheckDigit(tle1), 7, 'Line 1 checkdigit')

})

test('Calculate checksum from TLE', t => {
  t.plan(1)

  const tle2 = '2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970245'
  t.strictEqual(calculateChecksum(tle2), 5, 'Line 2 checksum')

})
