const express = require('express'); //Load Express JS
const bodyParser = require('body-parser'); //Load Body Parser
const mongo = require('mongoose'); //Load Mongo Driver
const app = express(); //Inisiasi App Express Js
let db = require('./model/cinema-catalog'); //Load Model Schema

app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json());

//Konfigurasi sistem ke database catalog
mongo.connect('mongodb://localhost/catalog',{
  useNewUrlParser:true,useUnifiedTopology:true
})

const connect = mongo.connection;

connect.once('open',()=>{
  console.log('berhasil mongo');
})

app.get('/catalog', (req, res) => {
  db.find()
  .then(movie=>{
    res.json(movie);
  }).catch(err=>{
    res.json('ERror '+err);
  })
});

app.get('/catalog/:catalogId', (req, res) => {
  let id = req.params.catalogId;
  db.find({"_id":id})
  .then(movie=>{
    res.send(movie);
  }).catch(err=>{
    res.send("Data tidak ditemukan");
  })
});

app.post('/catalog/tambah', function (req, res) {
  let catalog = req.body.catalog;
  db.insertOne({catalog})
  .then(()=>{
    res.send('Catalog Berhasil ditambahkan');
  }).catch(err=>{
    res.send(`Error ${err}`);
  });
});

app.delete('/catalog/hapus/:id', (req, res) => {
  let id = req.params.id;
  db.findByIdAndDelete(id)
  .then(()=>{
    res.send('Berhasil dihapus');
  }).catch(err=>{
    res.send(`Error ${err}`);
  })
})

const axios = require('axios'); //Load axios http client
// Mencoba mengambil data Movie dari service Movie berdasarkan catalog id;
app.get('/catalog/movies/:catalogId', (req, res) => {
  let catalog_id = req.params.catalogId;
  axios.get('http://localhost:3000/movies/catalog/'+catalog_id)
  .then(result => {
    res.send(result.data);
  }).catch(err=>{
    res.send("Data gagal dimuat "+err);
  })

})

app.listen(5000);