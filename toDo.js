var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/toDoList')

var app = express();
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

var dbItem = mongoose.model('item', {
	item : String
});

function getItems(req, res) {
	dbItem.find(function(err, items) {
		if (err) {
			res.send(err);
		}
		res.json(items); //return items as JSON
	});
}

function createItem(req, res) {
	dbItem.create({
		item : req.body.text,
		done : false
	}, function(err) {
		if (err) {
			res.send(err);
		}
		getItems(req, res);
	});
}

function deleteItem(req, res) {
	dbItem.remove({
		_id : req.params.item_id
	}, function(err) {
		if (err) {
			res.send(err);
		}
		getItems(req, res);
	});
}

//get items on get to /api/items
app.get('/api/items', getItems);

//create item on post to /api/items
app.post('/api/items', createItem);

//delete item on delete to /api/items/[_id]
app.delete('/api/items/:item_id', deleteItem);

var server = app.listen(80, function() {
	console.log("Listening on port %d", server.address().port);
});