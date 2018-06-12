var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 350 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var xr = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var yr = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xr);

var yAxis = d3.svg.axis()
    .scale(yr)
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.Close + "</span>";
  })

var svg = d3.select("#PeRatio").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

 d3.csv("data/Pe.csv", function(error, data) {
  xr.domain(data.map(function(d) { return d.Date; }));
  yr.domain([0, d3.max(data, function(d) { return d.Close; })]);

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
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xr(d.Date); })
      .attr("width", xr.rangeBand())
      .attr("y", function(d) { return yr(d.Close); })
      .attr("height", function(d) { return height - yr(d.Close); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.Close = +d.Close;
  return d;
}