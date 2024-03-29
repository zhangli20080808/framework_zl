let fs = require('fs').promises;
const path = require('path');

function render(templateStr, data) {
  let start = `let str\r\n`;
  start += `with(data){\r\n`;
  start += 'str=`';
  templateStr = templateStr.replace(/<%=([\s\S]+?)%>/g, function () {
    return '${' + arguments[1] + '}';
  });
  let content = templateStr.replace(/<%([\s\S]+?)%>/g, function () {
    return '`\r\n' + arguments[1] + '\r\nstr+=`';
  });
  let tail = '`\r\n} \r\n return str';
  // 让字符串变成函数
  let htmlStr = start + content + tail;
  return new Function('data', htmlStr)(data);
}

const views = (dirname, { map }) => {
  return async (ctx, next) => {
    ctx.render = async (fileName, data) => {
      const str = await fs.readFile(
        path.join(dirname, fileName) + '.html',
        'utf8'
      );
      ctx.body = render(str, data);
    };
    await next();
  };
};

module.exports = views;
