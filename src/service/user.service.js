
// 主要是操作数据库 增删改查 async 数据库操作是异步的
class UserService {
        // 超过3个之后可以用对象来传递
    async createUser(user_name, password) {
        //to do写入数据库 ,根据写入数据库的结果返回成功或者失败

        return '数据库写入success';
    }
}

module.exports = new UserService();