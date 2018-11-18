
<?php
  function onSucess(){
    echo "<form  action=\"index.php\" method=\"GET\">
    <button type=\"submit\" name=\"logout\" value=\"true\">Log out</button>
    </form>";
    include('user.html');
  }

  function storeCookie($user,$pass){
    setcookie('uname',$user,time() + (86400 * 30), "/");
    setcookie('psw',$pass,time() + (86400 * 30), "/");
  }

  function getCookie(){
    loginAttempt($_COOKIE['uname'],hash('ripemd160',$_COOKIE['psw']),false);
  }

  function loginAttempt($user, $pass, $cookies){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dars";
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    $sql = "SELECT count(*) as 'found' FROM tbl_user WHERE cuname='$user' AND hpsw='$pass'";
    $result = $conn -> query($sql) or die();
    $data = array();
    foreach ($result as $row) {
      $data[] =  $row;
    }
    echo $result->fetch_assoc();
    if($data[0]['found']==1){
      onSucess();
      if($cookies==true){
        storeCookie($user,$pass);
      }
    }else{
      header('Location: index.php?attempt=false');
    }
  }

?>
