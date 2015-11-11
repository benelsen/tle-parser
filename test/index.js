import test from 'tape'

import parser from '../lib/'

test('Parsing a three-line element set #1', t => {

  t.plan(1)

  const tle = `0 ISS (ZARYA)
1 25544U 98067A   15310.90801927  .00009031  00000-0  13975-3 0  9997
2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970245`

  const ephemeris = {
    name: 'ISS (ZARYA)',
    intl_designator: '1998-067A',
    catalog_number: 25544,
    classification_type: 'U',
    epoch: '2015-11-06T21:47:32.864928Z',
    eccentricity: 0.0006748,
    inclination: 51.644,
    right_ascension: 91.7795,
    argument_of_periapsis: 114.3849,
    mean_anomaly: 28.9641,
    mean_motion: 15.54854844,
    mean_motion_dot: 1.8062e-04,
    mean_motion_dot_dot: 0,
    b_star: 0.00013975,
    revolutions_at_epoch: 97024,
    ephemeris_type: 0,
    element_set_number: 999,
  }

  t.deepEqual( parser(tle), ephemeris )

})

test('Parsing a three-line element set #2', t => {

  t.plan(1)

  const tle = `0 GALAXY 11
1 26038U 99071A   15310.22169616 -.00000295  00000-0  00000+0 0  9994
2 26038   0.0267 277.2252 0000968   4.9311 147.2041  1.00274057 58248`

  const ephemeris = {
    name: 'GALAXY 11',
    intl_designator: '1999-071A',
    catalog_number: 26038,
    classification_type: 'U',
    epoch: '2015-11-06T05:19:14.548224Z',
    eccentricity: 9.68e-05,
    inclination: 0.0267,
    right_ascension: 277.2252,
    argument_of_periapsis: 4.9311,
    mean_anomaly: 147.2041,
    mean_motion: 1.00274057,
    mean_motion_dot: -5.9e-06,
    mean_motion_dot_dot: 0,
    b_star: 0,
    revolutions_at_epoch: 5824,
    ephemeris_type: 0,
    element_set_number: 999,
  }

  t.deepEqual( parser(tle), ephemeris )

})

test('Parsing a three-line element set #3', t => {

  t.plan(1)

  const tle = `0 NAVSTAR 34 (USA 94)
1 22779U 93054A   15311.29545418 -.00000077  00000-0  00000+0 0  9991
2 22779  55.4766 358.0207 0101203 103.0330   3.0187  2.00460895162545`

  const ephemeris = {
    name: 'NAVSTAR 34 (USA 94)',
    intl_designator: '1993-054A',
    catalog_number: 22779,
    classification_type: 'U',
    epoch: '2015-11-07T07:05:27.241152Z',
    eccentricity: 0.0101203,
    inclination: 55.4766,
    right_ascension: 358.0207,
    argument_of_periapsis: 103.033,
    mean_anomaly: 3.0187,
    mean_motion: 2.00460895,
    mean_motion_dot: -1.54e-06,
    mean_motion_dot_dot: 0,
    b_star: 0,
    revolutions_at_epoch: 16254,
    ephemeris_type: 0,
    element_set_number: 999,
  }

  t.deepEqual( parser(tle), ephemeris )

})

test('Parsing a three-line element set #4', t => {

  t.plan(1)

  const tle = `0 ELEKTRON 3
1   829U 64038A   15310.88362162 +.00000744 +00000-0 +20588-3 0  9997
2   829 060.7998 113.7384 2988688 041.9046 080.5695 09.12844870660659`

  const ephemeris = {
    name: 'ELEKTRON 3',
    intl_designator: '1964-038A',
    catalog_number: 829,
    classification_type: 'U',
    epoch: '2015-11-06T21:12:24.907968Z',
    eccentricity: 0.2988688,
    inclination: 60.7998,
    right_ascension: 113.7384,
    argument_of_periapsis: 41.9046,
    mean_anomaly: 80.5695,
    mean_motion: 9.1284487,
    mean_motion_dot: 1.488e-05,
    mean_motion_dot_dot: 0,
    b_star: 0.00020588,
    revolutions_at_epoch: 66065,
    ephemeris_type: 0,
    element_set_number: 999,
  }

  t.deepEqual( parser(tle), ephemeris )

})

test('Parsing a two-line element set #1', t => {

  t.plan(1)

  const tle = `1 25544U 98067A   15310.90801927  .00009031  00000-0  13975-3 0  9997
2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970245`

  const ephemeris = {
    intl_designator: '1998-067A',
    catalog_number: 25544,
    classification_type: 'U',
    epoch: '2015-11-06T21:47:32.864928Z',
    eccentricity: 0.0006748,
    inclination: 51.644,
    right_ascension: 91.7795,
    argument_of_periapsis: 114.3849,
    mean_anomaly: 28.9641,
    mean_motion: 15.54854844,
    mean_motion_dot: 1.8062e-04,
    mean_motion_dot_dot: 0,
    b_star: 0.00013975,
    revolutions_at_epoch: 97024,
    ephemeris_type: 0,
    element_set_number: 999,
  }

  t.deepEqual( parser(tle), ephemeris )

})

test('Parsing an invalid two-line element set #1', t => {

  t.plan(1)

  const tle = `1 25544U 98067A   15310.90801927  .00009031  00000-0  13975-3 0  9992
2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970241`

  t.throws( () => {
    parser(tle)
  })

})
