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
    tokenError:{
        code:'10102',
        message:'token错误',
        result:''
    },
    tokenNotAuthorizationHeader:{
        code:'10103',
        message:'token未在请求头中',
        result:''
    },
    invalidToken:{
        code:'10102',
        message:'无效的token',
        result:''
    },
    hasNotAdminPermission:{
        code:'10103',
        message:'该用户没有管理员权限',
        result:''
    },
    fileUploadError:{
        code:'10201',
        message:'文件上传失败',
        result:''
    },
    unSupportedFileType:{
        code:'10202',
        message:'不支持的文件类型',
        result:''
    },
    goodsFormatError:{
        code:'10203',
        message:'商品格式错误',
        result:''
    },
    createGoodsError:{
        code:'10204',
        message:'创建商品失败',
        result:''
    },
    updateGoodsError:{
        code:'10205',
        message:'更新商品失败',
        result:''
    },
    invalidGoodsIDError:{
        code:'10206',
        message:'无效的商品ID',
        result:''
    },
    removeGoodsError:{
        code:'10207',
        message:'删除商品失败',
        result:''
    },
    restoreGoodsError:{
        code:'10208',
        message:'恢复商品失败',
        result:''
    },
    verifyParamsError:{
        code:'10209',
        message:'验证参数失败',
        result:''
    },
    cartFormatError:{
        code:'10301',
        message:'购物车数据格式错误',
        result:''
    }
}