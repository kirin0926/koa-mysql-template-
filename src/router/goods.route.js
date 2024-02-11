// 导入路由
const Router = require('koa-router');

// 导入中间件 
const { auth,hasAdminPermission } = require('../middleware/auth.middleware');
const { validator, } = require('../middleware/goods.middleware');

// 商品上传接口 控制器操作数据库内容
const {upload,createGoods,updateGoods} = require('../controller/goods.controller');

// 路由配置默认地址
const router = new Router({prefix: '/goods'});

// 商品图片上传接口
router.post('/upload',auth,hasAdminPermission, upload);

// 发布商品的接口   validate参数的校验
router.post('/creategoods' , auth , hasAdminPermission , validator , createGoods);

// 修改商品接口     validate参数的校验
router.put('/:id', auth , hasAdminPermission , validator , updateGoods);

// 导出
module.exports = router;