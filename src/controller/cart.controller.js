const {createOrUpdateCart} = require('../service/cart.service');

class CartController{
    // 将商品添加到购物车
    async add(ctx, next){
        // ctx上下文参数
        // 1.解析对应的数据     user_id goods_id
        const user_id = ctx.state.user.id; //用户id 用户登陆
        const goods_id = ctx.request.body.goods_id; //商品id post请求过来的
        // console.log(user_id,goods_id)
        // 2.建模操作数据库
        const res = await createOrUpdateCart(user_id,goods_id);
        // 3.返回响应结果
        console.log(ctx.request.body);
        ctx.body = {
            code: 200,
            message: '添加购物车成功',
            result: res
        }
    }
}

module.exports = new CartController();