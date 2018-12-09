<?php
require 'dbToOption.php';
require 'connection.php';

$filter = "";
if(isset($_GET['university'])){
  $uni = $_GET['university'];
  $filter = " WHERE S.cschool_id
  IN (SELECT cschool_id
    FROM offeredmajor O
    WHERE O.cuni_id=\"".$uni."\")";
}

$sql = "SELECT S.cschool_id, S.csch_name
FROM school S".$filter;

$result = $conn -> query($sql) or die();

echo dbToOption($result);
 ?>
