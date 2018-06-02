var PeSvg,
 width = 1000,
  height = 300,
  ratio = .30;

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    viewBoxWidth= width - margin.left - margin.right,
    viewBoxHeight = height - margin.top - margin.bottom,
    chartWidth = $("#PeRatio").width();
    chartHeight = chartWidth * ratio;

PeSvg = d3.selectAll("#PeRatio","#EPsRatio").append("svg")
      .attr("viewBox", "0 0 " + (viewBoxWidth + margin.left + margin.right) + " " + (viewBoxHeight + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

 var xp = d3.scaleBand().rangeRound([0, (width)]).padding(0.1);
  var xy = d3.scaleLinear().rangeRound([(height-50), 0]);

var g = PeSvg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.csv("data/Pe.csv", function(d) {
  d.Close = +d.Close;
  d.M =+ d.M;
  return d;
}, function(error, data) {
  if (error) throw error;

 xp.domain(d3.extent(data, function(d) { return d.Date; }));
  xy.domain(d3.extent(data, function(d) { return d.Close; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(xp).ticks(10, "%"));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(xy))
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
      .attr("x", function(d) { return d.M; })
      .attr("y", function(d) { return (xy(d.Close))-30; })
      .attr("width", 20)
      .attr("height", function(d) { return (((height) - xy(d.Close))+1)-420; });
});
 $(window).resize(function() {
  var PeSvgW = $("#PeRatio").width();
  PeSvg.attr("width", PeSvgW);
  PeSvg.attr("height", PeSvgW * ratio);
});