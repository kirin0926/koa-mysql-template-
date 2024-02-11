
const Goods = require('../model/goods.model');

class GoodsService{

    // 创建商品数据库表
    async createGoods(goods){
        // 创建商品
        const res = await Goods.create(goods);
        return res.dataValues;
    }

    // 更新数据库 商品表
    async updateGoods(id,goods){
        const res = await Goods.update(goods,{where:{id}});
        return [false,true][res[0]];
    }

    // 删除数据库 商品表
    async removeGoods(id){
        const res = await Goods.destroy({where:{id}});
        return [false,true][res];
    }

}

module.exports=new GoodsService();