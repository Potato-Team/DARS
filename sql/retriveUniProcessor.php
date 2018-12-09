<?php
require 'dbToTable.php';
require 'connection.php';

$sql = "SELECT cstu_id as ID, M.cmajor_name as Major, A.dadmission_year as Year, SE.csemester_name as Semester
from student S
join major M ON S.cmajor_id=M.cmajor_id
JOIN admission A ON A.cadmission_id = S.cadmission_id
JOIN semester SE ON A.csemester_id = SE.csemester_id
";

$result = $conn -> query($sql) or die();

echo dbToTable($result);
 ?>
