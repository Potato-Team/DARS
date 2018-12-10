<?php
require "./sql/connection.php";

$userName = null;
$userModule = null;
$userGroup = null;
$user = null;
$keys = null;

function do_post($url, $data, $optional_headers = null)
{
  $params = array('http' => array(
              'method' => 'POST',
              'content' => $data
            ));
  if ($optional_headers !== null) {
    $params['http']['header'] = $optional_headers;
  }
  $ctx = stream_context_create($params);
  $fp = @fopen($url, 'rb', false, $ctx);
  if (!$fp) {
    throw new Exception("Problem with $url, $php_errormsg");
  }
  $response = @stream_get_contents($fp);
  if ($response === false) {
    throw new Exception("Problem reading data from $url, $php_errormsg");
  }
  return $response;
}

if( isset($_COOKIE['cuser_id']) && isset($_COOKIE['cpsw_hash']) ){
  $uname="";
  $psw="";
  $uname = $_COOKIE['cuser_id'];
  $psw = $_COOKIE['cpsw_hash'];

  $sql = "SELECT U.cuser_id, U.cpsw_hash, U.cuser_name, UG.cuser_group_name, UG.cuser_group_module
  FROM user U JOIN user_group UG ON U.cuser_group_id=UG.cuser_group_id
  WHERE U.cuser_id=\"".$uname."\" AND U.cpsw_hash=\"".$psw."\"";

  $result = $conn -> query($sql) or die("Fatal Error");
  $user = array();
  foreach ($result as $row) {
    $user[] = $row;
  }
  $keys = array_keys($user[0]);
  if($keys!=null){
    foreach ($keys as $key) {
      setcookie($key, $user[0][$key], time() + (86400 * 30), "/");
    }
  }
  $userName = $user[0]['cuser_name'];
  $userGroup = $user[0]['cuser_group_name'];
  $userModule = $user[0]['cuser_group_module'];

}else {
  $uname="";
  $psw="";
  if(isset($_POST['uname'])&&isset($_POST['psw'])){
    $uname = $_POST['uname'];
    $psw = $_POST['psw'];

    $sql = "SELECT U.cuser_id, U.cpsw_hash, U.cuser_name, UG.cuser_group_name, UG.cuser_group_module
    FROM user U JOIN user_group UG ON U.cuser_group_id=UG.cuser_group_id
    WHERE U.cuser_id=\"".$uname."\" AND U.cpsw_hash=\"".hash('ripemd160',$psw,false)."\"";

    $result = $conn -> query($sql) or die("Fatal Error");
    $user = array();
    foreach ($result as $row) {
      $user[] = $row;
    }
    $keys = array_keys($user[0]);
    if($keys!=null){
      foreach ($keys as $key) {
        setcookie($key, $user[0][$key], time() + (86400 * 30), "/");
      }
    }
    $userName = $user[0]['cuser_name'];
    $userGroup = $user[0]['cuser_group_name'];
    $userModule = $user[0]['cuser_group_module'];
  }
}

//setcookie("user", $user, time() + (86400 * 30), "/");
// echo json_encode($keys);

if(isset($userName)&&isset($userGroup)&&isset($userModule)){
  echo "
  <!DOCTYPE html>
  <html>
  <head>
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <script src=\"./3rdparty/w3.js\"></script>
  <script src= \"./3rdparty/jquery.js\"></script>
  <link rel=\"stylesheet\" href=\"./3rdparty/jquery-ui.css\">
  <link rel=\"stylesheet\" href=\"./3rdparty/w3.css\">
  <link rel=\"stylesheet\" href=\"./3rdparty/w3-colors-flat.css\">
  </head>
  <body style=\"width:70%;margin:auto;\">

  <div class=\"w3-bar w3-flat-wet-asphalt w3-card-4\">

  <form  action=\"dashboard.php\" method=\"POST\">
    <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"home\">Home</button>
  </form>
  ";
  if($userModule=="ALL" || $userModule=="INSERT"){
    echo "
    <div class=\"w3-dropdown-hover\">
      <button class=\"w3-button\">University</button>
      <div class=\"w3-dropdown-content w3-bar-block w3-border\">
        <form  action=\"dashboard.php\" method=\"POST\">
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"unientry\">Data Entry</button>
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"unidataview\">Data View</button>
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"uniofferedmajor\">Major Entry</button>
        </form>
      </div>
    </div>
    ";
  }
  if($userModule=="ALL" || $userModule=="VIEW"){
    echo "
    <div class=\"w3-dropdown-hover\">
      <button class=\"w3-button\">University Analysis</button>
      <div class=\"w3-dropdown-content w3-bar-block w3-border\">
        <form  action=\"dashboard.php\" method=\"POST\">
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"yearwise\">Year Wise</button>
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"schoolwise\">School Wise</button>
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"majorwise\">Major Wise</button>
        </form>
      </div>
    </div>
    ";
  }
  if($userModule=="ALL"){
    echo "
    <div class=\"w3-dropdown-hover\">
      <button class=\"w3-button\">UGC</button>
      <div class=\"w3-dropdown-content w3-bar-block w3-border\">
        <form  action=\"dashboard.php\" method=\"POST\">
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"ugcentry\">Data Entry</button>
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"ugcdataview\">Data View</button>
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"ugcchart\">Chart</button>
        </form>
      </div>
    </div>
    ";
  }

  echo "
  <div class=\"w3-dropdown-hover w3-right\">
      <button class=\"w3-button\">".$userName."</button>
      <div class=\"w3-dropdown-content w3-bar-block w3-border\">
        <form  action=\"dashboard.php\" method=\"POST\">
          <button class=\"w3-bar-item w3-button\" type=\"submit\" name=\"page\" value=\"logout\">Logout</button>
        </form>
      </div>
    </div>
    <a class=\"w3-bar-block w3-bar-item  w3-right\">".$userGroup.":</a>
  </div>

  </body>

  <style media=\"screen\">
    @media only screen and (min-width: ) {
      body {
          width:70%;
          margin:auto;
      }
    }
  </style>

  </html>
  ";


  if(ISSET($_POST['page'])){
      $page = $_POST['page'];
      if($page == 'unientry'){
        include("./html/unientry.html");
      }elseif ($page == 'unientry') {
        include("./html/unientry.html");
      }elseif ($page == 'unidataview') {
        include("./html/unidataview.html");
      }elseif ($page == 'uniofferedmajor') {
        include("./html/uniofferedmajor.html");
      }elseif ($page == 'ugcentry') {
        include("./html/ugcentry.html");
      }elseif ($page == 'ugcdataview') {
        include("./html/ugcdataview.html");
      }elseif ($page == 'ugcchart') {
        include("./html/ugcchart.html");
      }elseif ($page == 'yearwise') {
        include("./html/yearwise.html");
      }elseif ($page == 'schoolwise') {
        include("./html/schoolwise.html");
      }elseif ($page == 'majorwise') {
        include("./html/majorwise.html");
      }elseif ($page == 'logout') {
        foreach ($keys as $key) {
          unset($_COOKIE[$key]);
          $res = setcookie($key, "", time()-3600, "/");
        }
        echo "
        <form id=\"myForm\" action=\"./index.php\" method=\"post\">
              echo \'<input type=\"hidden\" name=\"logout\" value=\"true\">';
          </form>
          <script type=\"text/javascript\">
              document.getElementById('myForm').submit();
          </script>
        ";
        // header("Location: ./index.php?logout=true");
        exit();
      }else{
        include("./html/home.html");
      }
  }else{
    include("./html/home.html");
  }
}else{
  echo "
  <form id=\"myForm\" action=\"./index.php\" method=\"post\">
        echo \'<input type=\"hidden\" name=\"attempt\" value=\"false\">';
    </form>
    <script type=\"text/javascript\">
        document.getElementById('myForm').submit();
    </script>
  ";
  // header("Location: ./index.php?attempt=false");
  exit();
}
 ?>
