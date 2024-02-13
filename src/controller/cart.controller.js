const {cartFormatError} = require('../constant/err.type')
const {createOrUpdateCart,findAllCart,updateCart,removeCart} = require('../service/cart.service');

class CartController{
    // 将商品添加到购物车
    async add(ctx){
        // ctx上下文参数
        // 1.解析对应的数据     user_id goods_id
        const user_id = ctx.state.user.id; //用户id 用户登陆
        const goods_id = ctx.request.body.goods_id; //商品id post请求过来的
        // console.log(user_id,goods_id)
        // 2.建模操作数据库
        const res = await createOrUpdateCart(user_id,goods_id);
        // 3.返回响应结果
        ctx.body = {
            code: 200,
            message: '添加购物车成功',
            result: res
        }
    }

    async findAll(ctx){
        // 1.解析请求参数
        const {pageNum = 1,pageSize=10} = ctx.request.query;
        // 2.操作数据库
        const res = await findAllCart(pageNum,pageSize);
        // 3.返回结果
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }
    }

    async update(ctx){
        // 1.解析参数
        // const {id} = ctx.request.params.id;
        const {id,number,selected} = ctx.request.body;
        console.log(id,number,selected)
        if(number===undefined && selected === undefined){
            cartFormatError.message = 'number和selected不能同时为空';
            console.error('参数错误',cartFormatError)
            return ctx.app.emit('error',cartFormatError,ctx)
        }
        // 2.操作数据库
        const res = await updateCart({id,number,selected});
        // 3.返回结果
        ctx.body = {
            code:0,
            message:'更新购物车成功',
            result:res
        };
    }

    async remove(ctx){
        const {ids} = ctx.request.body;

        const res = await removeCart(ids);

        ctx.body = {
            code:0,
            message:'删除购物车成功',
            result:res
        }
        // (ctx)=>{
        //     console.log(ctx.request.body);
        //     ctx.body = ctx.request.body;
        // }
    }
}

module.exports = new CartController();