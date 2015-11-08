
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

-   `name` **string**
-   `intl_designator` **string**
-   `catalog_number` **string**
-   `classification_type` **string**
-   `epoch` **string**
-   `mean_motion_dot` **number**
-   `mean_motion_dot_dot` **number**
-   `b_star` **number**
-   `inclination` **number**
-   `right_ascension` **number**
-   `eccentricity` **number**
-   `arg_pericenter` **number**
-   `mean_anomaly` **number**
-   `mean_motion` **number**
-   `revolutions_at_epoch` **number**
-   `element_set_number` **number**
-   `ephemeris_type` **number**
