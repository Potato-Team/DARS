<?php
require 'connection.php';

$uni = $_GET['university'];
$filter="";
if(isset($_GET['yearfrom'])&&isset($_GET['yearto'])){
  $yearfrom = $_GET['yearfrom'];
  $yearto = $_GET['yearto'];
  $filter = "AND A.dadmission_year>=\"".$yearfrom."\"
  AND A.dadmission_year<=\"".$yearto."\" ";
}

$sql = "SELECT A.dadmission_year as Year, count(*) as Student
FROM student S
JOIN admission A ON S.cadmission_id=A.cadmission_id
JOIN offeredmajor O ON O.cmajor_id=S.cmajor_id
WHERE O.cuni_id = \"".$uni."\" "
.$filter.
"GROUP BY A.dadmission_year";

$result = $conn -> query($sql) or die();

$data = array();

foreach ($result as $row) {
  $data[] = $row;
}

echo json_encode($data);
 ?>
