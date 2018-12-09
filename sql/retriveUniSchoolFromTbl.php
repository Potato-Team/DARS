<?php
require 'dbToOption.php';
require 'connection.php';


$sql = "SELECT S.cschool_id, S.csch_name
FROM school S
WHERE S.cuni_id=\"".$_GET['university']."\"";

$result = $conn -> query($sql) or die();

echo dbToOption($result);
 ?>
