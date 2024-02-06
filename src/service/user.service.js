// 
const User = require('../model/user.model');
// 主要是操作数据库 增删改查 async 数据库操作是异步的
class UserService {
        // 超过3个之后可以用对象来传递
    async createUser(user_name, password) {
        //todo 写入数据库 ,根据写入数据库的结果返回成功或者失败
        // User.create({
        //     // 表的字段：需要传递的值
        //   user_name:user_name,
        //   password:password,
        // }) 
        // 可以简写 如果表的字段和传递的值是一样的话

        // await 和asyc 是什么意思 区别

        // await 等待的意思 是一个表达式 返回值是promise对象的值 promise有两个重要的属性 value 和state状态
        const res = await User.create({user_name, password})
        // console.log(res);
        return res.dataValues;
    }

    async getUserInfo({id,user_name,password,is_admin}) {
        const whereOpt = {}

        id&&Object.assign(whereOpt,{id})
        user_name&&Object.assign(whereOpt,{user_name})
        password&&Object.assign(whereOpt,{password})
        is_admin&&Object.assign(whereOpt,{is_admin})
        // is_admin||id_admin ===0

        const res = await User.findOne({
          attributes:['id','user_name','password','is_admin'],
          where:  whereOpt
        })

        return res ? res.dataValues : null
    }
}

module.exports = new UserService();