const Koa = require('koa')
const app =  new Koa();

const Router = require('koa-router') // koa路由中间件

const router = new Router({
  prefix: '/api'
}) // 父路由, 给路由统一加个前缀 /api

const bodyParser = require('koa-bodyparser') // 处理post请求，把 koa2 上下文的表单数据解析到 ctx.request.body 中
app.use(bodyParser())

// 引入数据库操作方法
const UserController = require('./server/controller/users.js')

// 路由,访问：http://localhost:3333/api/save
router.get('/save', UserController.saveUser)
router.get('/create', UserController.createUser)
router.get('/find', UserController.findUser)
router.get('/findall', UserController.findAllUser)
router.get('/update', UserController.updateUser)
router.get('/remove', UserController.removeUser)


// 加载路由中间件
app.use(router.routes())
// allowedMethods 处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头
app.use(router.allowedMethods())

app.listen(3333, () => {
  console.log('This server is running at http://localhost:' + 3333)
})