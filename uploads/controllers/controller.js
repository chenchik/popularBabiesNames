var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	$http.get('/').success(function(response){
		console.log("i got the data");
		$scope.names = response;
	});
		
	
}]);﻿