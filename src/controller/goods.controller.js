const path = require('path');

const { fileUploadError,unSupportedFileType,createGoodsError,updateGoodsError,invalidGoodsIDError }=require('../constant/err.type');

// const ApiError = require('../middleware/error');

const { createGoods,updateGoods } = require('../service/goods.service');
const { error } = require('console');

class GoodsController{

    // 通用模块，文件上传，图片上传，头像，各种文件 word 表格
    async upload(ctx,next){
        //...upload logic
        // console.log(ctx.request.files);
        const file = ctx.request.files['file'];
        // 检查文件的类型
        const fileTypes = ['image/jpeg','image/png']
        // 获取文件上传成功后的路径
        if(file){

            if(!fileTypes.includes(file.mimetype)){
                return ctx.app.emit('error',unSupportedFileType,ctx);
            }
            // fileTypes.includes(file.mimetype) ? '' : ctx.app.emit('error',unSupportedFileType,ctx)
            ctx.body = {
                code:0,
                message:'Uploaded successfully',
                // 文件返回成功，要让前端能够显示这个图片
                result:{
                    goods_img:path.basename(file.filepath),
                }
            }
            // 文件上传成功后，将文件名保存到数据库中
            // 数据库中保存的文件名是相对路径，不能直接使用file.filepath
            // 需要使用path.basename(file.filepath) 
            // 文件名是相对路径，不能直接使用file.filepath
            // 新版需要用 file.type- --> file.mimetype ,   file.path  --> file.filepath
            // path.basename(file.filepath)
            // goods_img:path.basename(file.path)

            // 我用ajax配置成功了，遇到的坑 1.会存在跨域问题下载一个插件 npm i --save koa2-cors 在app的index文件引入koa2-cros,然后app.use(cors())
        }else{
            console.error('上传文件失败',fileUploadError);
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    // 发布商品接口
    async createGoods(ctx,next){
        try {
            const {createdAt,updatedAt,...res} = await createGoods(ctx.request.body);
            // 返回客户端
            ctx.body={
                code:0,
                message:'Create successfully',
                result:res
            }
        } catch (error) {
            console.error('创建商品失败',error);
            return ctx.app.emit('error',createGoodsError,ctx)
        }
    }

    // 修改商品接口
    async updateGoods(ctx,next){
        // 具体修改的是哪一件商品
        // put 方法
        try {
            // ctx.params.id 连接携带的id   
            const res = await updateGoods(ctx.params.id,ctx.request.body);
            if(res){
                ctx.body={
                    code:0,
                    message:'Update successfully',
                    result:res
                }
            }else{
                console.error('无效的商品id',res)
                return ctx.app.emit('error',invalidGoodsIDError,ctx)
            }
        } catch (error) {
            console.error('修改商品失败',error);
            return ctx.app.emit('error',updateGoodsError,ctx)
        }

    }
}

module.exports = new GoodsController();