<?php 
	/* variable to connect to the database */
	$host=$_SERVER['SERVER_NAME'];
	$user ='';
	$pswd ='';
	$dbnm ='';

	if ($host=='localhost'){ // deploy localhost
		$user ='root';
		$dbnm ='Value';
	}else{ 					 //deploy on AUT computer/specail priveledges 
		$host = '';
		$user = '';
		$pswd = '';
		$dbnm = '';
	}

	$dbConnect = @mysqli_connect($host,$user,$pswd,$dbnm); //establish connection to database
	
	if(!$dbConnect && mysqli_connect_error()=="Unknown database 'Value'") { //determine if error is database name/missing
		die('No database by that name exist');	
	}else if(mysqli_connect_error()){                       //determine if error is with incorrect combination of variables
		die('incorrect host,user and password combination');
	}else{
	}
?>