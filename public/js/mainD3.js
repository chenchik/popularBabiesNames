	var diameter = 700;
 	var color = d3.scale.category20b(); 

	var bubble = d3.layout.pack()
		.sort(null)
		.size([diameter, diameter])
		.padding(1.5);

	var svg = d3.select(".otherD3Container")
		.append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble");

	d3.json("/home/common/"+globalYear, function(error, data){

		data = data.map(function(d){ d.value = +d["Count"]; return d; });

		//bubble format
		var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

		var bubbles = svg.append("g")
			.attr("transform", "translate(0,0)")
			.selectAll(".bubble")
			.data(nodes)
			.enter();

		//create bubbles
		bubbles.append("circle")
			.attr("r", function(d){ return d.r; })
			.attr("cx", function(d){ return d.x; })
			.attr("cy", function(d){ return d.y; })
			.attr('class', 'circleBubble')
			.attr('class', function(d){ return "circleBubble"+d["Name"]; })
			.style("fill", function(d) { return color(d.value); })
			.on('mouseover', function(d) {
				//appending count to name
				var sel = '.textCirc'+d['Name'].toString();
                d3.select(sel)
                    .html(d.value);
            })
            .on('mouseout', function(d) {
                var sel = '.textCirc'+d['Name'].toString();
                d3.select(sel)
                    .html(d['Name']);
            });

		//text for each bubble
		bubbles.append("text")
			.attr("x", function(d){ return d.x; })
			.attr("y", function(d){ return d.y + 5; })
			.attr('class', function(d){ return "textCirc"+d["Name"]; })
			.attr("text-anchor", "middle")
			.text(function(d){ 
				return d["Name"]; })
			.style({
				"fill":"white", 
				"font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
				"font-size": "12px"
			})
			.on('mouseover', function(d) {
				var sel = '.textCirc'+d['Name'].toString();
                d3.select(sel)
                    .html(d.value);
                    

                 var circ = '.circleBubble'+d['Name'].toString();
                 d3.select(circ)
                 	.style("opacity", 0.7);
            })
            .on('mouseout', function(d) {
            	var sel = '.textCirc'+d['Name'].toString();
                d3.select(sel)
                    .html(d['Name']);

                var circ = '.circleBubble'+d['Name'].toString();
                 d3.select(circ)
                 	.style("opacity", 1.0);
            });
	});