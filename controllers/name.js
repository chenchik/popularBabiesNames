var db = require('../config/db');



exports.home = function(req, res){
	var collection = db.get().collection('names');
	
	//collection.find({})
    collection.find({"Name": "Emma", "Year": 1880}).toArray(function(err, results) {
        res.render('home', {names: results});
		console.log(results);
		res.json(results);
	
		
    });
}



