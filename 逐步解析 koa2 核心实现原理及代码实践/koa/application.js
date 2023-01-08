const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const EventEmitter = require('events')

class Application extends EventEmitter {
  constructor() {
    super()

    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)

    this.middlewares = []
  }

  use(fn) {
    this.middlewares.push(fn)
  }

  createContext(req, res) {
    const context = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    context.app = this
    context.req = req // 原生的
    context.request = request // 自己封装的
    context.request.req = req // 原生的

    context.res = res // 原生的
    context.response = response // 自己封装的
    context.response.res = res // 原生的

    return context
  }

  compose(ctx) {
    let index = -1

    const dispatch = (i) => {
      if (i <= index) {
        return Promise.reject('[Error] next() called multiples times')
      }

      index = i

      if (this.middlewares.length === i) {
        return Promise.resolve()
      }

      const fn = this.middlewares[i]
      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }

  handleRequestCallback() {    
    return (req, res) => {
      const ctx = this.createContext(req, res)
      res.statusCode = 404
      this.on('error', this.onerror)
      const onerror = err => ctx.onerror(err)

      this.compose(ctx)
        .then(() => {
          const content = ctx.body
          if (content) {
            res.end(content)
          } else {
            res.end('Not Found')
          }
        })
        .catch(onerror)
    }
  }

  onerror(err) {
    const msg = err.stack || err.toString();
    console.error('[Inner Error]', `\n${msg.replace(/^/gm, '  ')}\n`);
  }

  listen(...args) {
    const server = http.createServer(this.handleRequestCallback())
    server.listen(...args)
  }
}

module.exports = Application
