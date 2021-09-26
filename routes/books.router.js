var express = require( 'express' );
var router = express.Router();

var mongoDb = require( '../db/mongo');

var Book = require( '../Book.model' );

router.get( '/', function( req, res, next ){

	Book.find( { } ).exec( function( err, books ) {
		if( err ) {
			res.json( { error: err } );
		}else{
			res.json( { books } );
		}
	} );
} );

router.get( '/:id', function( req, res, next ){
	var _id = req.params.id;

	if( _id != undefined ){
		Book.findOne( { _id } ).exec( function( err, book ) {
			if( err ) {
				res.json( { error: err } );
			}else{
				res.json( { book } );
			}
		} );
	}else{
		res.json( { error: 'Missing arguments: The book\'s id is missing.'})
	}
} );

router.get( '/find', function( req, res, next ){
	var params = [];
	if( req.query.title != undefined ){
		params.push( { title: req.query.title } );
	}
	if( req.query.author != undefined ){
		params.push( { author: req.query.author } );
	}

	if( params.length != 0 ){
		Book.find( { $or: params } ).exec( function( err, books ) {
			if( err ) {
				res.json( { error: err } );
			}else{
				res.json( { books } );
			}
		} );
	}else{
		res.json( { error: 'Missing arguments: A title or author should be given.'})
	}
} );

router.post( '/', function( req, res, next ){
	var book = new Book();
	book.title = req.body.title;
	book.author = req.body.author;
	book.category = req.body.category;

	book.save( function( err, book ){
		if( err ){
			res.json( { error: err } );
		}else{
			res.json( { book } );
		}
	} );
} );

router.post( '/new', function( req, res, next ){
	Book.create( req.body, function( err, book ){
		if( err ){
			res.json( { error: err } );
		}else{
			res.json( { book } );
		}
	} );
} );

router.put( '/:id', function( req, res, next ){
	var _id = req.params.id;
	var title = req.body.title;
	var author = req.body.author;
	var category = req.body.category;

	Book.findOneAndUpdate( 
		{ _id },
		{ $set: { title, author, category } },
		{ upsert: true},
		function( err, book ){
			if( err ){
				res.json( { error: `An error occured while updating book: ${id}` } );
			}else{
				res.json( { book } );
			}
	} );
} );

router.delete( '/:id', function( req, res, next){
	var _id = req.params.id;

	Book.findOneAndRemove(
		{ _id },
		function( err, book ){
			if( err ){
				res.json( { error: `An error occured while deleting book: ${id}` } );
			}else{
				res.json( { book } );
			}
		}
	)
} );

module.exports = router;