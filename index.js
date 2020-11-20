require('dotenv').config();

const express    = require('express');
const app        = express();
const port       = 5000;
const crypto     = require('crypto');
const request    = require('request');
const bodyParser = require('body-parser');

let request_options = {
  method: 'POST',
  json: true,
  url: 'http://localhost:5001',
  headers: {
    'Content-type': 'application/json'
  }
}

app.get('/webhook', (req, res) => {
  console.log('GET /webhook');
  const hmac = crypto.createHmac('sha256', process.env.CONSUMER_SECRET).update(req.query.crc_token).digest('base64');
  res.send('{"response_token":"sha256=' + hmac + '"}');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('POST /webhook');
  res.setHeader('Content-Type', 'text/plain');

  if (req.body.tweet_create_events) {
    request_options.body = req.body.tweet_create_events;
    request.post(request_options, (err, res, body) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('OK');
      }
    });
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
