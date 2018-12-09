<?php
require 'connection.php';

$uni = $_GET['university'];
$yearfrom = $_GET['yearfrom'];
$yearto = $_GET['yearto'];

$filter="";
if(isset($_GET['school'])&&$_GET['school']!='all'){
  $filter=" AND O.cschool_id = \"".$_GET['school']."\" ";
}

$sql = "SELECT A.dadmission_year as Year
FROM student S
JOIN admission A ON A.cadmission_id=S.cadmission_id
WHERE S.cuni_id=\"".$uni."\"
AND A.dadmission_year>=\"".$yearfrom."\"
AND A.dadmission_year<=\"".$yearto."\"
GROUP BY A.dadmission_year";

$result = $conn -> query($sql) or die();

$years = array();
foreach ($result as $row) {
  $years[] = $row;
}

  $table = array();
foreach ($years as $year) {

  $sql="SELECT S.cmajor_id AS Major, count(*) AS \"".$year['Year']."\"
  FROM student S
  JOIN admission A ON A.cadmission_id=S.cadmission_id
  JOIN offeredmajor O ON O.cmajor_id=S.cmajor_id AND O.cuni_id=S.cuni_id
  WHERE S.cuni_id=\"".$uni."\"
  AND A.dadmission_year=\"".$year['Year']."\"
  ".$filter."
  GROUP BY S.cmajor_id
  ORDER BY O.cmajor_id ASC";

  $result = $conn -> query($sql) or die();

  foreach ($result as $row) {
    $table[] = $row;
  }
}
// echo json_encode($table)."<br><br>";
// echo dbToMajorTable($table);

$data = array();

foreach ($table as $row) {
	$data[] = $row;
}
// echo json_encode($data)."<br><br>";

$majors = array();

foreach ($data as $row) {
  $majors[] = $row['Major'];
}
$majors = array_unique($majors);
$constructTable="<tr>\n<th>Major</th>\n";

foreach ($years as $year) {
  $constructTable = $constructTable."<th>".$year['Year']."</th>\n";
}
$constructTable = $constructTable."<th>AVG</th>\n";
$constructTable = $constructTable."</tr>\n";

$avgRow = array();
$avgRow = array_fill(0, sizeof($years)+1, 0);
foreach ($majors as $major) {
  $constructTable = $constructTable."<tr>\n<td>".$major."</td>\n";
  $avg=0;
  $loop=0;
  foreach ($years as $year) {
    $val = 0;
    foreach ($data as $key) {
      if($key['Major']==$major&&array_key_exists($year["Year"] ,$key) ){
        $val =$key[$year["Year"]];
      }
    }
    $avgRow[$loop]+=$val;
    $loop+=1;
    $constructTable = $constructTable."<td>".$val."</td>\n";
    $avg+=$val;
  }
  $avgRow[$loop]+=$avg/sizeof($years);
  $constructTable = $constructTable."<th>".$avg/sizeof($years)."</th>\n";
  $constructTable = $constructTable."</tr>\n";
}
$constructTable = $constructTable."<tr>\n";
$constructTable = $constructTable."<th>Total</th>\n";
foreach ($avgRow as $tol) {
  $constructTable = $constructTable."<th>".$tol."</th>\n";
}
$constructTable = $constructTable."</tr>\n";
echo $constructTable;


















 ?>
