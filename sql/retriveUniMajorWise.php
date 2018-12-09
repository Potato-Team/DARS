<?php
require 'connection.php';

$uni = $_GET['university'];

$filter="";
if($_GET['school']!=""){
  if($_GET['school']!='all'){
    $filter = "AND O.cschool_id=\"".$_GET['school']."\"";
  }
}

$yearFilter="";
if($_GET['yearfrom']!="" && $_GET['yearto']!=""){
  $yearFilter = "AND A.dadmission_year>=\"".$_GET['yearfrom']."\"
  AND A.dadmission_year<=\"".$_GET['yearto']."\" ";
}

$school = array();
if($_GET['school']=="all"){
  //Retriving School Names
  $sql = "SELECT cschool_id
  FROM school S
  WHERE S.cschool_id
  IN (SELECT cschool_id
    FROM offeredmajor O
    WHERE O.cuni_id=\"".$uni."\")";

  $result = $conn -> query($sql) or die();
  foreach ($result as $row) {
    $school[] = $row;
  }
}else {
  $school[] =  array('cschool_id' => $_GET['school']);
}
//echo json_encode($school);

$year = array();
//Retriving Year
$sql = "SELECT A.dadmission_year as Year
FROM student S
JOIN admission A ON A.cadmission_id=S.cadmission_id
JOIN offeredmajor O ON S.cmajor_id=O.cmajor_id
WHERE O.cuni_id=\"".$uni."\"".$yearFilter."
GROUP BY A.dadmission_year";
$result = $conn -> query($sql) or die();

foreach ($result as $row) {
  $year[] = $row;
}

//echo json_encode($year);

$dataset = [];
foreach ($year as $row) {

  //$obj = new stdClass;
  $sql = "SELECT O.cmajor_id, count(*) as Student
  FROM student S
  JOIN offeredmajor O ON S.cmajor_id=O.cmajor_id
  JOIN admission A ON A.cadmission_id=S.cadmission_id
  WHERE A.dadmission_year =\"".$row['Year']."\" ".$filter."
  GROUP BY O.cmajor_id";
  $dump = $conn -> query($sql) or die();
  $temp = [];

  foreach ($dump as $row2) {
    $temp[] = $row2;
  }
  $dataset[] = array($row['Year'] => $temp);
}

echo json_encode($dataset);
 ?>
