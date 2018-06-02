//colors = ['#0a3c21', '#766965', '#9b1b24'];
var chartSvg,
  width = 537,
  height = 435,
  ratio = .75;

  $(document).ready(function(){

    var margin = { top: 50, right: 0, bottom: 50, left:0},
    viewBoxWidth= width - margin.left - margin.right,
    viewBoxHeight = height - margin.top - margin.bottom,
    chartWidth = $("#svg-container").width();
    chartHeight = chartWidth * ratio;
    gridSize = 30,
    colors = ['#306596', '#A9C0DE','#9b1b24'],
    status = ['Buy', 'Sell', 'hold'],
    gridposx= gridSize * -1,
    gridposxp= gridSize * -1,
    gridposy = 0,
    gridposyp = 0,
    gridlen = (Math.round(width/gridSize))*gridSize,
    count = 0,
    countp = 0;


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
      .attr("transform", "translate(" + 0 + "," + margin.top + ")");

    var InvestTitle = chartSvg.append("text") 
      .attr("x", 270)
      .attr("y",  25)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Asset Selection")
      .attr("class", "axis-label");  

    var heatMap = g.selectAll(".reading")
      .data(data)
      .enter().append("rect")
      .attr("x", function loadx() { 
        
        if(gridposx>=(gridlen-gridSize)){
          gridposx = gridSize * -1;
        }
        return gridposx += gridSize;
      })
      .attr("y", function loady() { 
        
        if(count>((gridlen/gridSize)-1)){
          gridposy += gridSize;
          count = 0;
        }else if(gridposy==85){
          gridposy=0;
        }
        count++;
        return gridposy; 
      })
      .attr("id", function(d) { return d.a.substring(2); })
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", colors[0])
      .on({
          "mouseover": function() { /* do stuff */ },
          "mouseout":  function() { /* do stuff */ }, 
          "click":  function(d) { location.replace("ticker.php/"+d.a.substring(2)) }, 
        });     
  
    heatMap.transition().duration(1000)
      .style("fill", function(d) { return colorScale(d.b); });
    var labels = g.selectAll("text")
      .data(data)
      .enter().append("text")
      .attr("x", function loadxp() { 
        
        if(gridposxp>=(gridlen-gridSize)){
          gridposxp = gridSize * -1;
        }
        return (gridposxp += gridSize)+5;
      })
      .attr("y", function loadyp() { 
        
        if(countp>((gridlen/gridSize)-1)){
          gridposyp += gridSize;
          countp = 0;
        }else if(gridposy==85){
          gridposyp=0;
        }
        countp++;
        return (gridposyp) + 17 ; 
      })
      .style("fill", "#fff")
      .text(function(d) { return d.a.substring(2); });


  labels.append("svg:a").attr("xlink:href", function(d){ return "index.php/" + d.a });
  

    var legend = chartSvg.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) { return d; })
      .enter().append("g")
      .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return gridSize * 2 * i + 185; })
      .attr("y", viewBoxHeight + 50)
      .attr("width", gridSize * 2)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i]; })
      .attr("class", "legend");

    legend.append("text")
      .text(function(d, i) { 

        var msg ="";
        if(colors[i]=='#306596'){
            msg = "Buy";
        }else if(colors[i]=='#9b1b24'){
          msg = "Sell";
        }else{
          msg = "Hold";
        }
        return msg;
       })
      .attr("x", function(d, i) { return gridSize * 2 * i + 215; })
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


function loadx(){


}

