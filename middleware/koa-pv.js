// 自定义中间件 koa-pv
function pv (ctx) {
    ctx.session.count ++
    global.console.log('当前路由', ctx.path) // 打印当前路由，node中全局不能用window，需要用global代替
}

module.exports = function () {
    return async function(ctx, next) {
        pv(ctx)
        await next() // 必须， 执行下一个中间件
    }
}