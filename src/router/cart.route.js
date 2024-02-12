// 1.导入koa-router
const Router = require('koa-router');

// 中间件
const {auth} = require('../middleware/auth.middleware');
const {validator} = require('../middleware/cart.middleware');

// 控制器
const { add } = require('../controller/cart.controller')

// 2.实例化router对象
const router = new Router({prefix: '/carts'});
// 3.编写路由规则

// 3.1添加到购物车接口 ： 用户要登陆 中间件校验，格式
router.post('/',auth,validator, add)

router.get('/list', async (ctx, next) => {

    ctx.body = '购物车列表';
})
router.post('/update', async (ctx, next) => {
    
})
// 4.导出
module.exports = router;