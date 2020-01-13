module.exports = (sequelize, type) => {
	return sequelize.define(
		'pair',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			base: {
				type: type.STRING(10),
				allowNull: false,
			},
			quote: {
				type: type.STRING(10),
				allowNull: false,
			},
			market_price: {
				type: type.DECIMAL(20, 8),
				defaultValue: 0,
				allowNull: false,
			},
			symbol: {
				type: type.STRING(5),
				defaultValue: '',
				allowNull: false,
			},
			created_at: {
				type: type.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
				allowNull: false,
			},
			updated_at: {
				type: type.DATE(3),
				defaultValue: sequelize.literal(
					'CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)',
				),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
