const express = require('express');
const zlib = require('zlib');

const PORT = 4321;

const app = express();

app
  .use(express.static('public'))
  .post('/zip', (req, res) => {
    req
      .pipe(zlib.createGzip())
      .pipe(res);
  })
  .use((req, res) => {
    res
      .status(404)
      .set('Content-Type', 'text/html')
      .send('<h1 style="color: darkred">Not Founded</h1>');
  })
  .listen(process.env.PORT || PORT, () => `Process run on ${PORT} port`);

