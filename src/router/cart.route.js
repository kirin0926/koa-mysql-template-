// 1.导入koa-router
const Router = require('koa-router');

// 中间件
const {auth} = require('../middleware/auth.middleware');
const {validator} = require('../middleware/cart.middleware');

// 控制器
const { add,findAll,update,remove } = require('../controller/cart.controller')

// 2.实例化router对象
const router = new Router({prefix: '/carts'});

// 3.编写路由规则
// 3.1添加到购物车接口 ： auth用户要登陆 中间件校验，格式
router.post('/',auth,validator({goods_id:'number'}), add)

// 3.2获取购物车的列表
router.get('/list',auth,findAll)

// 3.3更新购物车 patch打补丁的方式 好处 可以只更新数量，也可以只更新状态，也可以两个都更新,任选其一，但是不能两个都不传\\\update:id具体修改哪一条数据
router.patch('/',auth,validator({
    number:{type:'number',required:false},
    selected:{type:'boolean',required:false}}),
    update)

// 3.4删除购物车
router.delete('/',auth,validator({ids:'array'}),remove);

// 4.导出
module.exports = router;