var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	$scope.theYear = 2014;
	
	$http.get('/home').success(function(response){
		console.log("i got the data");
		$scope.names = response;
		
		$scope.uniqueNames = {};
		var uniqify = function(obj, people){
			for(var i in people){
				if(obj[people[i].Name] == undefined){
					$scope.uniqueNames[people[i].Name] = people[i];				
				}
			}
		};
		uniqify($scope.uniqueNames, $scope.names);
		
	});
	
		
	
	
	$scope.stuff = "hello";
	
	$scope.uniqueNames = {};
	var uniqify = function(obj, people){
		for(var i in people){
			if(obj[people[i].Name] == undefined){
				$scope.uniqueNames[people[i].Name] = people[i];				
			}
		}
	}
	uniqify($scope.uniqueNames, $scope.names);
	//for(var i in $scope.uniqueNames){
	//	console.log("uniqye names are " + $scope.uniqueNames.Name + " at " + i);
	//}
	//console.log("uniqye names are "+ $scope.uniqueNames);
	
	
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
		else if(seenBefore[name] == 1){
			console.log("saw it once");
			seenBefore[name] = 2;
			console.log("returning true second time");
			return "true";
		}
		
			console.log("returning false");
			return "false";
		
		//console.log(seenBefore);
	};
	
	$scope.testing = function(){
		console.log("testing");
		return "testing";
	}
		
	
}]);﻿