const Koa = require('./koa')

const app = new Koa()

app.use((ctx) => {
  ctx.response.res.writeHead(200, { 'Content-Type': 'text/html' })
  str += '<h1>Hello World</h1>' // 变量未声明，应该报错
  ctx.body = str
});

app.on('error', (err, ctx) => {
  console.error('[Outer Error]', err)
});

app.listen(8888, () => {
  console.log('server is running on http://localhost:8888')
})