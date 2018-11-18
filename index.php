<?php
  function clearCookies($clearSession = false){
    $past = time() - 3600;
    if ($clearSession === false)
        $sessionId = session_id();
    foreach ($_COOKIE as $key => $value)
    {
        if ($clearSession !== false || $value !== $sessionId)
            setcookie($key, $value, $past, '/');
    }
  }
  if (false) {
    require('login.php');
    getCookie();
  }else {
    if(isset($_GET['uname'])&&isset($_GET['psw'])){
      require('login.php');
      $cookies=false;
      $user = $_GET['uname'];
      $pass = hash('ripemd160',$_GET['psw']);
      if(isset($_GET['remember'])){
        if($_GET['remember']=='on'){
          $cookies=true;
          }
      }
      loginAttempt($user, $pass, $cookies);
    }elseif (isset($_GET['logout'])){
      if($_GET['logout']=='true'){
        echo "<style>
        .alert {
            margin: auto;
            width: 400px;
            padding: 20px;
            background-color: #f44336;
            color: white;
            opacity: 1;
            transition: opacity 0.6s;
            margin-bottom: 15px;
        }

        .alert.info {background-color: #2196F3;}

        .closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .closebtn:hover {
            color: black;
        }</style>
        <body><div class=\"alert info\">
              <span class=\"closebtn\">&times;</span>
              <strong>Logged Out!</strong>
              </div></body>";
        clearCookies();
        include('login.html');
      }
    }else{
      include('login.html');
    }
    if (isset($_GET['attempt'])) {
      if($_GET['attempt']=='false'){
        echo "User Not Found";
      }
    }
  }
 ?>
