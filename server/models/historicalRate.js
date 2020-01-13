module.exports = (sequelize, type) => {
	return sequelize.define(
		'historical_rates',
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
			price: {
				type: type.DECIMAL(20, 8),
				defaultValue: 0,
				allowNull: false,
			},
			source: {
				type: type.STRING(20),
				defaultValue: '',
				allowNull: false,
			},
			created_at: {
				type: type.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
				allowNull: false,
			},
			updated_at: {
				type: type.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
