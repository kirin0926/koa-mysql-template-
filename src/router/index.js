const fs = require('fs');

const Router = require('koa-router');
const router = new Router();

// __dirname当前目录
fs.readdirSync(__dirname).forEach(file => {
    console.log(file);
    // 如果file 不等于当前文件
    if(file !== 'index.js'){
        let r = require('./'+file);
        // console.log(r)
        // let r = require(`./${file}`)(router);
        router.use(r.routes());
    }
})

module.exports = router;