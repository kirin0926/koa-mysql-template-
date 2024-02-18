// 导入token验证包
const jwt = require('jsonwebtoken');
//服务器创建用户
const { createUser, getUserInfo, updateById } = require('../service/user.service');  
//导入错误类型
const {userRegisterError} = require('../constant/err.type');    
// 引入全局变量  之前安装的dotenv
const {JWT_SECRET_KEY} = process.env;

class UserController {
    // 注册
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
    // 登陆
    async login(ctx, next) {
        const {user_name} = ctx.request.body;
        // 1.获取用户信息 (token的payload中，记录ID user_name is_admin )
        console.log(user_name,'login 登陆 controller');
        try{
            //  password, ...resUser es6语法 剔除password 剩下的放在res里   从返回结果对象中剔除掉password属性，将剩下的属性放到一个新的对象。
            const {password,...res} = await getUserInfo({user_name});
            console.log(res,JWT_SECRET_KEY,'login 登陆 controller');
            ctx.body = {
                code:20000,
                message:'login ok',
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
    // 修改密码
    async changePassword (ctx, next) {
        // auth 校验token 是否登陆 是否有效
        // ctx.body = {msg:'修改密码成功'};
        // 1.获取数据
        const id = ctx.state.user.id;
        const password = ctx.request.body.password;
        // console.log(id,password,'修改密码')

        // 2.操作数据库
        if(await updateById({id,password})){

        // 3.返回结果
            ctx.body = {
                code:0,
                message:'修改密码成功',
                result:{}
            }
        }else{
            ctx.body = {
                code:"10007",
                message:'修改密码失败',
                result:{}
            }
        }
       
        // try {
            // 判断用户是否存在 根据id修改password
            // const result = await updateById(id,password);
        // }
    }

    async Info(ctx,next){
        // 获取用户信息
        const {token} = ctx.request.query;
        console.log(token,'token');
        ctx.body = {
            code:20000,
            message:'获取用户信息成功',
            result:{
                name:'admin',
                avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C._pY8JRGLX0lPFQVIeSaYJQHaHZ?w=220&h=219&c=7&r=0&o=5&dpr=2&pid=1.7'
            }
        }
    }

}

// 导出UserController
module.exports = new UserController();