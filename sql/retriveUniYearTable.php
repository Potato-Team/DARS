<?php
require 'connection.php';
require 'dbToOption.php';

$uni = $_GET['university'];

$sql = "SELECT A.dadmission_year, A.dadmission_year  as Year
FROM student S
JOIN admission A ON A.cadmission_id=S.cadmission_id
WHERE S.cuni_id=\"".$uni."\"
GROUP BY A.dadmission_year";
$result = $conn -> query($sql) or die("Fatal Error");
echo dbToOption($result);
 ?>
