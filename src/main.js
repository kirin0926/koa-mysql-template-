// 最主要的功能是启动一个http服务 和业务进行分开
const { APP_PORT } = require('./config/config.default');//添加动态端口

// 导入koa 实例化app
const app = require('./app');

// 监听启动
app.listen( APP_PORT ,()=>{
    console.log(`server is running at http://localhost:${APP_PORT}`);
});

/**
 * main 导入app 监听启动app服务 业务和服务分开
 * router 将所有路由url转发给控制器 不同的方法
 * controller 控制器 实现一些业务逻辑 1.获取数据 解析数据 2.操作数据库 3.返回结果
 * service 操作数据库层 通过model来操作
 * model   
 */