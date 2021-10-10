const Application = require('../lib/application');

// 1. 将创建应用的过程，和应用进行一个分离
function createApplication() {
  return new Application();
}

module.exports = createApplication;
