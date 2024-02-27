
// 1.导入路由
const Router = require('koa-router');

// 1.1中间件

// 1.2控制器

// 2.路由配置默认地址
const router = new Router({prefix: '/api/teacher'});

// 3.接口路由

// 3.1讲师申请入驻接口
router.post('/', (ctx,next)=>{
    const {name,phone} = ctx.request.body;
    console.log(name,phone);
    ctx.body = {
        code:0,
        message:'teacherJoin ok',
        result:{}
    };
})

// 4.导出
module.exports = router;