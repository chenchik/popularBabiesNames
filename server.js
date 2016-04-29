var express = require('express');
var app = express();
var db = require('./config/db');
var json2csv = require('nice-json2csv');


var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(json2csv.expressDecorator);  

app.set('views', __dirname+'/public');

//getting data for all common
app.get('/home', function (req, res) {
  var collection = db.get().collection('names');
    collection.find({ "Count" : {"$gt": 10000}}).toArray(function(err, results) {
		res.json(results);
  });
});

//getting data specific year
app.get('/home/common/:id', function (req, res) {
  var year = parseInt(req.params.id);
  var collection = db.get().collection('names');
  if(year > 1915){
    collection.find({"Count" : {"$gt": 15000}, "Year": {"$eq": year}}).toArray(function(err, results) {    
		res.json(results);		
    });
  }else if(year <= 1915 && year > 1900){
	 collection.find({"Count" : {"$gt": 4000}, "Year": {"$eq": year}}).toArray(function(err, results) {    
		res.json(results);		
    });
  }else{
	  collection.find({"Count" : {"$gt": 1500}, "Year": {"$eq": year}}).toArray(function(err, results) {    
		res.json(results);		
    });
  }
});

//getting data for specified name
app.get('/backName/:id/:gender', function (req, res) {
  var collection = db.get().collection('names');
	collection.find({"Name": req.params.id, "Gender": req.params.gender}).toArray(function(err, results) {
		res.json(results);
  });
});

//getting main page
var pastYear = 2001;
app.get('/', function(req,res){
	pastYear = 2001;
  res.render('index.ejs', {year:2001});
});

//rendering specific year
app.get('/home/year/:id', function (req, res) {
  pastYear = req.params.id;
  var specificYear = req.params.id;
  res.render('index.ejs', {year:specificYear});
});

//rendering specified name's frontend
app.get('/name/:id/:gender', function (req, res) {
  var specificName = req.params.id;
  var g = req.params.gender;
  res.render('indexAndrew.ejs', {name:specificName, past: pastYear, gender: g});
});

db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
