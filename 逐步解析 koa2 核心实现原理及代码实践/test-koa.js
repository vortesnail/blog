const Koa = require('koa')

const app = new Koa()

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('sleeping')
      resolve()
    }, time);
  })
}

app.use((ctx, next) => {
  console.log(1)
  ctx.body = '1'
  next()
  console.log(2)
  ctx.body = '2'
})

app.use(async (ctx, next) => {
  console.log(3)
  ctx.body = '3'
  await sleep(2000)
  next()
  console.log(4)
  ctx.body = '4'
})

app.use((ctx, next) => {
  console.log(5)
  ctx.body = '5'
  next()
  console.log(6)
  ctx.body = '6'
})

app.listen(7777, () => {
  console.log('server is running on http://localhost:7777')
})