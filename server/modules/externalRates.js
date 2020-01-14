const axios = require('axios');
const { Pair, HistoricalRate } = require('../sequelize');
const BITSTAMP = 'BitStamp';
const CRYPTOCOMPARE = 'CryptoCompare';
const EXTERNAL_SOURCES = [CRYPTOCOMPARE, BITSTAMP];
var socketConf = require('../socketConf');

/**
 * fetching and saving rates for all pairs from external APIs
 */
const fetchAllPairsDetails = async () => {
	let singlePairRatesPromises = [];
	let pairs = await Pair.findAll({ attributes: ['base', 'quote'] });

	pairs.forEach((pair, i, arr) => {
		EXTERNAL_SOURCES.forEach((source, i, arr) => {
			let promise = null;
			switch (source) {
				case CRYPTOCOMPARE:
					promise = fetchCryptoComparePairRate(pair.base, pair.quote);
					break;
				case BITSTAMP:
					promise = fetchBitStampPairRate(pair.base, pair.quote);
					break;
				default:
					break;
			}
			if (promise !== null) {
				singlePairRatesPromises.push(promise);
			}
		});
	});

	let allPairsRates = await Promise.all(singlePairRatesPromises);
	// updating db
	updateMarketPrices(allPairsRates);
};

/**
 * fetching rate for a given pair from Bitstamp.net
 * @param {String} base currency
 * @param {String} quote currency
 */
const fetchBitStampPairRate = async (base, quote) => {
	try {
		const response = await axios.get(
			'https://www.bitstamp.net/api/v2/ticker/' +
				(base + quote).toLowerCase() +
				'/',
		);
		return {
			base: base,
			quote: quote,
			rate: response.data.last,
			source: BITSTAMP,
		};
	} catch (err) {
		console.log(err);
		return false;
	}
};

/**
 * fetching rate for a given pair from cryptocompare.com (only Kraken rates)
 * @param {String} base currency
 * @param {String} quote currency
 */
const fetchCryptoComparePairRate = async (base, quote) => {
	const apikey = process.env.CRYPTO_COMPARE_APIKEY;
	let req = {
		headers: { apikey: '' },
		params: { fsym: base, tsym: quote, e: 'Kraken' },
	};
	try {
		const response = await axios.get(
			'https://min-api.cryptocompare.com/data/generateAvg',
			req,
		);
		return {
			base: base,
			quote: quote,
			rate: response.data.RAW.PRICE,
			source: CRYPTOCOMPARE,
		};
	} catch (err) {
		console.log(err);
		return false;
	}
};

/**
 * save the recent market prices of passed pairs
 */
const updateMarketPrices = async newRates => {
	let pairsMarketPrice = {};
	newRates.forEach((newRate, i, arr) => {
		if (newRate !== false && !isNaN(newRate.rate)) {
			HistoricalRate.create({
				base: newRate.base,
				quote: newRate.quote,
				price: newRate.rate,
				source: newRate.source,
			});

			//create pairsMarketPrice to calc avarage rate later on
			let pairKey = newRate.base + newRate.quote;
			if (pairsMarketPrice[pairKey]) {
				pairsMarketPrice[pairKey].rates.push(parseFloat(newRate.rate));
			} else {
				pairsMarketPrice[pairKey] = {
					base: newRate.base,
					quote: newRate.quote,
					rates: [parseFloat(newRate.rate)],
				};
			}
		}
	});

	//updating avarage rate as the latest market price of a pair
	for (let key in pairsMarketPrice) {
		let pair = pairsMarketPrice[key];
		let avarageRate = pair.rates.reduce((p, c, _, a) => p + c / a.length, 0);
		Pair.update(
			{ market_price: avarageRate },
			{ where: { base: pair.base, quote: pair.quote } },
		);

		socketConf.io.emit('marketPrices', {
			base: pair.base,
			quote: pair.quote,
			market_price: avarageRate,
		});
	}

	emitHistoricalPricesUpdate();
};

/**
 * emiting the changes via socket to clients
 */
async function emitHistoricalPricesUpdate() {
	const pairs = await Pair.findAll({ attributes: ['base', 'quote'] });

	pairs.forEach((pair, i, arr) => {
		fetchPairHistoricalPrices(pair.base, pair.quote).then(rates => {
			socketConf.io.emit('rates', {
				pair: pair.base + '/' + pair.quote,
				rates: rates,
			});
		});
	});
}

/**
 * returning historical prices from db by pair grouped by source
 * @param {*} base
 * @param {*} quote
 */
const fetchPairHistoricalPrices = async (base, quote) => {
	let singleSourceRatesPromises = [];
	EXTERNAL_SOURCES.forEach((source, i, arr) => {
		let promise = getPairHistoricaPricesFromSingleSource(source, base, quote);
		singleSourceRatesPromises.push(promise);
	});

	let allRates = await Promise.all(singleSourceRatesPromises);
	return allRates;
};

const getPairHistoricaPricesFromSingleSource = async (source, base, quote) => {
	try {
		let rates = await HistoricalRate.findAll({
			attributes: ['price', 'created_at'],
			where: { base: base, quote: quote, source: source },
			order: [['id', 'DESC']],
			limit: 5,
			raw: true,
		});
		return { source: source, rates: rates };
	} catch (err) {
		console.log(err);
		return false;
	}
};

module.exports = {
	fetchAllPairsDetails: fetchAllPairsDetails,
	fetchPairHistoricalPrices: fetchPairHistoricalPrices,
};
