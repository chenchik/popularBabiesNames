	
		var slider = new Slider('#homeSlider', {
			formatter: function(value) {
				return ('Year: ' + value);
			}
		});

		//variable for helping map mubers to letters
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
		var toLetter = function(num){
			for(var i = 1; i <= 26; i++){
				if(i == num){
					return toAlpha[i];
				}
			}
			return "A";
		}

		//slider for alphabetical order
		var alphaSlider = new Slider('#alphaSlider', {
			formatter: function(value) {
				if(typeof value == 'object'){
					for(var i in value){
						value[i] = toLetter(value[i]);
					}
				}
				else{
					value = toLetter(value);
				}
				return ('Range: ' + value);
			}
		});

		$('.questionMarkT').on('click', function(e){
			$('.furtherInfo').slideToggle('fast');
			$('.initialInfo').slideToggle('fast');
		});
		
		var media = $('.angContainer');
		$(document).scroll( function() {
		   var scrollTop = $(document).scrollTop();
		   //acounts for dynamic height
		   var mediaTop = $('.headerText').outerHeight() + $('.d3AndOthersContainer').outerHeight() + $('.angContainer').outerHeight() + $('.angTitle').outerHeight() - 70;
		   if (mediaTop < scrollTop) {
		       $(media).css({'position': 'fixed', 'top': '0px'}); 
		       $(".outerOuterLetterConatiner").css({'margin-top': $('.angContainer').outerHeight()+'px'});
		   }
		   else { 
		       $(media).css({'position': 'static', 'top': '0px'});
		   	   $(".outerOuterLetterConatiner").css({'margin-top': '0px'});
		   }
		});