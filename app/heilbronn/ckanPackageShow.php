<?php
	header( 'Access-Control-Allow-Origin: *');

	if(!isset($_GET['id'])) {
		echo 'Parameter "id" missing.';
	} else {
<<<<<<< HEAD
		echo file_get_contents( 'http://data.amsterdam.nl/api/3/action/package_show?id='.$_GET['id']);
=======
		echo file_get_contents( 'http://opendata.heilbronn.de/api/3/action/package_show?id='.$_GET['id']);
>>>>>>> c977a20dd1fbb63dd4356e0a6817d0243ce525a5
	}
?>
