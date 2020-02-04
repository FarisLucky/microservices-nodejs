const express = require('express'); //Load Express JS
const app = express();

const bodyParser = require('body-parser'); //Load Body Parser

app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json());

const mongo = require('mongoose'); //Load Mongo Driver

// mongo.connect('http://localhost/')

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.get('/customer/:customerId', (req, res) => {
  res.send(req.params.customerId);
});

app.post('/customer/tambah', function (req, res) {
  let id = req.body.id;
  res.send('POST request to the homepage'+id);
})

app.listen(3000);