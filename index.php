<?php
if(isset($_GET['logout'])) {
  if($_GET['logout']=='yes'){
    unset($_COOKIE['user']);
  }
}
if(isset($_COOKIE['user'])){
  echo 'Cookie Found<br>';
  echo $_COOKIE['user'];
  include('login.html');
}else{
  echo 'Cookie Not Found<br>';
include('login.html');
}
 ?>
