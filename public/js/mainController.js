var yearApp = angular.module('yearApp', []);

yearApp.controller('yearCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.theYear = document.getElementById("initYear").innerHTML;
	
	$http.get('/home').success(function(response){
		$scope.names = response;
		
		//makes an array of uniquenames for the list of names
		$scope.uniqueNames = {};
		var uniqify = function(obj, people){
			for(var i in people){
				if(obj[people[i].Name] == undefined || (obj[people[i].Name].Gender != 'M' || obj[people[i].Name].Gender != 'F')){
					$scope.uniqueNames[people[i].Name] = people[i];	
				}
			}
		};
		uniqify($scope.uniqueNames, $scope.names);
		$scope.letters = {};

		//method to put all names into their own first letter category
		var alphabetize = function(letters, names){
			for(var i in names){
				var currentChar = names[i].Name.charAt(0);
				if(letters[currentChar] == undefined){
					letters[currentChar] = {};
					letters[currentChar][names[i].Name] = names[i];
				}
				else{
					letters[currentChar][names[i].Name] = names[i];
				}
			}

		}

		alphabetize($scope.letters, $scope.uniqueNames);
		var debugObj = $scope.letters;
		
	});
	
	var _this = this;

	$scope.maleActive = true;
	$scope.femaleActive = true;
	$scope.angMale = "activeMale";
	$scope.angFemale = "activeFemale";
	$scope.toggleMale = function(){
		$scope.maleActive = !$scope.maleActive;
		if($scope.angMale == "activeMale"){
			$scope.angMale = "deactiveMale";
		}
		else{
			$scope.angMale = "activeMale";
		}
	}

	$scope.toggleFemale = function(){
		$scope.femaleActive = !$scope.femaleActive;
		if($scope.angFemale == "activeFemale"){
			$scope.angFemale = "deactiveFemale";
		}
		else{
			$scope.angFemale = "activeFemale";
		}
	}

	$scope.showGender = function(gender){
		if(gender == 'F'){
			return $scope.femaleActive; 
		}
		else{
			return $scope.maleActive; 
		}
	}

	//variable to map numbers to letter
	var toAlpha = {1: 'A',
					2: 'B',
					3: 'C',
					4: 'D',
					5: 'E',
					6: 'F',
					7: 'G',
					8: 'H',
					9: 'I',
					10: 'J',
					11: 'K',
					12: 'L',
					13: 'M',
					14: 'N',
					15: 'O',
					16: 'P',
					17: 'Q',
					18: 'R',
					19: 'S',
					20: 'T',
					21: 'U',
					22: 'V',
					23: 'W',
					24: 'X',
					25: 'Y',
					26: 'Z'};
	var letterObj = {};

	$scope.newLetter = function(name){
		var letter = name.charAt(0);
		if(letterObj.letter != undefined){
			letterObj.letter = 1;
			return true;
		}
		else{
			return false;
		}

	}

	//variable to map letters to numbers
	$scope.theAlphaRange = 'A,Z';
	var letterToNumber = {'A':1 ,
					'B': 2,
					'C': 3 ,
					'D': 4,
					'E': 5 ,
					'F': 6 ,
					'G': 7,
					'H': 8 ,
					'I': 9 ,
					'J': 10,
					'K': 11,
					'L': 12,
					'M': 13,
					'N': 14,
					'O': 15,
					'P': 16,
					'Q': 17,
					'R': 18,
					'S': 19,
					'T': 20,
					'U': 21,
					'V': 22,
					'W': 23,
					'X': 24,
					'Y': 25,
					'Z': 26

	};
	$scope.showLetter = function(letter){
		var first = $scope.theAlphaRange.charAt(0);
		var second = $scope.theAlphaRange.charAt(2);
		var firstNum = letterToNumber[first];
		var secondNum = letterToNumber[second];
		var currentNum = letterToNumber[letter];
		if(currentNum >= firstNum && currentNum <= secondNum){
			return true;
		}
		else{
			return false;
		}
	}


}]);﻿