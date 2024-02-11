const { goodsFormatError } = require('../constant/err.type')
const validator = async (ctx, next) => {
    try{
        ctx.verifyParams({
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',required:true},
            goods_num:{type:'number',required:true},
            goods_img:{type:'string',required:true},
        })
    } catch (error) {
        // 服务器打印错误信息
        console.error (error);
        // 验证失败，创建一个goodsFormatError对象
        goodsFormatError.result = error;
        // 验证失败，将错误信息通过ctx.app.emit传递给全局错误处理中间件
        // 验证失败信息传递给客户端显示
        ctx.app.emit('error',goodsFormatError,ctx);
    }
    await next();
}

module.exports = {
    validator
}; 