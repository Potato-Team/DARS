$('loginform').submit(function (evt) {
   evt.preventDefault();
}
function chk(){
  console.log("hasdljjasdkjbasdli");
  var uname = document.getElementById('uname');
  var psw = document.getElementById('psw');
  if(uname.value == 'rafikhan'){

  }else {
    document.getElementById('alert').hidden = false;
    document.clear();
  }
}
