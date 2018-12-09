<?php
function dbToOption($result){
  $data = array();

	foreach ($result as $row) {
		$data[] = $row;
	}
	$tblheader = array_keys($data[0]);

	$option = "";

	foreach ($data as $row) {
		$option = $option."<option value=\"".$row[$tblheader[0]]."\">";
		$option = $option.$row[$tblheader[1]]."</option>\n";
	}

	return $option;
}
 ?>
