// 1.导入koa-router
const Router = require('koa-router');

const axios = require('axios');
// 中间件

// 控制器
const {getList} = require('../controller/store.controller');

// 2.实例化router对象
const router = new Router({prefix: '/store'});

// 3.编写路由规则
// 3.1获取店铺列表
router.get('/list',getList);

// 3.2微信小程序后端
router.get('/get', async (ctx, next) => {

    const appid = 'wx95f6d7fda4bb2bad';
    const appsecret = '8f78860fcf1171e264ff35867d2012e9';
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
  
    try {
      const response = await axios.get(url);
      const accessToken = response.data.access_token;
      ctx.body = {
        code:'20000',
        message:'获取成功',
        result:accessToken
      };
    } catch (error) {
      console.error('Error getting access token:', error);
      ctx.status = 500;
      ctx.body = 'Error getting access token';
    }

})

// 4.导出
module.exports = router;