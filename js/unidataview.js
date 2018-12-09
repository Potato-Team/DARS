function retriveData(){
  $.ajax(
   { url: "./sql/retriveOfferedMajor.php",
   type:"GET",
     dataType:"text",
     data: {id:0},
     success: function(data) {
       //console.log(data);
       document.getElementById('table-container').hidden = false;
       document.getElementById('table').innerHTML = data;
     }
   });
}
