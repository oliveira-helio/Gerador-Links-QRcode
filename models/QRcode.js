const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres',});

const QRCode = sequelize.define('QRCode', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

(async () => {
    await sequelize.sync();
})();

module.exports = QRCode;


