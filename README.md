
# tle-parser

## API

### parser

Parses a TLE and returns a human readable object of the orbital elements.
(Two and three line TLEs are supported)

**Parameters**

-   `tle` **string** The TLE as a string (with line breaks etc.)

Returns **Elements** Object containing the TLEs orbital elements.

**Examples**

```javascript
import parser from 'tle-parser'
const tle = `0 ISS (ZARYA)
1 25544U 98067A   15310.90801927  .00009031  00000-0  13975-3 0  9997
2 25544  51.6440  91.7795 0006748 114.3849  28.9641 15.54854844970245`
const elements = parser(tle)
```

### Elements

**Properties**

-   `name` **string** Name of the object
-   `intl_designator` **string** International Designator (YYYY-NNNAAA)
-   `catalog_number` **string** Satellite Catalog Number (NNNNN)
-   `classification_type` **string** Classification Type
-   `epoch` **string** Epoch as an ISO8601/RFC3339 style date
-   `inclination` **number** Inclination [degrees]
-   `eccentricity` **number** Eccentricity
-   `right_ascension` **number** Right Ascension of the Ascending Node [degrees]
-   `arg_pericenter` **number** Argument of Perigee [degrees]
-   `mean_anomaly` **number** Mean Anomaly [degrees]
-   `mean_motion` **number** Mean Motion [revolutions/day]
-   `mean_motion_dot` **number** First time derivative of the Mean Motion
-   `mean_motion_dot_dot` **number** Second time derivative of the Mean Motion
-   `b_star` **number** B* drag term
-   `revolutions_at_epoch` **number** Revolution Number at Epoch
-   `element_set_number` **number** Element Set Number
-   `ephemeris_type` **number** Element Set Type
