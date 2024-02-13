const Op = require('sequelize').Op;
const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');

class CartService {
    async createOrUpdateCart (user_id,goods_id) {
        // 1.根据user_id和goods_id同时去查找，看看是否存在这个数据
        const res = await Cart.findOne({
        where:{
            [Op.and]: [
                // 这里的条件是同时满足的
                { user_id: user_id }, // 第一个条件：user_id为1
                { goods_id: goods_id }, // 第二个条件：goods_id为2
              ],
            }
        });
        // 2.如果存在，则更新数据，如果不存在，则创建数据
        if(res){
            // 已经存在记录的时候 将number+1
            await res.increment('number');
            return await res.reload();
        }else{
            // 3.不存在记录的时候 也要创建一条数据，并且将数据返回
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }

    async findAllCart(pageNum,pageSize){
        const {count,rows} = await Cart.findAndCountAll({
            // 具体查找哪些字段 只获取这些字段
            attributes:['id','number','selected'],
            offset: (pageNum-1)*pageSize,
            limit: pageSize*1,
            // 除了查这张表以外还要查Goods相关的信息
            include:[{
                model:Goods,//关联的模型对象
                as:'goods_info',//别名
                attributes:['id','goods_name','goods_price','goods_img']
            }]
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list:rows
        }
    }

    async updateCart(params){
        // 1.赋值解构
        const {id,number,selected} = params;
        // 数据库查询 返回值
        const res = await Cart.findByPk(id)
        // 如果没有找到对应的id 返回一个空字符串
        if(!res) return ''
        // 如果numbar不等于空 有值存在的时候，用新的number覆盖掉之前的值，如果是空 则什么都不做
        number !==undefined ? (res.number = number) : '';
        // 如果是选中状态 则将selected的值设置为1 否则设置为0
        selected !==undefined ? (res.selected = selected) : (res.selected = 0);
        // 保存修改后的值
        return await res.save();
    }
    async removeCart(ids){
        return await Cart.destroy({
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        })
    }
}

module.exports = new CartService();