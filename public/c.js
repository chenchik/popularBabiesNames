console.log("connetd to c");

var babyNameApp = angular.module('babyNameApp', []);

babyNameApp.controller('BabyNameCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	$scope.minYear = 2000;
	
	$scope.maxYear = 2014;
	
	
	$scope.theCount = 0;
	$scope.currentCount = 0;
	
	$scope.countDiff = 0;
	
	$scope.countGain = true;
	
	$scope.changeCount = function(){
		$scope.theCount;
		//$scope.currentCount++;
		
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
		console.log($scope.theCount);	
	};
	
	
	$scope.range = [];
	$scope.firstYear = 0;
	$scope.lastYear = 0;
	$scope.rangeDiff = 0;
	$scope.rangeDiffGain = true;
	$scope.totalCount = 0;
	
		
	$scope.changeRange = function(){
		for(var i in $scope.range){	
			console.log("i is: "+ i + "range is " + $scope.range[i]);
		}
		var first = parseInt($scope.range.slice(0,4));
		var last = parseInt($scope.range.slice(-4));
		//console.log($scope.range);
		/*for(var i in $scope.range){	
			console.log("i is: "+ i + "range is " + $scope.range[i]);
		}*/
		console.log('first year is ' + first + ' last year is: ' + last);
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
		console.log("first position is : " + firstPosition + " last position is: " + lastPosition);
		
		$scope.rangeDiff = $scope.names[lastPosition].Count - $scope.names[firstPosition].Count;
		
		if($scope.rangeDiff < 0){
			$scope.rangeDiffGain = false;
		}else{
			$scope.rangeDiffGain = true;
		}
		
		$scope.totalCount = 0;
		var i = parseInt(firstPosition); 
		var j = parseInt(lastPosition);
		//console.log("i before loop: " + i+ " ,j before loop: "+ j );
		//if(i < j){console.log('i is less than j');}
		//console.log(typeof i);
		//console.log(typeof j);
		
		while(i < j){
			//console.log("i is: " +i + " ,j is: "+ j );
			//console.log("incremented totalCount is: " + $scope.totalCount);
			$scope.totalCount += $scope.names[i].Count;
			i++;
		}
		//console.log("totalCount is: " + $scope.totalCount);
		
		
		
		
		
		console.log("-----------------");
	};
	
	$scope.checkGain = function(countGain){
		return (countGain)? "gain" : "loss";
	};
	
	var nameOnClient = document.getElementById('currentNameOnClient').innerHTML;
	
	console.log('name on client is' + nameOnClient);
	$http.get('/home/'+nameOnClient).success(function(response){
		console.log("i got the data");
		
		
		
		$scope.names = response;
		$scope.currentName = response[0].Name;
		function updateMaxYear(){
			for(var i in $scope.names){
				if($scope.names[i].Year < minYear){
					minYear = $scope.names[i].Year
				}
			}
		}
		
		$scope.minYear = parseInt(response[0].Year);
		$scope.maxYear = parseInt(response[response.length-1].Year);
		
	}).error(function(msg) {
            console.log("This request failed.\n" + msg);
    });
	
		
	
}]);﻿