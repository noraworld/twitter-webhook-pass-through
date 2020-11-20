require('dotenv').config();

const express = require('express');
const app = express();
const port = 5000;
const crypto = require('crypto');

app.get('/webhook', (req, res) => {
  console.log('GET /webhook');
  const hmac = crypto.createHmac('sha256', process.env.CONSUMER_SECRET).update(req.query.crc_token).digest('base64');
  res.send('{"response_token":"sha256=' + hmac + '"}');
});

app.post('/webhook', (req, res) => {
  console.log('POST /webhook');
  res.setHeader('Content-Type', 'text/plain');
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
