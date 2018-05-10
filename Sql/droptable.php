<?php
	if(file_exists('con.php')) //Check if connection to database file exist 
		require 'con.php';  // if file exist attempt to connect to db
	else
		echo "404 database"; // if file is missing throw an error 

	$MC = "DROP TABLE MarketCap;";

	$resultCode = @mysqli_query($dbConnect, $MC);

	echo "MarketCap dropped";
	

	

?>