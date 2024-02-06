
const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

//创建模型 (Model zd_user -> zd_users)
const User = seq.define('zd_user',{
    //id 会被sequelize自动创建管理
    user_name:{
        type:DataTypes.STRING,//
        allowNull:false, //是否空
        unique:true, //是否唯一
        comment:'用户名,唯一'
    },
    password:{
        type:DataTypes.CHAR(64),//密码长度
        allowNull:false, //是否空
        comment:'密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,//布尔值
        allowNull:false, //是否空
        defaultValue:0, //默认值
        comment:'是否为管理员,0-(默认不是)，1-是'
    }
})
// 强制同步数据库
// User.sync({force:false});

module.exports = User;