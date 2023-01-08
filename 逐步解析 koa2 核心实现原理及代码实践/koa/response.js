const response = {
  _body: undefined,
  get body() {
    return this._body
  },
  set body(val) {
    this._body = val
    this.res.statusCode = 200
  }
}

module.exports = response