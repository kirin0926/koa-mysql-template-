// 导入链接数据库的插件
const {Sequelize} = require('sequelize');

// 导入获取默认配置
const {MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,MYSQL_DIALECT} = require('../config/config.default');

// 实例化传递
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: MYSQL_DIALECT
})

// 测试链接是否成功
// seq.authenticate().then(()=>{
//   console.log('数据库连接成功')  
// }).catch(err=>{
//     console.log('数据库连接失败',err)
// })

// 导出
module.exports = seq;