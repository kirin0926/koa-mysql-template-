// 这个页面做业务相关的
const Koa = require('koa');//koa框架
// const { KoaBody } = require('koa-body');//处理post请求参数
const { koaBody } = require('koa-body');

const errHandler = require('./errHandler');//错误处理中间件

const userRouter = require('../router/user.route');//加载路由

// 实例化路由
const app = new Koa();

// 中间件必须是函数 function
app.use( koaBody() );//处理post请求参数 所有的中间件处理之前  在ctx之前产生一个request对象
app.use(userRouter.routes()); //注册路由

// 统一的错误处理
app.on('error',errHandler)

// 最后导出
module.exports =app;