var fs = require('fs');
var fse = require('fs-extra')
var path = require('path');
var exec = require('child_process').exec;



let distDir = path.join(__dirname, 'dist')
let serverDir = path.relative(__dirname, `e:/server/jj`)

// 复制文件
var copy = function (src, dst) {
  let paths = fs.readdirSync(src); //同步读取当前cd目录
  paths.forEach(function (path) {
    var _src = src + '/' + path;
    var _dst = dst + '/' + path;
    fs.stat(_src, function (err, stats) { //stats  该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) { //如果是个文件则拷贝 
        let _dst = dst + '/' + path;
        let readable = fs.createReadStream(_src); //创建读取流
        let writable = fs.createWriteStream(_dst); //创建写入流
        readable.pipe(writable);
      } else if (stats.isDirectory()) { //是目录则 递归 
        checkDirectory(_src, _dst, copy);
      }
    });
  });
}
// 检查文件夹是否存在，新建文件夹并copy
var checkDirectory = function (src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

// 删除旧文件
var cleanOld = function (dest) {
  let dest_static = path.join(dest, 'static');
  let dest_index = path.join(dest, 'index.html');
  fs.exists(dest_static, function (exists) {
    if (exists) fse.removeSync(dest_static);
  });
  fs.exists(dest_index, function (exists) {
    if (exists) fse.removeSync(dest_index);
  });
}


// copy之前先清空旧文件
cleanOld(serverDir)

// 复制
checkDirectory(distDir, serverDir, copy)

let h = new Date().getHours()
let m = new Date().getMinutes()
h = h < 10? '0'+h : h
m = m < 10? '0'+m : m
let time = `${new Date().toLocaleDateString()} ${h}:${m}`

// git push
var cmds = [
  'git add *',
  `git commit -m "提交${time}"`,
  'git push'
]


cmds.forEach((cmd, i) => {
  setTimeout(() => {
    exec(cmd, {
      cwd: serverDir
    }, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
    })
  }, i * 1000)
})


console.log('new Date().get', new Date().toLocaleDateString())