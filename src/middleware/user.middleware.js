// 导入密码加密
const bcrypt = require('bcryptjs');

// 查询数据库
const { getUserInfo } = require('../service/user.service');

// 导入错误类型
const {
    userformateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExited,
    userLoginError,
    invalidUserPasswordError
} = require('../constant/err.type');

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
    try{
        const res = await getUserInfo({user_name});
        // 如果res为空 会出现错误
        if(res){
            console.error('用户名已经存在',{user_name});
            ctx.app.emit('error' , userAlreadyExited , ctx);
            return
        }
        await next()
    }catch(err){
        // 注册错误 打印错误在终端
        console.error('获取用户信息失败',err)
        // emit将请求错误返回给请求接口的人
        ctx.app.emit('error' , userRegisterError , ctx);
        // console.error(err);
    }
}

// 密码加密
const cryptPassword = async (ctx,next)=>{
    // 获取用户上传的密码
    const {password} = ctx.request.body;
    // 10次加盐
    const salt = bcrypt.genSaltSync(10);
    // 对密码进行加密 hash保存的是秘文 把原来的明文覆盖掉
    const hash = bcrypt.hashSync(password,salt);
    // 把原来的明文覆盖掉
    ctx.request.body.password = hash;
    // 然后下一步
    await next();
}

// 验证登陆
const verifyLogin = async (ctx,next)=>{
    const {user_name ,password} = ctx.request.body;
    const res = await getUserInfo({user_name});
    try{
        // 1.根据用户名查数据库 看是否存在 （不存在就报错） 
        // 如果用户不存在
        if(!res){
            console.error('用户名不存在',{user_name});
            ctx.app.emit('error' , userDoesNotExited , ctx);
            return;
        }
        // 2.密码是否匹配 (不匹配就报错)  剩下就继续执行 password用户传来的密码 、、、res.password数据库里的密码
        if(!bcrypt.compareSync(password,res.password)){
            console.error('密码错误',{password});
            return ctx.app.emit('error' , invalidUserPasswordError , ctx);
        }
        await next();
    }catch(err){
        console.error('验证中间件登录失败',err);
        ctx.app.emit('error' , userLoginError , ctx);
    }
}


// 导出路由中间件验证
module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
};