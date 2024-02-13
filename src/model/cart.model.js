// 1.导入sequelize的连接
const {DataTypes} = require('sequelize');
// 数据库连接
const sq = require('../db/seq');
const Goods = require('./goods.model');

// 2.定义数据模型
const Cart = sq.define('zd_cart',{
    goods_id:{
        type: DataTypes.INTEGER,//INTEGER整形
        allowNull: false,//不允许为空
        comment: '商品ID'
    },
    user_id:{
        type: DataTypes.INTEGER,//INTEGER整形
        allowNull: false,//不允许为空
        comment: '用户ID'
    },
    number:{
        type: DataTypes.INTEGER,//INTEGER整形
        allowNull: false,//不允许为空
        defaultValue: 1,//默认值
        comment: '商品数量'
    },
    selected:{
        type: DataTypes.BOOLEAN,//BOOLEAN布尔值
        allowNull: false,//不允许为空
        defaultValue: true,//默认值
        comment: '是否选中'
    }
})

// 3.同步数据（强制创建表） force代表如果这个表存在，会把这个表删掉 重新创建 如果是false之前创建锅的表不会删
// Cart.sync({force: true});

// 为什么这里用belongsTo，因为cart表里有一个goods_id 指向goos里
Cart.belongsTo(Goods,{
    foreignKey: 'goods_id',
    as: 'goods_info'
})
// 4.导出
module.exports = Cart;