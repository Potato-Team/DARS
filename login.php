<?php
  $uname =  $_GET['uname'];
  $psw = $_GET['psw'];
  $rem = '';
  try {
     $rem = $_GET['remember'];
  } catch (Exception $e) {
    echo $e;
          }
  echo $uname." ".hash('ripemd160',$psw)." ".$rem;
  if($rem == 'on'){
    setcookie('user', $psw." ".hash('ripemd160', $psw),time() + (86400 * 30), "/");
  }
?>
