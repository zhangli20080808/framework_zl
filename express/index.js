let express = require('./lib/express');
// let express = require('express');
let app = express();

app.get(
  '/a',
  function (req, res, next) {
    console.log(1);
    next();
  },
  function (req, res, next) {
    console.log(11);
    next();
  },
  function (req, res, next) {
    console.log(111);
    next();
  }
);
app.get('/a', function (req, res, next) {
  console.log(2);
  res.end('1');
});
app.listen(3003);
