//可以通过文件后缀名区分配置

const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

// console.log(process.env.APP_PORT);
// process 代表执行的进程
// env代表环境变量 

// 在Node.js中，process是一个全局对象，用于与当前Node.js进程进行交互。它提供了许多有用的方法和属性，用于管理进程的行为和状态。
// process对象具有许多功能，包括：
// process.argv：包含命令行参数的数组。
// process.env：包含当前环境变量的对象。
// process.cwd()：返回当前工作目录的路径。
// process.exit(code)：终止当前进程并返回给定的退出码。
// process.pid：返回当前进程的PID（进程ID）。
// process.stdout和process.stderr：标准输出和标准错误输出流。
// process.on(event, callback)：用于监听各种事件，如exit、uncaughtException等。
// 通过使用process对象，你可以访问和控制当前Node.js进程的各个方面，从而实现更灵活和高效的应用程序开发。


// module.exports = {
//     port: process.env.APP_PORT,
// }
// console.log(process.env)
module.exports = process.env