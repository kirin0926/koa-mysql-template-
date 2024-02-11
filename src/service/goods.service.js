
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
        console.log(res);
        // return res>0?true:false;
        return [false,true][res];
    }

    // 上架商品表
    async restoreGoods(id){
        const res = await Goods.restore({where:{id}});
        return [false,true][res];
    }

    // 获取商品列表
    async findAllGoods(pageNum,pageSize){
        // seq语句
        // 1.获取总数
        // const count = await Goods.count();
        // // 2.获取分页的具体数据
        // const rows = await Goods.findAll({
        //     offset:(pageNum-1)*pageSize,
        //     // limit限制
        //     limit:pageSize*1,
        // });
        const {count,rows} = await Goods.findAndCountAll({
            offset:(pageNum-1)*pageSize,
            limit:pageSize*1
        })
        // 3.返回结果
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows
        }
    }
}

module.exports=new GoodsService();