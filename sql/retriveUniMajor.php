<?php
require 'dbToOption.php';
require 'connection.php';


$filter = "";
if(isset($_GET['university'])){
  $uni = $_GET['university'];
  $filter = " JOIN offeredmajor O ON O.cmajor_id=M.cmajor_id WHERE O.cuni_id = \"".$uni."\"";
}

$sql = "SELECT M.cmajor_id, M.cmajor_name as Major
FROM major M".$filter;

$result = $conn -> query($sql) or die();

echo dbToOption($result);
 ?>
