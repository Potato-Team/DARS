<?php
require 'dbToOption.php';
require 'connection.php';


$uni = "";
if(isset($_GET['university'])){
  $uni = $_GET['university'];
}

$sql = "SELECT M.cmajor_id, M.cmajor_name as Major
FROM major M
WHERE M.cmajor_id
NOT IN (
  SELECT O.cmajor_id
  FROM offeredmajor O
  WHERE O.cuni_id = \"".$uni."\")";

$result = $conn -> query($sql) or die();

echo dbToOption($result);
 ?>
