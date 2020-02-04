const mongoose = require('mongoose');

const catalog_model = mongoose.Schema({
  'catalog':{type:String,required:true}
},{
  timestamp:true
})

const catalog = mongoose.model('catalog',catalog_model);

module.exports = catalog;