const { createUser,getUserInfo } = require('../service/user.service');

class UserController {
    
    async register(ctx, next) {
        // 1.获取数据
        // console.log(ctx.request);
        const {user_name,password} = ctx.request.body

            //合法性 格式最起码得对的
            if (!user_name || !password) {
                console.error('用户名或密码为空',ctx.request.body)
                ctx.status = 400;
                ctx.body = {
                    code: '10001',
                    message: '用户名或密码为空',
                    result: ''
                }
                return
            }
            //合理性
            if(await getUserInfo(user_name)){
                ctx.status = 409;
                ctx.body = {
                    code: '10002',
                    message: '用户已经存在',
                    result: ''
                }
                return
            }
        // 2.操作数据库
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
    }

    async login(ctx, next) {
        ctx.body = {msg:"login ok"};
    }
}

module.exports = new UserController();