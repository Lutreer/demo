const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 一、引入session和redis中间件
const session = require('koa-generic-session')
const Redis = require('koa-redis')

const pv = require('./middleware/koa-pv')

// 一、引入mongoose
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')


const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// 二、连接redis
app.keys = ['keys', 'keyskeys'] // 给 session 用作加密处理
app.use(session({
  key: 'mt',
  prefix: 'mtpr',
  store: new Redis() // 存储到store
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(pv())
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// 二、 连接数据库的服务
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
