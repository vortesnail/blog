const Koa = require('./koa')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(1)
  ctx.response.res.writeHead(200, { 'Content-Type': 'text/html' })
  await next()
  ctx.body = '<h1>Hello World</h1>'
})

app.use(async (ctx, next) => {
  console.log(2)
  await next()
})

app.use(async (ctx, next) => {
  console.log(3)
  await next()
})

app.listen(8888, () => {
  console.log('server is running on http://localhost:8888')
})