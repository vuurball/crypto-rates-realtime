CREATE DATABASE IF NOT EXISTS `cryptorates` 
USE `cryptorates`;

CREATE TABLE IF NOT EXISTS `historical_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base` varchar(10) NOT NULL,
  `quote` varchar(10) NOT NULL,
  `price` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `source` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `base_quote_created_at` (`base`,`quote`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=latin1;

INSERT INTO `historical_rates` (`id`, `base`, `quote`, `price`, `source`, `created_at`, `updated_at`) VALUES
	(236, 'BTC', 'USD', 7709.00000000, 'CryptoCompare', '2020-01-10 10:28:27', '2020-01-10 10:28:27'),
	(237, 'BTC', 'USD', 7716.97000000, 'BitStamp', '2020-01-10 10:28:27', '2020-01-10 10:28:27'),
	(238, 'LTC', 'USD', 44.25000000, 'CryptoCompare', '2020-01-10 10:28:27', '2020-01-10 10:28:27'),
	(239, 'ETH', 'USD', 135.90000000, 'CryptoCompare', '2020-01-10 10:28:27', '2020-01-10 10:28:27'),
	(240, 'ETH', 'USD', 135.82000000, 'BitStamp', '2020-01-10 10:28:27', '2020-01-10 10:28:27'),
	(241, 'LTC', 'USD', 44.43000000, 'BitStamp', '2020-01-10 10:28:27', '2020-01-10 10:28:27'),
	(242, 'BTC', 'USD', 7691.10000000, 'CryptoCompare', '2020-01-10 10:31:26', '2020-01-10 10:31:26'),
	(243, 'ETH', 'USD', 135.55000000, 'CryptoCompare', '2020-01-10 10:31:26', '2020-01-10 10:31:26'),
	(244, 'BTC', 'USD', 7697.79000000, 'BitStamp', '2020-01-10 10:31:26', '2020-01-10 10:31:26'),
	(245, 'ETH', 'USD', 135.40000000, 'BitStamp', '2020-01-10 10:31:26', '2020-01-10 10:31:26'),
	(246, 'LTC', 'USD', 44.11000000, 'CryptoCompare', '2020-01-10 10:31:26', '2020-01-10 10:31:26'),
	(247, 'LTC', 'USD', 44.43000000, 'BitStamp', '2020-01-10 10:31:26', '2020-01-10 10:31:26'),
	(248, 'BTC', 'USD', 7710.10000000, 'CryptoCompare', '2020-01-10 10:39:07', '2020-01-10 10:39:07'),
	(249, 'LTC', 'USD', 44.43000000, 'BitStamp', '2020-01-10 10:39:07', '2020-01-10 10:39:07'),
	(250, 'BTC', 'USD', 7715.90000000, 'BitStamp', '2020-01-10 10:39:07', '2020-01-10 10:39:07'),
	(251, 'ETH', 'USD', 135.74000000, 'CryptoCompare', '2020-01-10 10:39:07', '2020-01-10 10:39:07'),
	(252, 'ETH', 'USD', 135.75000000, 'BitStamp', '2020-01-10 10:39:07', '2020-01-10 10:39:07'),
	(253, 'LTC', 'USD', 44.18000000, 'CryptoCompare', '2020-01-10 10:39:07', '2020-01-10 10:39:07'),
	(254, 'BTC', 'USD', 7704.90000000, 'CryptoCompare', '2020-01-10 10:41:34', '2020-01-10 10:41:34'),
	(255, 'BTC', 'USD', 7710.00000000, 'BitStamp', '2020-01-10 10:41:34', '2020-01-10 10:41:34'),
	(256, 'ETH', 'USD', 135.76000000, 'CryptoCompare', '2020-01-10 10:41:34', '2020-01-10 10:41:34'),
	(257, 'ETH', 'USD', 135.78000000, 'BitStamp', '2020-01-10 10:41:34', '2020-01-10 10:41:34'),
	(258, 'LTC', 'USD', 44.18000000, 'CryptoCompare', '2020-01-10 10:41:34', '2020-01-10 10:41:34'),
	(259, 'LTC', 'USD', 44.43000000, 'BitStamp', '2020-01-10 10:41:34', '2020-01-10 10:41:34'),
	(272, 'BTC', 'USD', 7689.00000000, 'CryptoCompare', '2020-01-10 10:49:40', '2020-01-10 10:49:40'),
	(273, 'BTC', 'USD', 7692.93000000, 'BitStamp', '2020-01-10 10:49:40', '2020-01-10 10:49:40'),
	(274, 'ETH', 'USD', 135.66000000, 'CryptoCompare', '2020-01-10 10:49:40', '2020-01-10 10:49:40'),
	(275, 'ETH', 'USD', 135.52000000, 'BitStamp', '2020-01-10 10:49:40', '2020-01-10 10:49:40'),
	(276, 'LTC', 'USD', 44.10000000, 'CryptoCompare', '2020-01-10 10:49:40', '2020-01-10 10:49:40'),
	(277, 'LTC', 'USD', 44.15000000, 'BitStamp', '2020-01-10 10:49:40', '2020-01-10 10:49:40'),
	(278, 'BTC', 'USD', 7686.90000000, 'CryptoCompare', '2020-01-10 10:53:11', '2020-01-10 10:53:11'),
	(279, 'BTC', 'USD', 7689.00000000, 'BitStamp', '2020-01-10 10:53:11', '2020-01-10 10:53:11'),
	(280, 'ETH', 'USD', 135.58000000, 'CryptoCompare', '2020-01-10 10:53:11', '2020-01-10 10:53:11'),
	(281, 'ETH', 'USD', 135.52000000, 'BitStamp', '2020-01-10 10:53:11', '2020-01-10 10:53:11'),
	(282, 'LTC', 'USD', 44.05000000, 'CryptoCompare', '2020-01-10 10:53:11', '2020-01-10 10:53:11'),
	(283, 'LTC', 'USD', 44.01000000, 'BitStamp', '2020-01-10 10:53:11', '2020-01-10 10:53:11');

CREATE TABLE IF NOT EXISTS `pairs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base` varchar(10) NOT NULL,
  `quote` varchar(10) NOT NULL,
  `market_price` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `symbol` varchar(3) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


INSERT INTO `pairs` (`id`, `base`, `quote`, `market_price`, `symbol`, `created_at`, `updated_at`) VALUES
	(1, 'BTC', 'USD', 7687.95000000, '$', '2020-01-09 20:47:40', '2020-01-10 10:53:11'),
	(2, 'ETH', 'USD', 135.55000000, '$', '2020-01-09 20:47:40', '2020-01-10 10:53:11'),
	(3, 'LTC', 'USD', 44.03000000, '$', '2020-01-09 20:47:40', '2020-01-10 10:53:11');

