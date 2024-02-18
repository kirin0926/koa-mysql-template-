
class StoreController {
    // 获取信息
    async getList(ctx,next){
        ctx.body = {
            code: 20000,
            message: '店铺列表',
            result: {
              avatar:'https://svod-prod-1313529447.cos.ap-beijing.myqcloud.com/prod/IMG/0/80827c20-146a-4343-bd54-f1d2147088d0.jpeg',
              realName:'摩的',
              teacherName:'摩的',
              alipayAcount:'1635271@qq.com',
              telePhone:'17611668055',
              rate:0.9,
              userId:'1000000',
              storeEndTime:'2024-01-01 00:00:00'
            }
        };
    }
}

module.exports = new StoreController();