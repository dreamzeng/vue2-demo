module.exports = {
    buildTest: { // 部署到测试服务器上
        remotePath: '/usr/local/nginx/html/yw/pc/vuedemo/', //部署到服务器的路径
        host: 'xxx',
        user: 'root',
        pass: 'xxx',
        port: 22368 //端口
    },
    buildPro: { // 部署正式服务器上
        remotePath: '/usr/local/nginx/html/yw/pc/vuedemo/', //部署到服务器的路径
        host: 'xxx',
        user: 'root',
        pass: 'xxx',
        port: 22368
    },
    publicPath: '/dist/', // leo: 在项目生成的路径
    target: 'https://cnodejs.org/' //连接的服务器地址
}