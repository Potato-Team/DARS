<?php
  $uname =  $_GET['uname'];
  $psw = $_GET['psw'];
  $rem = '';
  if(isset($_GET['remember'])){
    if($_GET['remember']=='on'){
      setcookie('user', $psw." ".hash('ripemd160', $psw),time() + (86400 * 30), "/");
    }
  }
  echo $uname." ".hash('ripemd160',$psw)." ".$rem;

?>
<form  action="index.php" method="GET">
<button type="submit" name="logout" value="yes">Log out</button>
</form>
