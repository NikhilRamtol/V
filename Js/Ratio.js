var PeSvg,
  width = 400,
  height = 400,
  ratio = 1;

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    viewBoxWidth= width - margin.left - margin.right,
    viewBoxHeight = height - margin.top - margin.bottom,
    chartWidth = $("#PeRatio").width();
    chartHeight = chartWidth * ratio;

PeSvg = d3.select("#PeRatio").append("svg")
      .attr("viewBox", "0 0 " + (viewBoxWidth + margin.left + margin.right) + " " + (viewBoxHeight + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("width", chartWidth/2)
      .attr("height", chartHeight/2);

 var x = d3.scaleBand().rangeRound([0, (width-50)]).padding(0.1),
     y = d3.scaleLinear().rangeRound([(height-50), 0]);

var g = PeSvg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.csv("data/Pe.csv", function(d) {
  d.Close = +d.Close;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function(d) { return d.Close; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height-50) + ")")
      .call(d3.axisBottom(x).ticks(10, "%"));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Date); })
      .attr("y", function(d) { return y(d.Close); })
      .attr("width", 20)
      .attr("height", function(d) { return ((height-50) - y(d.Close))+1; });
});
 $(window).resize(function() {
  var PeSvgW = $("#PeRatio").width();
  PeSvg.attr("width", PeSvgW/2);
  PeSvg.attr("height", PeSvgW/2);
});