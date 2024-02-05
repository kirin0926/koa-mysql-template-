// route代表路由  将路由和控制器拆分 
// 路由： 解析url 分发给控制器对应的方法
// 控制器： 用来处理具体的业务
const Router = require('koa-router');

const { register,login } = require('../controller/user.controller');

const router = new Router({prefix: '/users'});

// GET /users/ 和prefix的内容进行一个拼接
//将具体业务内容放置到控制器里面   将不同的路由内容 交给控制器来做   路由分发
router.get('/', async (ctx, next) => {
  ctx.body = 'User list hello';
})
 

router.post('/register', register);// 注册接口
router.post('/login', login);// 登陆接口

module.exports = router;