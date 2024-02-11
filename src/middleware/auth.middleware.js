const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

const { tokenExpiredError,invalidToken,hasNotAdminPermission,tokenNotAuthorizationHeader } = require('../constant/err.type');

// 判断是否登陆
const auth = async(ctx,next) =>{
    // 获取请求头中的token
    const {authorization =''} = ctx.request.headers;
    // 从请求的头部拿到token

    // console.log(authorization);
    // 如果没有附带header的token的时候
    if(!authorization){
        console.error('authorization header is not provided');
        return ctx.app.emit('error',tokenNotAuthorizationHeader,ctx)
    }
    const token = authorization.replace('Bearer ','');
    // console.log(token);
    try {
        // user中包含了payload的信息（id，user_name，is_admin）
        const user = jwt.verify(token, JWT_SECRET_KEY);
        // console.log(ctx.state);
        ctx.state.user = user;
        // console.log(ctx.state);
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

// 判断是否有admin权限
const hasAdminPermission = async(ctx,next) =>{
    const {is_admin} = ctx.state.user;
    // 判断用户是否为管理员
    if(!is_admin){
        console.error('权限不足 该用户没有管理员权限',ctx.state.user);
        return ctx.app.emit('error',hasNotAdminPermission,ctx);
    }
    // 有权限就放行
    await next();
}

module.exports = {auth,hasAdminPermission};