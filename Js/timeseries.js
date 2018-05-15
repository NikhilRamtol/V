

var width = 250,
    height = 250,
    margin = {top: 30, right: 30, bottom: 30, left: 30},
    totalWidth = width + margin.right + margin.left;
    totalHeight = height + margin.top + margin.bottom;
    
    svg = d3.select("#chart")
        .attr("style", "padding-bottom: " + Math.ceil(totalWidth * 100 / totalHeight) + "%")
        .append("svg")
        .attr("viewBox", (-margin.left) + " " + (-margin.top) + " " + totalWidth + " " + totalHeight);

var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

svg.append("g").attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("fill", "#000")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Precission");
svg.append("g").call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .attr("text-anchor", "end")
    .text("Recall");

var spaceDsvParser = d3.dsvFormat(',');
d3.request('data/ticker.csv')
    .response(function(xhr) { return spaceDsvParser.parse(xhr.responseText); })
    .get(function(error, data) {
        if (error) throw error;

        x.domain([0, 1]);
        y.domain([0, 1]);

        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 1)
            .attr("cx", function(d) { return x((d.e)); })
            .attr("cy", function(d) { return y((d.f)); })
            .style("fill", "#10c1ac");
    });




