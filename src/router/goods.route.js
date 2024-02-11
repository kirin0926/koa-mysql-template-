// 导入路由
const Router = require('koa-router');

// 导入中间件 
const { auth,hasAdminPermission } = require('../middleware/auth.middleware');
const { validator, } = require('../middleware/goods.middleware');

// 商品上传接口 控制器操作数据库内容
const {upload,createGoods,updateGoods,removeGoods,restoreGoods,findAllGoods} = require('../controller/goods.controller');

// 路由配置默认地址
const router = new Router({prefix: '/goods'});

// 商品图片上传接口
router.post('/upload',auth,hasAdminPermission, upload);

// 发布商品的接口   validate参数的校验
router.post('/creategoods' , auth , hasAdminPermission , validator , createGoods);

// 修改商品接口     validate参数的校验
router.put('/:id', auth , hasAdminPermission , validator , updateGoods);

// 硬删除商品接口
// router.delete('/:id', auth , hasAdminPermission , removeGoods);

// 商品下架接口
router.post('/:id/off',auth , hasAdminPermission , removeGoods);

// 商品上架接口
router.post('/:id/on',auth , hasAdminPermission , restoreGoods);

// 获取商品列表接口
router.get('/',findAllGoods);

// 导出
module.exports = router;