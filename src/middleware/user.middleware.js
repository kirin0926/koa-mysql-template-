const { getUserInfo } = require('../service/user.service');
const { userformateError,userAlreadyExited} = require('../constant/err.type');

// 用户验证格式是否正确
const userValidator = async (ctx,next)=>{
    const {user_name,password} = ctx.request.body;

    //合法性 格式最起码得对的
    if (!user_name || !password) {
        console.error('用户名或密码为空',ctx.request.body)
        ctx.app.emit('error',userformateError,ctx)
        return
    }
    await next()
}

// 校验用户是否存在
const verifyUser = async (ctx,next)=>{
    const {user_name} = ctx.request.body;

    //合理性
    // if(await getUserInfo(user_name)){
    //     ctx.app.emit('error' , userAlreadyExited , ctx);
    //     return
    // }
    try{
        const res = await getUserInfo({user_name});
        // 如果res为空 会出现错误
        if(res){
            console.error('用户名已经存在',{user_name});
            // 
            ctx.app.emit('error' , userAlreadyExited , ctx);
            return
        }
    }catch(err){
        // 注册错误 打印错误在终端
        console.error('获取用户信息失败',err)
        // emit将请求错误返回给请求接口的人
        ctx.app.emit('error' , userRegisterError , ctx);
        // console.error(err);
        return
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser
};