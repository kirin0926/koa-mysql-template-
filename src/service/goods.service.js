
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
        const res = await Goods.update(goods,{where:{goods_id:id}});
        return [false,true][res[0]];
    }


    async getGoodsList(ctx,next){
        const {pageNum,pageSize}=ctx.request.query;
    }
    async getGoodsById(ctx,next){
        
    }
    async deleteGoodsById(ctx,next){
        
    }
    async uploadGoodsImg(ctx,next){
        
    }
    async createGoodsImg(ctx,next){
        
    }
    async deleteGoodsImg(ctx,next){
        
    }
    async updateGoodsImg(ctx,next){
        
    }
    async getGoodsImgList(ctx,next){
        
    }
}

module.exports=new GoodsService();