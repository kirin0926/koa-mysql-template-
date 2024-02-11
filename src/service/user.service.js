// #操作数据库
// 导入数据库模块
const User = require('../model/user.model');

// 主要是操作数据库 增删改查 async 数据库操作是异步的
class UserService {
        // 超过3个之后可以用对象来传递
    async createUser(user_name, password) {
        //todo 写入数据库 ,根据写入数据库的结果返回成功或者失败
        // 创建用户
        const res = await User.create({user_name, password});
        // 返回创建的用户信息
        return res.dataValues;
        // User.create({
        //     // 表的字段：需要传递的值
        //   user_name:user_name,
        //   password:password,
        // }) 
        // 可以简写 如果表的字段和传递的值是一样的话
        // await 和asyc 是什么意思 区别console.log('user.service.js');
        // await 等待的意思 是一个表达式 返回值是promise对象的值 promise有两个重要的属性 value 和state状态
    }

    async getUserInfo({id,user_name,password,is_admin}) {
        // 1.根据条件进行查询
        const whereOpt = {};
        // 2.拼接查询条件
        id&&Object.assign(whereOpt,{id})
        user_name&&Object.assign(whereOpt,{user_name})
        password&&Object.assign(whereOpt,{password})
        is_admin&&Object.assign(whereOpt,{is_admin})
        // is_admin||id_admin ===0
        // 3.查询
        const res = await User.findOne({
          attributes:['id','user_name','password','is_admin'],
          where:  whereOpt
        })
        // console.log(res,'getUserInfo 数据库查询')
        // 4.返回结果
        return res ? res.dataValues : null
    }

    async updateById({id,user_name,password,is_admin}){
        // 1.根据哪个id去修改对应的密码，用户名
        // console.log(id,user_name,password,is_admin,'updateById 数据库修改')
            //id必须
        const whereOpt = {id};
            //对象 修改后的数据
        const newUser = {};

        // 2.判断哪些值传递了过来，就修改哪些值
        // 如果user_name存在，则通过Object.assign复制到newUser里
        user_name&&Object.assign(newUser,{user_name});
        // 如果password存在，则通过Object.assign复制到newUser里
        password&&Object.assign(newUser,{password});
        // 如果is_admin存在，则通过Object.assign复制到newUser里
        is_admin&&Object.assign(newUser,{is_admin});

        // console.log(newUser,'newUser')

        // Sequelize 的方法User.update 
        const res = await User.update(newUser,{where:whereOpt})
        // console.log(res,'updateById')

        // res[0] 得到数组中的第一个内容， 如果大于0则返回true 否则返回false
        // return res[0] > 0 ? true : false;

        // 根据res数组的第一个元素的值，选择"[false, true]"数组中的相应元素。
        // 如果res[0]的值为0，那么表达式将返回false；如果res[0]的值为1，那么表达式将返回true。

        return [false,true][res[0]]
    }
}

module.exports = new UserService();