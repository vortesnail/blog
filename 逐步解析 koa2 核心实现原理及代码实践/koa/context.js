const context = {
  onerror(err) {
    if (null == err) return
    this.app.emit('error', err, this)
  },
}

function defineGetter(target, key) {
  context.__defineGetter__(key, function() {
    return this[target][key]
  })
}

function defineSetter(target, key) {
  context.__defineSetter__(key, function(value) {
    return this[target][key] = value
  })
}

defineGetter('request', 'url')
defineSetter('request', 'url')

defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context