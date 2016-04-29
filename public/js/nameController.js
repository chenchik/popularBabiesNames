var babyNameApp = angular.module('babyNameApp', []);

babyNameApp.controller('BabyNameCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.minYear = 2000;
	$scope.maxYear = 2014;
	$scope.theCount = 0;
	$scope.currentCount = 0;
	$scope.countDiff = 0;
	$scope.countGain = true;
	
	//method for counting differences between years
	$scope.changeCount = function(){
		var currentCountPosition = 0;
		for(var i in $scope.names){
			if($scope.names[i].Year == $scope.theCount){
				$scope.currentCount = $scope.names[i].Count;
				currentCountPosition = i;
			}
		}
		if(currentCountPosition > 0 && $scope.names[currentCountPosition].Count > $scope.names[currentCountPosition-1].Count){
			$scope.countGain = true;	
		}
		else{
			$scope.countGain = false;
		}	
		if(currentCountPosition > 0){
			$scope.countDiff = $scope.names[currentCountPosition].Count - $scope.names[currentCountPosition-1].Count;
		}
		else{
			$scope.countDiff = 0;
		}
	};
	
	
	$scope.range = [];
	$scope.firstYear = 0;
	$scope.lastYear = 0;
	$scope.rangeDiff = 0;
	$scope.rangeDiffGain = true;
	$scope.totalCount = 0;
	
	//method for changing range interval between two years
	$scope.changeRange = function(){
		var first = parseInt($scope.range.slice(0,4));
		var last = parseInt($scope.range.slice(-4));
		$scope.firstYear = first;
		$scope.lastYear = last;
		
		var firstPosition = 0;
		var lastPosition = 0;
		for(var i in $scope.names){
			if($scope.names[i].Year == first){
				firstPosition = i;
			}
			if($scope.names[i].Year == last){
				lastPosition = i;
			}
		}
		$scope.rangeDiff = $scope.names[lastPosition].Count - $scope.names[firstPosition].Count;
		if($scope.rangeDiff < 0){
			$scope.rangeDiffGain = false;
		}else{
			$scope.rangeDiffGain = true;
		}
		
		$scope.totalCount = 0;
		var i = parseInt(firstPosition); 
		var j = parseInt(lastPosition);
		while(i < j){
			$scope.totalCount += $scope.names[i].Count;
			i++;
		}
	};
	
	$scope.checkGain = function(countGain){
		return (countGain)? "gain" : "loss";
	};
	
	var nameOnClient = document.getElementById('currentNameOnClient').innerHTML;
	var genderOnClient = document.getElementById('currentGenderOnClient').innerHTML;
	
	$http.get('/backName/'+nameOnClient+'/'+genderOnClient).success(function(response){
		$scope.names = response;
		$scope.currentName = nameOnClient;
		function updateMaxYear(){
			for(var i in $scope.names){
				if($scope.names[i].Year < minYear){
					minYear = $scope.names[i].Year
				}
			}
		}
		$scope.minYear = parseInt($scope.names[0].Year);
		$scope.maxYear = parseInt($scope.names[response.length-1].Year);
		
	}).error(function(msg) {
            console.log("This request failed.\n" + msg);
    });
}]);﻿