<!DOCTYPE html>
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Cache-control" content="no-cache">
		<link rel="stylesheet" type="text/css" href="Css/screen.css">
		<!--<link rel="stylesheet" href="Css/bootstrap.min.css"> 
		<script src="Js/bootstrap.min.js"></script>-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>

  		<script src="https://d3js.org/d3.v4.min.js"></script>
  		<script src="https://d3js.org/d3-selection-multi.v1.min.js"></script>

    	<style type="text/css">
    		#timeseries text{
    			font-size: 14px;
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
			<h1>Spark New Zealand</h1>
		</header>
		<div id="SecEnv">
			<h1>Ticker Name : SPK</h1>
			<h2>Industry : Telecommunction</h2>
			<div id ="desc">
				<p> Spark New Zealand Limited is a supplier of telecommunications and digital ser  vices in New Zealand. The Company operates through three segments: Spark Home, Mobile & Business; Spark Digital, and Spark Connect. The Spark Home, Mobile & Business segment provides fixed line, mobile and Internet services to consumers and the small medium business market, and includes Spark Ventures. The Spark Digital segment integrates information technology (IT) and telecommunications services to provide converged information and communications technology (ICT) solutions for clients. The Spark Connect segment includes its network and IT operations, shared business operations and servicing of wholesale and international customers. The Company provides a range of telecommunications, and ICT products and services, including local, national, international and telephone services; data networks, broadband services and Internet television; IT services and procurement; equipment sales, and installation services.</p>
			</div>
		</div>
		<div id="HomeContent">
			<div id="ActiveContent">
				<div id="ratios">
					<div id="PeRatio">
					
					</div>
					<div id="PeRatio">
					</div>

				</div>
				<div id="encasechart">
					<div id="timeseries"></div>
				</div>
			</div>
		</div>
		<div id="Managmentinfo">
			<h1>Managment Info</h1>
			<div id="Managmentinfocontainer">
  				<div>1</div>
  				<div>2</div>
  				<div>3</div>  
			</div>
		</div>
		
						
					
		
			
	
	</div>
		<script src="Js/Ratio.js"></script>
		<script src="Js/ts.js"></script>


</body>


</html>