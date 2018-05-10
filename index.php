<?php
    require 'Sql/GetMarketCap.php';
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Investment Country</title>
		<link rel="stylesheet" type="text/css" href="Css/screen.css">
		<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
		<script src="Js/topojson.min.js"></script>
		<script src="Js/datamaps.world.hires.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script type="text/javascript">
            var MarketCapName= <?php echo json_encode($MarketCapName); ?>;  
            var MarketCap= <?php echo json_encode($MarketCap); ?>;
            var subMarketCap = [32,10,20,15,5];

            var CapWorld = MarketCap[MarketCap.length-1];
            var bubbles = [];
            for(var i =0 ;i<((MarketCap.length)-1);i++){ // create bubble array to read dynmaic below
                bubbles[i] = {
                    name: MarketCapName[i]+' Market Cap',
                    radius: (subMarketCap[i]/72)*100,
                    centered: MarketCapName[i],
                    country: MarketCapName[i],
                    fillKey : MarketCapName[i],
                    marketcap : MarketCap[i],
                }
            }
         
        </script>
	</head>
	<body>
		<div id="container"></div>
		<script >
            /* Create map function */
			var map = new Datamap({
 				element: document.getElementById("container"), //bind to div
 				projection :'mercator', // display mode , 'mercator is best'
 				responsive : true, // 
 				done: function(datamap) {
            		datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                			alert(geography.properties.name);
            		});
        		},// after map loads refer to this function, does not refer to bubble function due to loading order
        		fills:{ // handle color of maps and bubbles feature as reference keys
        			defaultFill: '#306596',
        			marketCapFill: '#A9C0DE',
        			USA:'#A9C0DE',
        			AUS:'#306596',
        			CHN:'#EDDC4E',
        			HKG:'#CC4731',
        			NZL:'#0fa0fa',

        		},
        		data: { // refer to reference key and other data
    				'USA': { fillKey: 'USA' },
    				'AUS': { fillKey: 'AUS' },
    				'CHN': { fillKey: 'CHN' },
    				'HKG': { fillKey: 'HKG' },
    				'NZL': { fillKey: 'NZL' },
  				},
        		geographyConfig:{ // other map function are handled such on highlighint the map on hover
	 			 highlightFillColor: '#A9C0DE',
        		 highlightBorderColor: '#306596',
        		 popupOnHover: false, 
        		 highlightOnHover: false,
        		},
        		bubbleConfig:{
				 //modify bubble controls, however doesnt seem to work from here as new Datamap() loads before bubble function
        		},
        		 data: {
                    //add custom for on hover function e.g risk of investing in country
            	},
			});
            /* Create bubble function */
			map.bubbles(bubbles, 
  				{
  					popupTemplate: function(geo, data) {
    				return '<div class="hoverinfo">' + data.name + ' : $' + data.marketcap + "</div>"
  				}
			});
			window.addEventListener('resize', function() {
        		map.resize();
    		});// resize map
			$(".datamaps-bubble").on('click', function(data) {
				var prepare = $(this).attr("data-info");
				prepare = prepare.split(":");
				var urlArea = prepare[1].substring(1, 4);
				location.replace("heatmap.html");
			});	 // load onclick 
		</script>
	</body>
</html>
