// 最主要的功能是启动一个http服务 和业务进行分开
const { APP_PORT } = require('./config/config.default');//添加动态端口

const app = require('./app');

// 监听
app.listen( APP_PORT ,()=>{
    console.log(`server is running at http://localhost:${APP_PORT}`);
});