// 1.导入node模块放在最上面
const path = require('path');
const os = require('os');

// 2.通过npm or yarn 安装的放在第二部分
// koa框架
const Koa = require('koa');
// const { KoaBody } = require('koa-body');//处理post请求参数
const { koaBody } = require('koa-body');//
const KoaStatic = require('koa-static');//处理静态资源
const Parameter = require('koa-parameter');//校验方法
// const cors = require('koa2-cors');//处理跨域

// 3.自己写的放在第三部分
//错误处理中间件
const errHandler = require('./errHandler');
//加载路由合集
const router = require('../router');

// 实例化路由
const app = new Koa();

// 中间件必须是函数 function
app.use( koaBody({
    multipart:true, // 支持文件上传
    formidable:{
        // 指定上传文件的目录 在配置选项option里，不推荐使用相对路径    path.join(__dirname,'../uploads')
        // 针对这个uploadDir可以使用os.tmpdir() 临时目录 const os = require('os')； uploadDir: os.tmpdir(),
        // 在option里的相对路径，不是相对的，相对process.cwd()
        // uploadDir:path.join(__dirname,'../uploads'),
        // uploadDir: os.tmpdir(),
        uploadDir:path.resolve(__dirname, '../upload'),
        // 保持文件的后缀
        keepExtensions:true
    }
}) );//处理post请求参数 所有的中间件处理之前  在ctx之前产生一个request对象
//处理静态资源 路径
app.use(KoaStatic(path.join(__dirname,'../upload')));
// 校验方法
app.use(Parameter(app))
//注册路由
app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on('error',errHandler)

// 最后导出
module.exports =app;