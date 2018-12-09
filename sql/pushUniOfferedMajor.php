<?php
require 'connection.php';

$uni = $_GET['university'];
$sch = $_GET['school'];
$major = $_GET['major'];
echo $uni." ".$sch." ".$major;
$sql = "INSERT INTO offeredmajor VALUES(\"".$major."\",\"".$sch."\",\"".$uni."\")";
$conn -> query($sql) or die("Fatal Error");
$conn->close();
echo "{}";
 ?>
