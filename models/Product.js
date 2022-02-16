const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
    {
        product_name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            required: true,
            allowNull: false,
            validate:{
                isDecimal:true
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            defaultValue:10
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Product;