console.log("hello");


var babyNameApp = angular.module('babyNameApp', []);
babyNameApp.controller('BabyNameCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	/*$http.get('/home').success(function(response){
		console.log("i got the data");
		$scope.names = response;
		
	});*/
	
		
	
}]);﻿