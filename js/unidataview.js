function retriveData(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  var year = document.getElementById('year').options[document.getElementById('year').selectedIndex].value;
  var sem = document.getElementById('semester').options[document.getElementById('semester').selectedIndex].value;
  $.ajax(
   { url: "./sql/retriveUniDataView.php",
   type:"GET",
     dataType:"text",
     data: {university: uni, year: year, semester: sem},
     success: function(data) {
       document.getElementById('table-container').hidden = false;
       document.getElementById('table').innerHTML = data;
     }
   });
}

function updateYear(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  document.getElementById("year").innerHTML = "";

  $.ajax(
   { url: "./sql/retriveUniYearTable.php",
   type:"GET",
     dataType:"text",
     data: { university: uni },
     success: function(data) {

       document.getElementById("year").innerHTML = data;
       if(document.getElementById("year").length >0){
         document.getElementById("year").innerHTML += "<option value=\"all\">All</option>";
        }
       document.getElementById("year").selectedIndex = 3;
     }
   });
}

function updateSemester(){
          var year = document.getElementById('year').value;

          $.ajax(
           { url: "./sql/retriveUniSemester.php",
           type:"GET",
             dataType:"text",
             data: { year: year },
             success: function(data) {
               console.log(data);
               document.getElementById('semester').innerHTML = data;
               document.getElementById("semester").selectedIndex = -1;
               document.getElementById('semester').innerHTML +="<option value=\"all\">All</option>";
             }
           });
        }

$.ajax(
 { url: "./sql/retriveUniName.php",
 type:"GET",
   dataType:"text",
   data: { title: 'the title' },
   success: function(data) {
     document.getElementById('university').innerHTML = data;
     document.getElementById("university").selectedIndex = -1;
   }
 });
