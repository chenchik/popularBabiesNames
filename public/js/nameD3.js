
		var margin = {top: 20, right: 20, bottom: 40, left: 60},
			width = 1140 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		

		var x = d3.scale.linear()
			.range([0, width]);

			
		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

		var line = d3.svg.line()
			.x(function(d) { return x(d.Year); })
			.y(function(d) { return y(d.Count); });

		var svg = d3.select(".svgContainer").append("svg")
    		.attr("width", width + margin.left + margin.right)
   			 .attr("height", height + margin.top + margin.bottom)
 			 .append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		//get the data
		d3.json('/backName/' + globalName+'/'+globalGender, function(error, data) {
		  if (error) throw error;
		  
		  x.domain(d3.extent(data, function(d) { return d.Year; }));
		  y.domain(d3.extent(data, function(d) { return d.Count; }));

		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis);

		  svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Count");

		//draw the line
		  svg.append("path")
			  .datum(data)
			  .attr("class", "line")
			  .attr("d", line);
		});

		function type(d) {
		  d.Year = d.Year;
		  d.Count = +d.Count;
		  return d;
		}