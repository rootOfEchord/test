const argv = require('yargs').alias('e', 'entry').argv

console.log('process.env', process.env.NODE_ENV)
console.log('argv', argv)


module.exports = {
	pages: {
		home: {
			// page 的入口
			entry: 'src/pages/home/main.js',
			// 模板来源
			template: 'src/pages/home/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
		}
	}
}