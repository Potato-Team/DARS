<?php
require 'dbToTable.php';
require 'connection.php';

$uni = $_GET['university'];
$year = "";
$sem = "";

if($_GET['year']!="all"){
  $year = " A.dadmission_year=\"".$_GET['year']."\" ";
}
if($_GET['semester']!="all"){
  if($_GET['year']!="all"){
    $sem = " AND SE.csemester_id=\"".$_GET['semester']."\" ";
  }else{
      $sem = " SE.csemester_id=\"".$_GET['semester']."\" ";
  }
}

$filter="";
if($year!=""||$sem!=""){
  $filter=" WHERE ".$year.$sem;
}

$sql = "SELECT S.cstu_id, M.cmajor_name, SE.csemester_name, A.dadmission_year
FROM student S
  JOIN offeredmajor O ON O.cmajor_id=S.cmajor_id
  JOIN admission A ON A.cadmission_id=S.cadmission_id
  JOIN semester SE ON SE.csemester_id=A.csemester_id
  JOIN major M ON M.cmajor_id=O.cmajor_id
  ".$filter;

$result = $conn -> query($sql) or die("Fatal Error");
echo dbToTable($result);
 ?>
