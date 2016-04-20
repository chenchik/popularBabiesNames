var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	$http.get('/home').success(function(response){
		console.log("i got the data");
		$scope.names = response;
		
	});
	
	$scope.stuff = "hello";
	
	var seenBefore = {"jjj": 5};
	var _this = this;
	$scope.haventSeen = function(person){
		var name = person.Name;
		console.log(name);
		console.log(name+"s id is: "+ person.Id);
		console.log(seenBefore);
		console.log(seenBefore[name]);
		if(seenBefore[name] === undefined){
			console.log("havent seen before");
			seenBefore[name] = 1;
			console.log("about to return true");
			return "true";
		}
		else{
			return "false";
		}
		//console.log(seenBefore);
	};
		
	
}]);﻿