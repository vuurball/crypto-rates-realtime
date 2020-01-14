const { Pair, HistoricalRate } = require('../sequelize');
const externalRates = require('../modules/externalRates');

// import rates from external sources
exports.importRates = (req, res) => {
	// looped process for importing rates every 30 seconds and updating client via socket
	setInterval(externalRates.fetchAllPairsDetails, 30000);
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
