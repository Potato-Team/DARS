<?php
require 'dbToOption.php';
require 'connection.php';

$year = $_GET['year'];

$sql = "SELECT S.csemester_id, S.csemester_name FROM admission A
JOIN semester S ON A.csemester_id = S.csemester_id
WHERE A.dadmission_year=\"".$year."\"";

$result = $conn -> query($sql) or die();

echo dbToOption($result);
 ?>
