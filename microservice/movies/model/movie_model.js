const mongoose = require('mongoose');

const movie_model = mongoose.Schema({
  'title':{type:String,required:true},
  'format':{type:String,required:true},
  'releaseMovies':{type:Date,required:false},
  'catalog_id':{type:String,required:true}
},{
  timestamp:true
});

const movie = mongoose.model('movie',movie_model);

module.exports = movie;
