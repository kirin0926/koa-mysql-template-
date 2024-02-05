const Koa = require('koa');

const Router = require('koa-router');

const app = new Koa();

app.use((ctx,next)=>{
    //ctx 记录了所有app的上下文
    ctx.body = 'hello api worlds';

})

app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000');
});