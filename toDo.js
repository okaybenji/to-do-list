var express = require('express');
var app = express();

var mongoose = require('mongoose');
var dbItem = mongoose.model('item', {
	text : String
});

mongoose.connect('mongodb://localhost:27017/toDoList')

app.use(express.static(__dirname));

function getItems(req, res) {
	dbItem.find(function(err, items) {
		if (err) {
			res.send(err);
		}
		res.json(items); //return items as JSON
	});
};

app.get('/api/items', function(req, res) {
	getItems(req, res);
});

/*
//create item
app.post('/api/items', function(req, res) {
	dbItem.create({
		text : req.body.text,
		done : false
	}, function(err, item) {
		if (err) {
			res.send(err);
		}
		getItems(req, res);
	});
});

//delete item
app.delete('/api/items/:item_id', function(req, res) {
	dbItem.remove({
		_id : req.params.item_id
	}, function(err, item) {
		if (err) {
			res.send(err)
		}
		getItems(req, res);
	});
});
*/

//create item
app.post('/api/items', function(req, res) {
	dbItem.create({
		text : req.body.text,
		done : false
	}, getItems(req, res));
});

//delete item
app.delete('/api/items/:item_id', function(req, res) {
	dbItem.remove({
		_id : req.params.item_id
	}, getItems(req, res));
});

app.get('/', function(req, res){
	res.sendfile("./index.html");
});

var server = app.listen(80, function() {
	console.log("Listening on port %d", server.address().port);
});