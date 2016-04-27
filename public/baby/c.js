console.log("connetd to c");

var babyNameApp = angular.module('babyNameApp', []);

babyNameApp.controller('BabyNameCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	
	
	$http.get('/home/Andrew').success(function(response){
		console.log("i got the data");
		
		$scope.names = response;
		console.log($scope.names);
		$scope.currentName = response[0].Name;
		
	}).error(function(msg) {
            console.log("This request failed.\n" + msg);
        });
	
		
	
}]);﻿