const express = require('express');
const zlib = require('zlib');
const request = require('request');
const url = require('url');
const { Transform } = require('stream');

const PORT = 4321;

const app = express();

const transform = function (c, enc, cb) {
  const result = c
    .toString()
    .split('')
    .map(i => +i + 1)
    .join('')
  this.push(result);
  cb();
};

app
  .use(express.static('public'))
  .post('/zip', (req, res) => {
    req
      .pipe(zlib.createGzip())
      .pipe(res);
  })
  .get('/pipe', (req, res) => {
    const r = request(url.format({
      protocol: 'https',
      host: 'kodaktor.ru',
      pathname: '/g/forpipe'
    }))
    r.pipe(res);
  })
  .post('/plus1', (req, res) => {
    let plusOne = new Transform({ transform });
    req
      .pipe(plusOne)
      .pipe(res);
  })
  .use((req, res) => {
    res
      .status(404)
      .set('Content-Type', 'text/html')
      .send('<h1 style="color: darkred">Not Founded</h1>');
  })
  .listen(process.env.PORT || PORT, () => `Process run on ${PORT} port`);

