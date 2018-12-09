<?php
require 'dbToTable.php';
require 'connection.php';



$filter=" U.cuni_name as University, S.csch_name as School, M.cmajor_name as Major";
$filter2=" ORDER BY U.cuni_name ASC ";
$filter3 = "";
if(isset($_GET['id']) && $_GET['id']=='true' ){
  $filter=" U.cuni_id, S.cschool_id, M.cmajor_id ";
  $filter2=" ORDER BY U.cuni_id ASC ";
}

if( isset($_GET['university']) ){
  $filter3=" WHERE O.cuni_id=\"".$_GET['university']."\" ";
}

$sql = "SELECT".$filter."
from offeredmajor O
JOIN school S ON S.cschool_id=O.cschool_id
JOIN major M ON M.cmajor_id=O.cmajor_id
JOIN university U ON U.cuni_id=O.cuni_id
".$filter3.$filter2."
";

$result = $conn -> query($sql) or die();

echo dbToTable($result);
 ?>
