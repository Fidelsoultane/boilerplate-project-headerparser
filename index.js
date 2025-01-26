// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API hello endpoint (already defined)
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// New endpoint to return IP, language, and software
app.get('/api/whoamidoit', (req, res) => {
  // Get the IP address (from x-forwarded-for or remoteAddress)
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Get the preferred language (from Accept-Language header)
  const language = req.headers['accept-language'] ? req.headers['accept-language'].split(',')[0] : 'en';

  // Get the software (user-agent from User-Agent header)
  const software = req.headers['user-agent'];

  // Return JSON with the extracted data
  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
