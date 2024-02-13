const { cartFormatError } = require('../constant/err.type')
const validator = (rules) =>{
    return async(ctx,next)=>{
        try {
            ctx.verifyParams(rules)
            //rules传的内容 {goods_id:{type:'number',required:true},}
        } catch (error) {
            console.error('验证参数失败',error);
            cartFormatError.result = error;
            return ctx.app.emit('error',cartFormatError,ctx)
        }
        await next();
    }
}
module.exports = {
    validator
}