updateUniversity();

function pushData(){

  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  var major = document.getElementById('major').options[document.getElementById('major').selectedIndex].value;
  var school = document.getElementById('school').options[document.getElementById('school').selectedIndex].value;
  console.log(uni+" "+major+" "+school);

  $.ajax(
   { url: "./sql/pushUniOfferedMajor.php",
   type:"GET",
     data: { university: uni, major:  major, school: school},
    success: function(data){
      retriveData();
      updateMajor();
    }
   });
}

function retriveData(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  $.ajax(
   { url: "./sql/retriveOfferedMajor.php",
   type:"GET",
     data: {id: document.getElementById('id').checked, university: uni},
     success: function(data) {
       document.getElementById('table-container').hidden = false;
       document.getElementById('table').innerHTML = data;
     }
   });
}

function updateUniversity(){

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
}

function updateMajor(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  $.ajax(
   { url: "./sql/retriveUniDistinctMajor.php",
   type:"GET",
    dataType:"text",
     data: {university: uni},
     success: function(data) {

       document.getElementById('major').innerHTML = data;
       document.getElementById("major").selectedIndex = -1;
     }
   });
}

function updateSchoolFromTbl(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  $.ajax(
   { url: "./sql/retriveUniSchoolFromTbl.php",
   type:"GET",
     data: {university: uni},
     success: function(data) {

       document.getElementById("school").innerHTML = data;
       document.getElementById("school").selectedIndex = -1;
     }
   });
}
