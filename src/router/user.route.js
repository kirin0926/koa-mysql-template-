// route代表路由  将路由和控制器拆分 
// 路由： 解析url 分发给控制器对应的方法
// 控制器： 用来处理具体的业务

// 导入路由
const Router = require('koa-router');

// 操作器之行前要先校验数据是否正确
const { userValidator , verifyUser ,cryptPassword , verifyLogin } = require('../middleware/user.middleware');

// 登陆注册接口 控制器操作数据库内容
const { register , login } = require('../controller/user.controller'); 

// 路由配置默认地址
const router = new Router({prefix: '/users'});

// GET /users/ 和prefix的内容进行一个拼接
// 将具体业务内容放置到控制器里面   将不同的路由内容 交给控制器来做   路由分发
router.get('/', async (ctx, next) => {
  ctx.body = 'User list hello';
})
 
// 中间件   userValidator用户名密码是否存在   verifyUser用户是否注册  cryptPassword用户密码加密
router.post('/register',userValidator,verifyUser,cryptPassword, register);// 注册接口 先使用userValidator 中间件验证 通过后再执行注册 控制器操作

// 登陆接口   
router.post('/login',userValidator,verifyLogin, login);

module.exports = router;