const proj4 = require("proj4");

/**
 * See:
 * https://epsg.io/4326
 * https://github.com/proj4js/proj4js#named-projections
 */
proj4.defs('EPSG:4326', '+title=WGS84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees');

/**
 * EPSG:3948 is France-scoped
 * See:
 * https://epsg.io/3948
 * https://github.com/proj4js/proj4js#named-projections
 */
proj4.defs('EPSG:3948', 'PROJCS["RGF93/CC48", GEOGCS["RGF93", DATUM["Reseau_Geodesique_Francais_1993", SPHEROID["GRS1980", 6378137, 298.257222101, AUTHORITY["EPSG", "7019"]], TOWGS84[0, 0, 0, 0, 0, 0, 0], AUTHORITY["EPSG", "6171"]], PRIMEM["Greenwich", 0, AUTHORITY["EPSG", "8901"]], UNIT["degree", 0.0174532925199433, AUTHORITY["EPSG", "9122"]], AUTHORITY["EPSG", "4171"]], PROJECTION["Lambert_Conformal_Conic_2SP"], PARAMETER["standard_parallel_1", 47.25], PARAMETER["standard_parallel_2", 48.75], PARAMETER["latitude_of_origin", 48], PARAMETER["central_meridian", 3], PARAMETER["false_easting", 1700000], PARAMETER["false_northing", 7200000], UNIT["metre", 1, AUTHORITY["EPSG", "9001"]], AXIS["X", EAST], AXIS["Y", NORTH], AUTHORITY["EPSG", "3948"]]');

/**
 * Takes coordinates in EPSG:3948 and returns coordinates in EPSG:4326
 * @param {*} coordinates a tuple of coordinates in EPSG:3948
 * @returns a tuple of coordinates in EPSG:4326
 */
const from3948to4326 = (coordinates) => {
    return proj4('EPSG:3948', 'EPSG:4326', coordinates);
}

/**
 * Takes coordinates in EPSG:4326 and returns coordinates in EPSG:3948
 * @param {*} coordinates a tuple of coordinates in EPSG:4326
 * @returns a tuple of coordinates in EPSG:3948
 */
const from4326to3948 = (coordinates) => {
    return proj4('EPSG:4326', 'EPSG:3948', coordinates);
}

exports.from3948to4326 = from3948to4326;
exports.from4326to3948 = from4326to3948;