// 连接数据库，并创建模型
const mongoose = require('mongoose')

// 连接数据库，URL以mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名。（默认端口27017）
// 连接mongodb数据库的链接解析器会在未来移除，要使用新的解析器，通过配置{ useNewUrlParser:true }来连接 ；其他警告参考：https://mongoosejs.com/docs/deprecations.html
mongoose.connect('mongodb://127.0.0.1:27017/koa-mongoose', {useNewUrlParser:true,useCreateIndex: true})

/**
 * mongoose从@5.2.8后会弃用一些指令，为防止程序如下警告：
 * (node:24864) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * (node:24841) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
 * 可以如下设置
 */
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let db = mongoose.connection
mongoose.Promise = global.Promise // 防止Mongoose: mpromise 错误

db.on('error', function (err) {
  console.log('数据库连接出错', err)
})

db.on('open', function () {
  console.log('数据库连接成功')
})

db.on('disconnected', function () {
  console.log('数据库连接断开')
})

// 声明 Schema
// 创建数据表模型，即 User，就是数据表的名字
// 下面给 User 表声明三个字段 username password age
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
})

// 根据 schema 生成 model
const model = {
  User: mongoose.model('User', userSchema)
}

module.exports = model
