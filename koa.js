const Koa = require('koa'); // Koa 为一个class
const Router = require('koa-router') // koa 路由中间件
const bodyParser = require('koa-bodyparser'); // 处理post请求，把 koa2 上下文的表单数据解析到 ctx.request.body 中
const app = new Koa();
const router = new Router(); // 实例化路由

app.use(bodyParser())

// 表单
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h5>表单</h5>
      <form action="/login" method="post">
          <p>Name: <input name="name" value="koa2"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
});

router.post('/login', async (ctx, next) => {
  let name = ctx.request.body.name;
  let password = ctx.request.body.password;

  console.log(name, password);

  ctx.response.body = `<h4>Hello, ${name}!</h4>`;
});

app.use(router.routes());

app.listen(3333, () => {
  console.log('This server is running at http://localhost:' + 3333)
})