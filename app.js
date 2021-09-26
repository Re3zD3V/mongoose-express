var express = require( 'express' );
var app = express();
app.use( express.json() );
app.use( express.urlencoded( {
	extended: false
} ) );

// Deprecated
// var bodyParser = require( 'body-parser' );
// app.use( bodyParser.json() );
// app.use( bodyParser.urlencoded( {
// 	extended: false
// } ) );

// Routers
var booksRouter = require( './routes/books.router' );

// Routers setup
app.use( '/books', booksRouter );

var port = 8080;
app.listen(port, () => {
	console.log( `App listening on port ${port}` );
});