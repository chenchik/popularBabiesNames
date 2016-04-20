var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
var db = require('./config/db');


var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/home', function (req, res) {
  console.log('I received a GET request');
  
  var collection = db.get().collection('names');
	
	//collection.find({})
    collection.find({"Gender": "M", "Year" : {"$gt": 2000}, "Count" : {"$gt": 10000}}).toArray(function(err, results) {
        //res.render('home', {names: results});
		console.log(results);
		res.json(results);
	
		
    });

 /* db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });*/
});

app.get('/baby/:name', function (req, res) {
  console.log('I received a GET request for a specific baby');
  
  var collection = db.get().collection('names');
	
	//collection.find({})
    collection.find({"Name": req.params.name, "Gender": "M", "Year" : {"$gt": 2000}, "Count" : {"$gt": 10000}}).toArray(function(err, results) {
        //res.render('home', {names: results});
		console.log(results);
		res.json(results);
	
		
    });

 /* db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });*/
});



//app.listen(3000);
//console.log("Server running on port 3000");
db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
