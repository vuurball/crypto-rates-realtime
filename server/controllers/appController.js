const { Pair, HistoricalRate } = require('../sequelize');
const externalRates = require('../modules/externalRates');

// import rates from external soources
exports.importRates = (req, res) => {
	//import every 20 seconds-> get historical data-> emit
	setInterval(externalRates.fetchAllPairsDetails, 10000);
	res.send('ok');
};

// return all pairs and their market price from db
exports.getPairs = async (req, res) => {
	res.json(
		await Pair.findAll({
			attributes: ['base', 'quote', 'market_price', 'symbol'],
		}),
	);
};

// return historical rates from db
exports.getHistoricalRates = async (req, res) => {
	res.json(
		await externalRates.fetchPairHistoricalPrices(
			req.params.base,
			req.params.quote,
		),
	);
};

//import every 5 seconds-> get historical data-> emit
