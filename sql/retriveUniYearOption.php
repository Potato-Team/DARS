<?php
require 'dbToTable.php';
require 'connection.php';

$uni = $_GET['university'];

$sql = "SELECT A.dadmission_year, A.dadmission_year
FROM student S
JOIN admission A ON A.cadmission_id=S.cadmission_id
JOIN offeredmajor O ON O.cmajor_id=S.cmajor_id
WHERE O.cuni_id=\"".$uni."\"
GROUP BY A.dadmission_year";
$result = $conn -> query($sql) or die();
$data = array();

echo dbToTable($result);
 ?>
