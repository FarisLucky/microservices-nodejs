const express = require('express'); //Load Express JS
const bodyParser = require('body-parser'); //Load Body Parser
const mongo = require('mongoose'); //Load Mongo Driver
const app = express(); //Inisiasi App Express Js

let db = require('./model/movie_model'); //Load Database Schema

app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json());

// Konfigurasi service dengan database Movie
mongo.connect('mongodb://localhost/movie',{
  useNewUrlParser:true,useUnifiedTopology:true
})

// Menyimpan sambungan koneksi ke variable
const connect = mongo.connection;

// Info Berhasil koneksi
connect.once('open',()=>{
  console.log('berhasil mongo');
})


app.get('/movies', (req, res) => {
  db.find()
  .then(movie=>{
    res.json(movie);
  }).catch(err=>{
    res.json('ERror '+err);
  })
});

app.get('/movies/:movieId', (req, res) => {
  let id = req.params.movieId;
  db.find({"_id":id})
  .then(movie=>{
    res.send(movie);
  }).catch(err=>{
    res.send("Data tidak ditemukan");
  })
});
app.post('/movies/tambah', function (req, res) {
  let title = req.body.title;
  let format = req.body.format;
  let realease = req.body.realease;
  let catalog_id = req.body.catalog_id;
  db.insertOne({title,format,realease,catalog_id})
  .then(()=>{
    res.send('Movie Berhasil ditambahkan');
  }).catch(err=>{
    res.send(`Error ${err}`);
  })
});

app.delete('/movies/hapus/:id', (req, res) => {
  let id = req.params.id;
  db.findByIdAndDelete(id)
  .then(()=>{
    res.send('Movie Berhasil dihapus');
  }).catch(err=>{
    res.send(`Error ${err}`);
  })
})


// Ambil Data Movie berdasarkan catalog
app.get('/movies/catalog/:catalogId', (req, res) => {
  let id = req.params.catalogId;
  console.log(id);
  db.find({"catalog_id":id})
  .then(movie=>{
    res.send(movie);
  }).catch(err=>{
    res.send("Data tidak ditemukan");
  })
});

app.listen(3000);