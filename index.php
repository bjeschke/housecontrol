<?php

	header('Access-Control-Allow-Origin: *'); 
	
	
	$control = $_GET["control"];
	$value = $_GET["value"];
		
	$init_Temperature = 25;
	$init_Light = 0;
	$init_Curtains = 0;
	
	
	if( isset($control) && (isset($value) && $value != "") ) {
	
		$result = saveValue($control,$value);

		echo $result;
		
	}
	else if( isset($control) && (isset($value) && $value == "") ) {
	
		// For testing purpose, get init Data
	
		$houseControl->control = $control;
		
		if($control == "setTemperature") {
		
			$houseControl->value = $init_Temperature;
			
		}
		else if($control == "setLight") {
		
			$houseControl->value = $init_Light;
			
		}
		else if($control == "setCurtains") {
		
			$houseControl->value = $init_Curtains;
			
		}
			
		$returnJSON = json_encode($houseControl);

		echo $returnJSON;
	
	}
	else {
	
		echo "";
		
	}
	
	
	function saveValue( $control, $value ) {
	
		// TODO: Send Data to Save Method and return saved Data 
	
		$houseControl->control = $control;
		$houseControl->value = $value;

		$returnJSON = json_encode($houseControl);

		return $returnJSON;
	
	}


?>