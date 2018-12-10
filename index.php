<?php
   if(isset($_COOKIE['cuser_id'])&&isset($_COOKIE['cpsw_hash'])){
     header("Location: ./dashboard.php");
     exit();
   }elseif (isset($_POST['attempt'])) {
     if($_POST['attempt']=='false'){
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
             <strong>User Not Found!</strong>
             </div></body>";
     }
     require "./html/login.html";
   }elseif (isset($_POST['logout'])){
     if($_POST['logout']=='true'){
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
       require "./html/login.html";
     }
   }else{
     require "./html/login.html";
   }
?>
