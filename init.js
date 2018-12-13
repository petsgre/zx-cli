
var fs = require('fs');
var path = require('path');

var copyFile = function (srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
}
var copyFolder = function (srcDir, tarDir, cb) {
    fs.exists(srcDir, function (exists) {
        if (!exists) {
            cb && cb("目录不存在")
            return
        }
    })
    fs.readdir(srcDir, function (err, files) {
        var count = 0
        var checkEnd = function () {
            ++count == files && files.length && cb && cb(err)
        }

        if (err) {
            checkEnd()
            return
        }

        files.forEach(function (file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {
                    // console.log('mkdir', tarPath)
                    fs.mkdir(tarPath, function (err) {
                        if (err) {
                            console.log('复制模版出错！请查看以下出错信息！');
                            console.log('-----------');
                            console.log(err);
                            console.log('-----------');
                            return
                        }

                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        files.length === 0 && cb && cb()
    })
    cb && cb(true)
}
var msg = function () {
    console.log("项目模版创建成功！");
    console.log("");
    console.log("执行 npm install 下载所有依赖");
    console.log("执行 npm run dev 启动node服务器");
}
exports.init = function (boolean) {
    var js = path.join(__dirname, 'templates_js');
    var ts = path.join(__dirname, 'templates_ts');
    console.log("开始复制项目模版！请耐心等待！");
    console.log("");
    if (boolean) {
        copyFolder(ts, './', function (res) {
            if (res == true) {
                msg()
            } else {
                console.log("创建项目失败，请联系作者！");
            }
        })

    } else {
        copyFolder(js, './', function (res) {
            if (res == true) {
                msg()
            } else {
                console.log("创建项目失败，请联系作者！");
            }
        })

    }

}