const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config/');
const IS_ENV = process.env.NODE_ENV == 'production';

var plugins = [
    new webpack.BannerPlugin('Build by Leo.--' + new Date()),
    new HtmlWebpackPlugin({
        // filename: './index.html', //生成的html存放路径，相对于 output.path
        filename: path.resolve(__dirname + config.publicPath + 'index.html'), // 生成的html存放路径
        template: './src/template/index.html', // html模板路径
        inject: true,
        minify: {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true // 删除空白符与换行符
        }
    })
];

// 生产环境 增加压缩代码功能
if (IS_ENV) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': { // 设置成生产环境
            NODE_ENV: '"production"'
        }
    }));

    // 压缩代码
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

module.exports = {
    entry: ['./src/main.js'], // 编译入口文件
    output: {
        path: path.resolve(__dirname + config.publicPath + 'assets/'), // 各种资源输出目录
        publicPath: 'assets/', // html中嵌入的script的src的路径（测试&生产环境是这样配置）
        filename: '[name].js?[hash]' // 编译后的文件名
    },
    module: {
        loaders: [{
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css/,
            exclude: /^node_modules$/,
            loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!`
        }, {
            test: /\.less/,
            exclude: /^node_modules$/,
            loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!less-loader`
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=2000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]'
        }]
    },
    plugins,
    resolve: {
        extensions: ['', '.js', '.vue', '.jsx'], //后缀名自动补全
        alias: {
            vue: 'vue/dist/vue.js', //webpack打包时，需要设置别名
            store: path.resolve('src/store/'), //常用工具方法
        }
    },
    vue: {
        postcss: [
            require('autoprefixer')({
                browsers: ['last 100 versions']
            })
        ]
    }
}
