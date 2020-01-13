const { Pair, HistoricalRate } = require('../sequelize');
const externalRates = require('../modules/externalRates');

// import rates from external soources
exports.importRates = (req, res) => {
	externalRates.fetchAllPairsDetails();
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
