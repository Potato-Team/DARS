<?php
require 'dbToOption.php';
require 'connection.php';

$sql = "SELECT cuni_id, cuni_name FROM university";

$result = $conn -> query($sql) or die();

echo dbToOption($result);
 ?>
