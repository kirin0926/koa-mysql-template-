//constant 常量文件夹
//err.type.js 出错的类型

module.exports = {
    userformateError:{
        code:'10001',
        message:'用户名或密码为空',
        result:''
    },
    userAlreadyExited:{
        code:'10002',
        message:'用户名已存在',
        result:''
    },
    userRegisterError:{
        code:'10003',
        message:'用户注册失败',
        result:''
    },
    userDoesNotExited:{
        code:'10004',
        message:'用户名不存在',
        result:''
    },
    userLoginError:{
        code:'10005',
        message:'用户名登陆失败',
        result:''
    },
    invalidUserPasswordError:{
        code:'10006',
        message:'用户密码错误',
        result:''
    },
    tokenExpiredError:{
        code:'10101',
        message:'token过期',
        result:''
    },
    invalidToken:{
        code:'10102',
        message:'无效的token',
        result:''
    }
}