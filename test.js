const suite = require("testjs");
const converter = require("./conversion.js");


const testWithPrecision = (fct, values, test, precision) => {
	for (let i = 0; i < values.length; i++) {
		const actual = fct(values[i]['input']);
		const actualX = actual[0];
		const actualY = actual[1];

		test.equal(Math.abs(actualX - values[i]['expected'][0]) <= precision, true);
		test.equal(Math.abs(actualY - values[i]['expected'][1]) <= precision, true);
	}
}

suite.run({
    'from3948to4326': (test) => {
		const values = [
			{
				'input':[48.5152977, 2.20564504],
				'expected': [-7.0607778, -8.68246],
			},
			{
				'input': [1813975.77, 6981776.49],
				'expected': [4.4714355, 46.027482],
			},
			{
				'input': [1497203.14, 7218383.19],
				'expected': [0.2746583, 48.1331005]
			}
		];
		testWithPrecision(converter.from3948to4326, values, test, 0.000001);
		test.done();
    },

	// attention à la précision qui est plus faible dans ce sens de conversion
    'from4326to3948': (test) => {
		const values = [
			{
				'input':[48.5152977, 2.20564504],
				'expected': [8017606.41, 3524817.08],
			},
			{
				'input': [4.570313, 47.989922],
				'expected': [1817189.88, 7200073.02],
			},
			{
				'input': [2.9663088, 46.2862238],
				'expected': [1697402.74, 7009461.95],
			},
		];
		testWithPrecision(converter.from4326to3948, values, test, 0.01);

		test.done();
    }
});
