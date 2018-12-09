<?php

include("./html/mainpanel.html");

if(ISSET($_GET['page'])){
    $page = $_GET['page'];
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
    }else{
      include("./html/home.html");
    }
}else{
  include("./html/home.html");
}

 ?>
