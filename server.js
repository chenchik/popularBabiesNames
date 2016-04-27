var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
var db = require('./config/db');
var json2csv = require('nice-json2csv');


var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(json2csv.expressDecorator);  

app.set('views', __dirname+'/public');

app.get('/home', function (req, res) {
  console.log('I received a GET request');
  
  var collection = db.get().collection('names');
	
	//collection.find({})
    collection.find({ "Count" : {"$gt": 10000}}).toArray(function(err, results) {
        //res.render('home', {names: results});
		console.log(results);
		//res.type('text/csv');
		res.json(results);
		//res.send(results);
		//res.csv(results, 'myFile.csv');
	
		
    });

 /* db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });*/
});

app.get('/home/common', function (req, res) {
  console.log('I received a GET request');
  
  var collection = db.get().collection('names');
	
	//collection.find({})
    collection.find({"Count" : {"$gt": 15000}, "Year": {"$eq": 1970}}).toArray(function(err, results) {
        //res.render('home', {names: results});
		console.log(results);
		//res.type('text/csv');
		res.json(results);
		//res.send(results);
		//res.csv(results, 'myFile.csv');
	
		
    });

 /* db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });*/
});

app.get('/home/common/:id', function (req, res) {
  console.log('I received a GET request');
  console.log(req.params.id);
  console.log(typeof req.params.id);
  var year = parseInt(req.params.id);
  var collection = db.get().collection('names');
  if(year > 1915){
    collection.find({"Count" : {"$gt": 15000}, "Year": {"$eq": year}}).toArray(function(err, results) {    
		console.log(results);	
		res.json(results);		
    });
  }else if(year <= 1915 && year > 1900){
	 collection.find({"Count" : {"$gt": 4000}, "Year": {"$eq": year}}).toArray(function(err, results) {    
		console.log(results);	
		res.json(results);		
    });
  }else{
	  collection.find({"Count" : {"$gt": 1500}, "Year": {"$eq": year}}).toArray(function(err, results) {    
		console.log(results);	
		res.json(results);		
    });
  }
});



app.get('/home/:id', function (req, res) {
  console.log('I received a GET request for a specific baby name');
  
  var collection = db.get().collection('names');
	
	//collection.find({})
    //collection.find({"Name": req.params.name, "Gender": "M", "Year" : {"$gt": 
	collection.find({"Name": req.params.id, "Gender": "M"}).toArray(function(err, results) {
        //res.render('home', {names: results});
		console.log(results);
		res.json(results);
	
		
    });

 /* db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });*/
});
//specificYearIndex.ejs
var pastYear = 2001;
app.get('/', function(req,res){
	pastYear = 2001;
  res.render('index.ejs', {year:2001});
});
app.get('/home/year/:id', function (req, res) {
  console.log('I received a GET request for a specific year');
  pastYear = req.params.id;
  var specificYear = req.params.id;
  res.render('index.ejs', {year:specificYear});
});

app.get('/name/:id', function (req, res) {
  console.log('I received a GET request for a specific baby name');
  var specificName = req.params.id;
  res.render('indexAndrew.ejs', {name:specificName, past: pastYear});
});



//app.listen(3000);
//console.log("Server running on port 3000");
db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
