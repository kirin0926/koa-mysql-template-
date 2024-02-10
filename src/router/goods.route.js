// 导入路由
const Router = require('koa-router');
// 商品上传接口 控制器操作数据库内容
const {upload} = require('../controller/goods.controller')
// 路由配置默认地址
const router = new Router({prefix: '/goods'})

// 图片上传接口
router.post('/upload', upload)


// 导出
module.exports = router;