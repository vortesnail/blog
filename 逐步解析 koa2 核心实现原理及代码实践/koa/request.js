const request = {
  get url() {
    return this.req.url
  },
  set url(val) {
    this.req.url = val
  },
}

module.exports = request