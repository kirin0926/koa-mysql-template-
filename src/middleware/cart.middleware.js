const { invalidGoodsIDError } = require('../constant/err.type')
const validator = async(ctx,next)=>{
    try {
        ctx.verifyParams({
            goods_id:{type:'number',required:true},
        })
    } catch (error) {
        console.error('验证参数失败',error);
        invalidGoodsIDError.result = error;
        return ctx.app.emit('error',invalidGoodsIDError,ctx)
    }
    await next();
}
module.exports = {
    validator
}