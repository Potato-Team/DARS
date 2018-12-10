var crow = 1;


function incrementLeadingZeroNumber(leadingZeroString, amountToIncrement){
  var amountOfZerosToAdd = leadingZeroString.length;
  var stringToNumber = (+leadingZeroString);
  var zerosToAdd = new Array(amountOfZerosToAdd + 1).join( '0' );

  var zerosAndNewNumber = zerosToAdd + ( stringToNumber + amountToIncrement )
  var amountToSlice = (-1 * amountOfZerosToAdd)
  var newString = zerosAndNewNumber.slice(amountToSlice)
  return newString
}

function reloadTable(){
    var container = document.getElementById("table-container");
    var content = container.innerHTML;
    container.innerHTML= content;
}

function clickincrement(){
  var opt = document.getElementById('student');
  if(!isNaN(opt.value) && opt.value !=''){
    opt.value = incrementLeadingZeroNumber(opt.value, +1);
  }
}

function increment(){
  var opt = document.getElementById('student');
  if(!isNaN(opt.value) && opt.value !=''){
    opt.value = incrementLeadingZeroNumber(opt.value, +1);
  }
}


function addToTable(){
  var loop = document.getElementById('loop');
  var fieldcheck=false;

  if(document.getElementById('year').value==""){
      var fieldcheck=true;
  }else if (document.getElementById('semester').selectedIndex < 0) {
      var fieldcheck=true;
  }else if (document.getElementById('major').selectedIndex < 0) {
      var fieldcheck=true;
  }

  if (fieldcheck) {
    alert("Make Sure The Fields are Entered Correct");
  }
  else if(loop.value > 1){
    for (var j = 0; j < loop.value; j++){
        addto();
    }
  }else{
    addto();
  }

  reloadTable();
}

function loadcsv(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  var year = document.getElementById('year').value;
  var sem = document.getElementById('semester').options[document.getElementById('semester').selectedIndex].value;
  var csv = document.getElementById('csv').files[0];
  $.ajax({
    url: URL.createObjectURL(csv),
    dataType: "text",
    success: function(data){
      document.getElementById('table-container').hidden = false;
      var dump = data.split(/\r?\n|\r/);
      var table = "";
      for (var i = 1; i < dump.length-1; i++) {
        var cell = dump[i].split(",");
        table += "<tr class=\"item\" id=\""+crow+"\">\n"
        table += "<td><input type=\"checkbox\" value="+crow+"></td>\n";
        table += "<td>"+uni+"</td>";
        table += "<td>"+year+"</td>";
        table += "<td>"+sem+"</td>";
        table += "<td>"+cell[1]+"</td>";
        table += "<td>"+cell[0]+"</td>";
        table += "</tr>\n";
        crow++;
      }
      document.getElementById('table').innerHTML+=table;
    }
  });
}

function addto(){
  var val = [
    document.getElementById('university'),
    document.getElementById('year'),
    document.getElementById('semester'),
    document.getElementById('major'),
    document.getElementById('student')
  ];

  if(document.getElementById('student').value !=''){
    if(isNaN(document.getElementById('student').value)){
      alert("Make Sure Student ID is Correct");
    }else{
      document.getElementById('table-container').hidden = false;
      var table = document.getElementById('table');

        var row = "<tr class=\"item\" id=\""+crow+"\">\n";

        row += "<td><input type=\"checkbox\" value="+crow+"></td>\n";
        for (var i = 0; i < val.length; i++) {
          row += "<td>"+val[i].value+"</td>\n";
        }
        row += "</tr>";
        table.innerHTML += row;

        if(document.getElementById('autoincrement').checked){
          increment();
        }else{
          val[4].value = "";
        }
        crow++;
    }
  }

  window.onbeforeunload = function(){
    return 'Are you sure you want to leave?';
  };
}

function allCheck(){
  var table = document.getElementById('table');
  var chks = table.getElementsByTagName('input');
  for (var i = 1; i < chks.length; i++) {
      chks[i].checked = chks[0].checked;
  }
}

function clearField(){
  document.getElementById('student').value = "";
}

function clearTable(){
  var nodes = document.getElementById('table').childNodes;
  for (var i = 2; i < nodes.length; i++) {
    nodes[i].innerHTML = "";
  }
  crow=1;
}

function deleteSelected(){
  var table = document.getElementById('table');
  var chks = table.getElementsByTagName('input');

  if(document.getElementById('all').checked){
    clearTable();
    document.getElementById('all').checked = false;
  }else{
    console.log(chks.length);
    for (var i = 1; i < chks.length; i++) {
      if(chks[i].checked){
        var d = document.getElementById(String(chks[i].value));
        d.parentNode.removeChild(d);
        i--;
      }
    }
  }
}

function updateMajor(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  $.ajax(
   { url: "./sql/retriveUniMajor.php",
   type:"GET",
     data: { university: uni },
     success: function(data) {

       document.getElementById('major').innerHTML = data;
       document.getElementById('major').selectedIndex = -1;
     }
   });
}

function pushToSql(){
  var myRows = { myRows: [] };

  var $th = $('table th');
  $('table tbody tr').each(function(i, tr){
      var obj = {}, $tds = $(tr).find('td');
      $th.each(function(index, th){
          obj[$(th).text()] = $tds.eq(index).text();
      });
      myRows.myRows.push(obj);
  });

  console.log(JSON.stringify(myRows['myRows']));

  $.ajax(
   {
      url: "./sql/pushUniData.php",
      type:"POST",
      dataType:"text",
      data: { json: JSON.stringify(myRows['myRows'])}
   })
   .done(function(data){
     alert(data);
   })
   .fail(function(data){
     alert(data);
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
