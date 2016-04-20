var app = angular.module('myApp',['members']);

app.controller('BaseController', ['$http', function($http) {
	console.log("connected");
	
	//$http.get('/', )
	this.stuff="hello";
}]);
