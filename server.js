/**
 * Created by Epica on 2016/12/29.
 */
var environment = process.env.NODE_ENV
var webpack = require('webpack')
var bodyParser = require('body-parser')
var path = require('path')
var port = 3000
var app = new (require('express'))()
var router = require('./routes/index')

var config

if(environment === 'production') {
    config = require('./webpack.config')
} else if (environment === 'development') {
    config = require('./webpack.config.dev')
} else {
    console.log('Please define NODE_ENV first\nlinux & mac: export NODE_ENV=production(or development)\nwindows: set NODE_ENV=production(or development\n)')
}

var compiler = webpack(config)

if(environment === 'development') {
    var webpackHotMiddleware = require('webpack-hot-middleware')
    app.use(webpackHotMiddleware(compiler))
}
var webpackDevMiddleware = require('webpack-dev-middleware')
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))

// body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post("/api/login", router.login)
app.post("/api/check", router.check)
app.post("/api/titles", router.titles)
app.post("/api/tags", router.tags)
app.post("/api/upload", router.upload)
app.post("/api/single", router.single)
app.post("/api/edit", router.edit)
app.post("/api/remove", router.remove)
app.post("/api/comment", router.addComment)

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})


/*
* http://chenzhou123520.iteye.com/blog/1582174
* 数据库mongodb的操作：
* 安装 配置服务端 浏览器访问 客户端连接数据库
* Windows
 安装
 第一步：下载安装包
 下载版本：2.0.2-rc2
 下载链接：http://downloads.mongodb.org/win32/mongodb-win32-i386-2.0.2-rc2.zip
 我们把Mongodb安装在D:\Mongodb、Mongodb的数据库安装在D:\Mongodb\data
 第二步：在D盘下新建目录“D:\Mongodb”，把下载到的安装包解压缩，然后把bin目录copy到D:\Mongodb下
 第三步：在“D:\Mongodb”目录下新建“data”文件夹，它将会成为数据存放的根目录。
 配置服务端
 第一步：开启命令行窗口（开始--->运行--->cmd）
 第二步：按如下格式输入命令
 Dos代码  收藏代码
 C:\Documents and Settings\chenzhou>D:
 D:\>cd D:\Mongodb\bin
 D:\Mongodb\bin>mongod --dbpath D:\Mongodb\data
 配置成功后会显示如下界面：
 Dos代码  收藏代码
 Mon Dec 12 19:32:49
 Mon Dec 12 19:32:49 warning: 32-bit servers don't have journaling enabled by default. Please use --journal if you want
 urability.
 Mon Dec 12 19:32:49
 Mon Dec 12 19:32:49 [initandlisten] MongoDB starting : pid=4220 port=27017 dbpath=D:\Mongodb\data 32-bit host=CY3379
 Mon Dec 12 19:32:49 [initandlisten]
 Mon Dec 12 19:32:49 [initandlisten] ** NOTE: when using MongoDB 32 bit, you are limited to about 2 gigabytes of data
 Mon Dec 12 19:32:49 [initandlisten] **       see http://blog.mongodb.org/post/137788967/32-bit-limitations
 Mon Dec 12 19:32:49 [initandlisten] **       with --journal, the limit is lower
 Mon Dec 12 19:32:49 [initandlisten]
 Mon Dec 12 19:32:49 [initandlisten] db version v2.0.2-rc2, pdfile version 4.5
 Mon Dec 12 19:32:49 [initandlisten] git version: 7d32bec61fd25e2d1e728e24d0d127a8a73e38e0
 Mon Dec 12 19:32:49 [initandlisten] build info: windows (5, 1, 2600, 2, 'Service Pack 3') BOOST_LIB_VERSION=1_42
 Mon Dec 12 19:32:49 [initandlisten] options: { dbpath: "D:\Mongodb\data" }
 Mon Dec 12 19:32:49 [initandlisten] waiting for connections on port 27017
 Mon Dec 12 19:32:49 [websvr] admin web console waiting for connections on port 28017
 Mon Dec 12 19:33:49 [clientcursormon] mem (MB) res:14 virt:43 mapped:0
 注：我们上面在配置mongodb服务时并没有指定服务的端口号，所以会指定mongodb默认的端口号27017
 我们也可以在配置时指定端口。例：如果我们想指定mongodb的服务端口号为10001，命令如下：
 Dos代码  收藏代码
 mongod --dbpath D:\Mongodb\data --port 10001
 访问
 浏览器访问
 在浏览器输入： http://localhost:27017 可以看到如下提示：
 You are trying to access MongoDB on the native driver port. For http diagnostic access, add 1000 to the port number
 如此，Mongodb数据库服务已经完全启动了。
 然后我们根据提示把端口加上1000访问： http://localhost:28017/
 就能够访问到Mongodb的服务端web页面

 客户端连接数据库
 另开一个cmd窗口，原来的那个窗口不要关闭，如果窗口关闭则服务也关闭
 首先通过cd命令切换到Mongodb\bin目录下，然后通过mongo ip:port 命令来连接数据库
 ip代表我们需要访问的数据库服务的ip，port代表数据库服务的端口
 Dos代码  收藏代码
 C:\Documents and Settings\chenzhou>D:
 D:\>cd Mongodb\bin
 D:\Mongodb\bin>mongo 127.0.0.1:27017
 MongoDB shell version: 2.0.2-rc2
 connecting to: 127.0.0.1:27017/test
 >
 代表访问成功，连接到test库
 如上例子中127.0.0.1代表本机，27017是Mongodb服务端默认端口
 如果我们在配置mongodb服务时使用的是默认的端口，那么我们在通过客户端访问时可以不用指定访问的ip和port
 Dos代码  收藏代码
 C:\Documents and Settings\chenzhou>D:
 D:\>cd Mongodb\bin
 D:\Mongodb\bin>mongo
 MongoDB shell version: 2.0.2-rc2
 connecting to: test
 >
 同样地，访问成功，连接到test库*/


/*
* 12.30 学习express 发现一些固有的文件夹如models下的文件，以及server、settings的写法都是差不多的，整完这个8080转3000的localhost访问后，可以学下：
* http://www.cnblogs.com/mq0036/p/5243312.html
* http://www.expressjs.com.cn/guide/routing.html
* 解决第一个问题：3000的访问无法访问，命令改为node app.js 而不是webpack的npm start了。
* */


/*
* 1.9
* 错误的原因，找了些，手机书签加了一些，看着像是原因，可localhost:8080也不行，说明代码出错了吧，否则，为何不能用呢。
* 这个问题还是得解决。
*
* 考虑下接下一步是练习什么。可因为提交不了，就无法练习实践注册、登录的功能，以及登录后字的变化等细节变化。*/