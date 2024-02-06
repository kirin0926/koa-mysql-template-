const { createUser } = require('../service/user.service');  //服务器创建用户

const {userRegisterError} = require('../constant/err.type');    //导入错误类型

class UserController {
    
    async register(ctx, next) {

        // 1.获取数据
        // console.log(ctx.request);
        const {user_name,password} = ctx.request.body;
 
        // 2.操作数据库
        try{
            const res = await createUser(user_name,password);
            console.log(res)

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
        ctx.body = {msg:"login ok"};
    }
}

module.exports = new UserController();