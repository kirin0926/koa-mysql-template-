
class GoodsController{
    // 通用模块，文件上传，图片上传，头像，各种文件 word 表格
    async upload(ctx,next){
        //...upload logic
        ctx.body = {
            message:'Uploaded successfully'}
    }
}

module.exports = new GoodsController();