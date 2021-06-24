<?php
	header( 'Access-Control-Allow-Origin: *');
	echo file_get_contents( 'https://opendata.heilbronn.de/api/3/action/current_package_list_with_resources?limit=400');
?>
