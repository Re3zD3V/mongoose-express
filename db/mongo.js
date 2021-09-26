var mongoose = require( 'mongoose' );

var db = 'mongodb://localhost/myLibrary';

mongoose.connect( db );

module.exports = mongoose;