<?php
require 'connection.php';

$uni = $_GET['university'];

$filter="";
if($_GET['yearfrom']!="" && $_GET['yearto']!=""){
  $yearfrom = $_GET['yearfrom'];
  $yearto = $_GET['yearto'];
  $filter = "AND A.dadmission_year>=\"".$yearfrom."\"
  AND A.dadmission_year<=\"".$yearto."\" ";
}

//Retriving School Names
$sql = "SELECT S.cschool_id
FROM school S
JOIN offeredmajor O ON O.cschool_id=S.cschool_id
WHERE O.cuni_id=\"".$uni."\"
GROUP BY S.cschool_id";
$result = $conn -> query($sql) or die();
$school = array();
foreach ($result as $row) {
  $school[] = $row;
}
//echo json_encode($school);

//Retriving Year
$sql = "SELECT DISTINCT A.dadmission_year as Year
FROM student S
JOIN admission A ON A.cadmission_id=S.cadmission_id
JOIN offeredmajor O ON O.cmajor_id=S.cmajor_id
WHERE O.cuni_id=\"".$uni."\"";
$result = $conn -> query($sql) or die();
$year = array();
foreach ($result as $row) {
  $year[] = $row;
}
//echo json_encode($year);

$dataset = [];
foreach ($school as $row) {

  //$obj = new stdClass;
  $sql = "SELECT A.dadmission_year as Year, count(*) as Student
  FROM student S
  JOIN offeredmajor O ON O.cmajor_id=S.cmajor_id
  JOIN admission A ON A.cadmission_id=S.cadmission_id
  WHERE O.cschool_id =\"".$row['cschool_id']."\" ".$filter."
  GROUP BY A.dadmission_year";
  $dump = $conn -> query($sql) or die();
  $temp = [];

  foreach ($dump as $row2) {
    $temp[] = $row2;
  }
  $dataset[] = array($row['cschool_id'] => $temp);
}

echo json_encode($dataset);
 ?>
