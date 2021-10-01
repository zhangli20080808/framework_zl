let request = {
  get url() {
    // 这里的this指代的是 ctx.request 因为使用的时候是通过 ctx.request.url 来使用的
    // ctx.request.req = req
    return this.req.url;
  },
};

module.exports = request;
