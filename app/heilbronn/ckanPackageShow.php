<?php
	header( 'Access-Control-Allow-Origin: *');

	if(!isset($_GET['id'])) {
		echo 'Parameter "id" missing.';
	} else {
		echo file_get_contents( 'https://opendata.heilbronn.de/api/3/action/package_show?id='.$_GET['id']);
	}
?>
