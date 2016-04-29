 //mostly just methods for creating sliders
 $(function() {
    $( "#slider" ).slider({
      value:100,
      min: 2001,
      max: 2014,
      step: 1,
      slide: function( event, ui ) {
        $( "#yearNum" ).val(ui.value );
    		$( ".test" ).html('{{currentName}}');
      }
    });
    $( "#yearNum" ).val($( "#slider" ).slider( "value" ) );
	  $( ".test" ).html('{{currentName}}');
  });

 $('#ex1').slider({
      formatter: function(value) {
        return ('Year: '+ value);
      }
    });
    var slider = new Slider('#ex1', {
      formatter: function(value) {
        return ('Year: ' + value);
      }
    });
    $("#ex2").slider({});

    var slider = new Slider('#ex2', {
      formatter: function(value) {
        return ('Range: ' + value);
      }
    });