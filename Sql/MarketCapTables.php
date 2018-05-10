<?php

$tableName="`MarketCap`";
$country = array("USA","AUS","CHN","HKG","NZL","World");
$Cap = array(32120702650000,1508462800000,8711267220000,4350514610000,94691280000,79214134290000);

if(file_exists('con.php')) //Check if connection to database file exist 
	require 'con.php';  // if file exist attempt to connect to db
else
	echo "404 database"; // if file is missing throw an error 

$checkTable = "SELECT * FROM MarketCap;"; 

$createMCTable = "CREATE TABLE `MarketCap`(
  		`MarketCapName` VARCHAR(50) NOT NULL,
  		`MarketCap` LONG NOT NULL);";  // String to hold create table sql


$resultCode = @mysqli_query($dbConnect, $checkTable);  // check if table exist 

$msg="";

if(!$resultCode){ // if no table create tables
    $resultCode = @mysqli_query($dbConnect, $createMCTable);

 	echo "MarketCap table created";


	for ($i=0; $i < sizeof($country); $i++) { 
		$insertStr = "INSERT INTO `Value`.`MarketCap` (`MarketCapName`, `MarketCap`) VALUES ('$country[$i]',$Cap[$i]);"; // insert string 

		echo $insertStr;

		$queryResult = @mysqli_query($dbConnect, $insertStr) or die("<p>Unable to execute the query.</p>"
   				. "<p>Error code " . mysqli_errno($dbConnect)
    			. ": " . mysqli_error($dbConnect)) . "</p>";
    			$msg = "Submited Succesfully";
    	echo $msg;
	}
}
?>