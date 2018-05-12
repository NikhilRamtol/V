<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Cache-control" content="no-cache">
		<link rel="stylesheet" type="text/css" href="Css/screen.css">
		<!--<link rel="stylesheet" href="Css/bootstrap.min.css"> 
		<script src="Js/bootstrap.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>-->
  		<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>

  		<script src="https://d3js.org/d3.v4.min.js"></script>

    	<style type="text/css">
    		 text{
    			font-size: 7px;
    			color: white;
    			text-align: center;
    		}
    		.bar {
  				fill: steelblue;
			}

			.bar:hover {
  				fill: brown;
			}

			.axis--x path {
  				display: none;
  			}
    	</style>
		<title>Ticker</title>
	</head>
	<body>
		<div class="container">
			<header id="headersupport">
				<h1>Stock ticker goes her</h1>
			</header>
			<div id="SecEnv">
				<h1>Ticker Name : Ticker Symbol</h1>
				<h2>Tikcer Industry</h2>
				<div id ="desc">
					<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					 cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, 
					 sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			</div>
			<div id="finfo">
				<div id="ratios">
					<div id="PeRatio">
						<svg width="480" height="250"></svg>-
					</div>
					<div id="EPsRatio"></div>
					<div id="DebtEquity"></div>
					<div id="Liquidity"></div>
					<div id="Ca"></div>
				</div>
				<div id="chart"></div>
			</div>
			
			
		</div>
		<!--<script src="Js/timeseries.js"></script>-->
		<script src="Js/Ratio.js"></script>
	</body>
</html>