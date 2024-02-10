// 导入token验证包
const jwt = require('jsonwebtoken');

//服务器创建用户
const { createUser, getUserInfo } = require('../service/user.service');  

//导入错误类型
const {userRegisterError} = require('../constant/err.type');    

// 引入全局变量  之前安装的dotenv
const {JWT_SECRET_KEY} = process.env;

class UserController {
    async register(ctx, next) {
        // 1.获取数据
        // console.log(ctx.request);
        const {user_name,password} = ctx.request.body;
        // 2.操作数据库
        try{
            // 操作数据库封装了一个service层
            const res = await createUser(user_name,password);
            // console.log(res)
            // 3.返回结果
            ctx.body = {
                code:0,
                message:'register ok',
                result:{
                    id:res.id,
                    user_name:res.user_name
                }
            };
            // ctx.body = ctx.request.body;
        }catch(err){
            // 当写入数据库错误的时候 catch捕捉到错误  并且抛出错误
            // 服务器内部操作数据库出现的错误
            console.error(err);
            ctx.app.emit('error',userRegisterError,ctx);
        }
    }

    async login(ctx, next) {
        const {user_name} = ctx.request.body;
        // 1.获取用户信息 (token的payload中，记录ID user_name is_admin )
        // console.log(user_name);
        try{
            //  password, ...resUser es6语法 剔除password 剩下的放在res里   从返回结果对象中剔除掉password属性，将剩下的属性放到一个新的对象。
            const {password,...res} = await getUserInfo({user_name});
            console.log(res,JWT_SECRET_KEY);
            ctx.body = {
                code:0,
                message:"login ok",
                result:{
                    // expiresIn 过期时间 1d = 1天      10 = 10秒过期
                    token:jwt.sign(res,JWT_SECRET_KEY,{expiresIn:'1d'}),
                }
            };
        } catch (error) {
            // 如果出错
            console.log('用户controller登陆失败',error);
            ctx.app.emit('error',userRegisterError,ctx);
        }
    }
}

// 导出UserController
module.exports = new UserController();