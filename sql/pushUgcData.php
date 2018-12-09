<?php
require 'UGCconnection.php';

$json = $_POST['json'];
//$json = file_get_contents('./lastpushed.json');
$data = json_decode($json, true);

//Storing the file
$myfile = fopen("lastpushed.json", "w") or die("Unable to open file!");
fwrite($myfile, $json);
fclose($myfile);

foreach ($data as $key) {
  if($key['StudentID']!=""){
    $stu_id = $key['StudentID'];
    $uni_id = $key['University'];
    $major_id = $key['Major'];
    $admission_id = strtolower($key['Semester']).$key['Year'];
    $sql = "INSERT INTO student VALUES(\"".$stu_id."\",\"".$major_id."\",\"".$uni_id."\",\"".$admission_id."\")";
    $conn -> query($sql) or die("Fatal Error");
  }
}
$conn->close();
echo "{}";
 ?>
