<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$lon = $request->lon;
$lat = $request->lat;

//echo"lon = $lon and lat = $lat";

$response = file_get_contents("http://api.open-notify.org/iss-pass.json?lat=$lat&lon=$lon");


echo $response;



?>