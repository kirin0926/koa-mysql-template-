// 这个页面做业务相关的
const Koa = require('koa');//koa框架
const userRouter = require('../router/user.route');//加载路由

// 实例化路由
const app = new Koa();

// 中间件必须是函数 function
app.use(userRouter.routes()); //注册路由


module.exports =app;