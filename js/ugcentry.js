function addToOption(){
  var key = document.getElementById('key');
  var schoolname = document.getElementById('schoolname');
  document.getElementById('school').innerHTML+="<option value=\""+key.value+"\">"+schoolname.value+"</option>";
  key.value="";
  schoolname.value="";
}

function submitData(){
  var uni = document.getElementById('university');
  var year = document.getElementById('year');
  var schools = document.getElementById('school');

  var schArray = new Array(schools.size);

  for (var i = 0; i < schools.size; i++) {
    schArray[i] = new Array(2);
    schArray[i][0] = schools.options[i].value;
    schArray[i][1] = schools.options[i].innerHTML;
  }

  console.log(JSON.stringify(schArray));
}
