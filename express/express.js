const http = require('http');
const url = require('url');
let routers = [
  {
    path: '*',
    method: 'all',
    handler(req, res) {
      console.log(`Cannot find ${req.path} ${req.url} my`);
    },
  },
];
function createApplication() {
  return {
    get(path, handler) {
      routers.push({
        path,
        method: 'get',
        handler,
      });
    },
    listen() {
      let server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url);
        console.log(pathname,'pathname');
        let m = req.method.toLowerCase();
        // 从第二个开始，如果匹配不到，默认匹配第一个
        for (let i = 1; i < routers.length; i++) {
          const { path, method, handler } = routers[i];
          if (path === pathname && method === m) {
            return handler(req, res);
          }
          routers[0].handler(req, res);
        }
      });
      server.listen(...arguments);
    },
  };
}

module.exports = createApplication;
