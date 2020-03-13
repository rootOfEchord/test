const { pages } = require('./entry')

module.exports = {
    publicPath: './',
    assetsDir: 'assets',
    pages: pages,
	devServer: {
		host: 'localhost',
        port: 39200, // 端口号
        // inline: false,
		open: true, //配置自动启动浏览器
    }
}