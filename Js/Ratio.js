var PeSvg,
  pwidth = 350,
  pheight =150,
  pratio = .65;

  var pmargin = {top: 20, right: 20, bottom: 30, left: 40},
    pviewBoxWidth= pwidth - pmargin.left - pmargin.right,
    pviewBoxHeight = pheight - pmargin.top - pmargin.bottom,
    pchartWidth = $("#PeRatio").width();
    pchartHeight = pchartWidth * pratio;

PeSvg = d3.selectAll("#PeRatio","#EPsRatio").append("svg")
      .attr("viewBox", "0 0 " + (pviewBoxWidth + pmargin.left + pmargin.right) + " " + (pviewBoxHeight + pmargin.top + pmargin.bottom))
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("width", pchartWidth)
      .attr("height", pchartHeight);

var xp = d3.scale.ordinal()
    .rangeRoundBands([0, 450], .1);

  var xy = d3.scaleLinear().rangeRound([(pheight), 0]);



var g = PeSvg.append("g")
    .attr("transform", "translate(" + pmargin.left + "," + pmargin.top + ")");

 d3.csv("data/Pe.csv", function(d) {

  d.Close = +d.Close;
  d.M =+ d.M;
  return d;
}, function(error, data) {
  if (error) throw error;
  xp.domain(d3.extent(data, function(d) { return d.Date; }));

xy.domain([0, d3.max(data, function(d) { return d.Close+.10; })]);


  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (pheight) + ")")
      .call(d3.axisBottom(xp));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(xy))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "1em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return d.M; })
      .attr("y", function(d) { return (xy(d.Close)); })
      .attr("width", 50)
      .attr("height", function(d) { return pheight - xy(d.Close); });
});
 $(window).resize(function() {
  var PeSvgW = $("#PeRatio").width();
  PeSvg.attr("width", PeSvgW);
  PeSvg.attr("height", PeSvgW * pratio);
});