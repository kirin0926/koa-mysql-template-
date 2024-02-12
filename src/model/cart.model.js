const {DataTypes} = require('sequelize');

// 数据库连接
const sq = require('../db/seq');

const Cart = sq.define('zd_cart',{
    
})

// 强制创建表
// Goods.sync({force: false});

module.exports = Cart;