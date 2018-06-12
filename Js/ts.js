var timeseries,
  width = 1000,
  height = 700,
  ratio = .70;

var margin = { top: 20, right: 20, bottom: 30, left: 50},
    viewBoxWidth= width + margin.left + margin.right,
    viewBoxHeight = height + margin.top + margin.bottom,
    chartWidth = $("#timeseries").width();
    chartHeight = chartWidth * ratio;

var parseTime = d3.timeParse("%d/%m/%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Close); });

d3.csv('data/ticker.csv', function(d) {
  d.Date = parseTime(d.Date);
  d.Close = +d.Close;

  return d;
}, function(error, data) {
  if (error) throw error;
   timeseries = d3.select("#timeseries").append("svg")
      .attr("viewBox", "-70 0 " + (viewBoxWidth + margin.left + margin.right) + " " + (viewBoxHeight + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

  g = timeseries.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain(d3.extent(data, function(d) { return d.Close; }));


  g.append("g")
      .attr("transform", "translate(0," + (height+15) + ")")
      .call(d3.axisBottom(x))
   

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "2em")
      .attr("text-anchor", "end")
      .text("Price ($)");


       g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  
});



$(window).resize(function() {
  var chartWidth = $("#timeseries").width();
  timeseries.attr("width", chartWidth);
  timeseries.attr("height", chartWidth * ratio);
});