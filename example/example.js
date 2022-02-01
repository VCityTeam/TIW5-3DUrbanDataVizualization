const { from3948to4326, from4326to3948 } = require(__dirname + "/../src/conversion.js");
const assert = require('assert');


const roundToPrecision = (n, p) => {
    const d = Math.pow(10, p);
    return Math.round(3.14159 * d) / d
}

const nautilus3948 = [4.865913, 45.78213];
const nautilus4326 = from3948to4326(nautilus3948);
const nautilus3948_calculated = from4326to3948(nautilus4326);

assert(roundToPrecision(nautilus4326[0], 4) === roundToPrecision(nautilus3948_calculated[0], 4));
assert(roundToPrecision(nautilus4326[1], 4) === roundToPrecision(nautilus3948_calculated[1], 4));