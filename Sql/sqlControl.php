<?php

$tableName="`MarketCap`";
$MarketCapName = [];
$MarketCap = [];

$Cap = array(32120702650000,1508462800000,8711267220000,4350514610000,94691280000,79214134290000);

if(file_exists('con.php')) //Check if connection to database file exist 
	require 'con.php';  // if file exist attempt to connect to db
else
	echo "404 database"; // if file is missing throw an error 

$checkTable = "SELECT * FROM MarketCap;"; 

$resultCode = @mysqli_query($dbConnect, $checkTable)or die("<p>Unable to execute the query.</p>"
    . "<p>Error code " . mysqli_errno($dbConnect)
    . ": " . mysqli_error($dbConnect)) . "</p>";// check if table exist 

$msg="";

if(!$resultCode){ // if no table create tables
 	echo "Please run MarketCapTable";
}else{
	while($row = mysqli_fetch_assoc($resultCode)){
		$i=0;
		$MarketCapName[]= $row["MarketCapName"];
      	$MarketCap[]= $row["MarketCap"];
      	$i++;
      	
	}
}
echo '<p>'.$MarketCapName[0].'</php>';

?>


