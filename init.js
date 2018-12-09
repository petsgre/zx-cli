
var fs = require('fs');
var path = require('path');

var config = {};
process.argv.slice(2).forEach(function (item) {
    switch (item) {
        case "-j":
            config.jquery = true;
            break;
        case "-s":
            config.swiper = true;
            break;
        case "-v":
            config.vue = true;
            break;
        case "-b":
            config.bootstrap = true;
            break;
    }
});

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
    fs.readdir(srcDir, function (err, files) {
        var count = 0
        var checkEnd = function () {
            ++count == files && files.length && cb && cb()
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
                    console.log('mkdir', tarPath)
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

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
    cb && cb()
}
exports.init = function () {
    var PATH = ".";
    // if (process.argv.length == 2) {
    //     copyTemplate("index_simple.html", PATH + '/index.html');
    // } else {
    //     copyTemplate("index.html", PATH + '/index.html');
    // }

    // copyTemplate("package.json", PATH + '/package.json');
    var from = path.join(__dirname, 'templates');
    console.log("开始复制项目模版！请耐心等待！");

    copyFolder(from, './', function (err) {
        if (err) {
            return
        } else {
            console.log("项目模版创建成功！");
            console.log("执行 npm install 下载所有依赖");
            console.log("执行 npm run dev 启动node服务器");
        }
        //continue
    })

}