const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

const { tokenExpiredError,invalidToken } = require('../constant/err.type');

const auth = async(ctx,next) =>{
    // 获取请求头中的token
    const {authorization} = ctx.request.headers;
    // 从请求的头部拿到token
    const token = authorization.replace('Bearer ','');
    // console.log(token);
    try {
        // user中包含了payload的信息（id，user_name，is_admin）
        const user = jwt.verify(token, JWT_SECRET_KEY);
        // console.log(ctx.state);
        ctx.state.user = user;
        console.log(ctx.state);
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token已过期');
                return ctx.app.emit('error',tokenExpiredError,ctx);
            case 'JsonWebTokenError':
                console.error('无效的token');
                return ctx.app.emit('error',invalidToken,ctx);
        }
    }
    await next();
}

module.exports = {auth};