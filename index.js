const express = require('express');
const zlib = require('zlib');

const PORT = 4321;

const app = express();

app
  .use(express.static('public'))
  .post('/zip', (req, res) => {
    req
      .pipe(zlib.createGzip())
      .pipe(res)
  })
  .listen(process.env.PORT || PORT, () => `Process run on ${PORT} port`);

