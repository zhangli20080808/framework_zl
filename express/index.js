let express = require('./express');
let app = express();

app.get('/', function (req, res, next) {
  res.end('home');
});
app.get('/hello', function (req, res, next) {
  res.end('hello');
});
app.listen(3003);
