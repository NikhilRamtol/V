var chartSvg,
  width = 500,
  height = 435,
  ratio = .75;

$( document ).ready(function() {
  var margin = { top: 50, right: 50, bottom: 50, left:50},
    viewBoxWidth= width - margin.left - margin.right,
    viewBoxHeight = height - margin.top - margin.bottom,
    chartWidth = $("#svg-container").width();
    chartHeight = chartWidth * ratio;
    gridSize = 40,
    colors = ['#0a3c21', '#766965', '#9b1b24'],
    bins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    alert(chartHeight);
    alert(chartWidth);

  d3.csv('data/omg.csv', function(data) {
    data.forEach(function(d){
      d.a.value = + d.a.value;
      d.b = + d.b;
      d.c = + d.c;
      d.d = + d.d;
      return d;
    });
    var colorScale = d3.scale.quantile().domain([1,3]).range(colors);
    

    chartSvg = d3.select("#svg-container").append("svg")
      .attr("viewBox", "0 0 " + (viewBoxWidth + margin.left + margin.right) + " " + (viewBoxHeight + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    var g = chartSvg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
    var yAxisLabel = chartSvg.append("text") 
        .attr("x", 350)
        .attr("y",  15)
        .style("text-anchor", "middle")
        .text("Logistic score (bin)")
        .attr("class", "axis-label");

    var yTicks = g.selectAll(".yLabel")
      .data(bins)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")");

    var xAxisLabel = chartSvg.append("text") 
        .attr("transform", "rotate(-90)")
        .attr("x", -415)
        .attr("y", 10)
        .text("MLR score (bin)")
        .attr("class", "axis-label")

    var xTicks = g.selectAll(".xLabel")
      .data(bins)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)");

    var heatMap = g.selectAll(".reading")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d) { return d.c * gridSize/5; })
      .attr("y", function(d) { return d.d * gridSize/5; })
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", colors[0]);

    heatMap.append("title")
      .text(function(d) { return d.a; });
        
    heatMap.transition().duration(1000)
      .style("fill", function(d) { return colorScale(d.b); });

    var legend = chartSvg.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) { return d; })
      .enter().append("g")
      .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return gridSize * 2 * i + 85; })
      .attr("y", viewBoxHeight + 50)
      .attr("width", gridSize * 2)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i]; })
      .attr("class", "legend");

    legend.append("text")
      .text(function(d) { return "≥ " + Math.round(d); })
      .attr("x", function(d, i) { return gridSize * 2 * i + 115; })
      .attr("y", viewBoxHeight + 80)
      .style("text-anchor", "middle");

  });

});

//resize function
$(window).resize(function() {
  var chartWidth = $("#svg-container").width();
  chartSvg.attr("width", chartWidth);
  chartSvg.attr("height", chartWidth * ratio);
});



