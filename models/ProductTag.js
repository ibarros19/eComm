const { Model, INTEGER } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    product_id:{
      type: INTEGER,
      allowNull:false,
      required: true
    },
    tag_id:{
      type: INTEGER,
      allowNull:false,
      required: true
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;