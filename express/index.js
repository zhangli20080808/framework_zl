/**
 * curl -v -X POST http://localhost:3002
 */
let express = require('./lib/express');
// let express = require('express');
let app = express();

// app.get(
//   '/a',
//   function (req, res, next) {
//     console.log(1);
//     next();
//   },
//   function (req, res, next) {
//     console.log(11);
//     next();
//   },
//   function (req, res, next) {
//     console.log(111);
//     next();
//   }
// );
// app.get('/a', function (req, res, next) {
//   console.log(2);
//   res.end('1');
// });
app.get('/',function (req,res) {
  res.end('get /')
})
app.post('/', function (req, res) {
  res.end('post /')
});
app.listen(3003);
