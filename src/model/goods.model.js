const {DataTypes} = require('sequelize');

// 数据库连接
const sq = require('../db/seq');

// 创建数据库表模型
const Goods = sq.define('zd_goods', {

    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment:'商品价格'
    },
    // 商品库存
    goods_num:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:'商品数量'
    },
    goods_img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:'商品图片的url'
    }
})
// Goods.sync({force: false});

module.exports = Goods;