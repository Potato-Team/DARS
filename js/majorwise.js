// $(document).ready(generate);
//$(document).ready(loadChart);
function getUniversity(){
  return document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
}
function getSchool(){
  return document.getElementById('school').options[document.getElementById('school').selectedIndex].value;
}
function getYearFrom(){
  return document.getElementById('yearfrom').options[document.getElementById('yearfrom').selectedIndex].value;
}
function getYearTo(){
  return document.getElementById('yearto').options[document.getElementById('yearto').selectedIndex].value;
}

function retriveTableData(){
  $.ajax(
   { url: "./sql/retriveUniMajorWiseTable.php",
   type:"GET",
     dataType:"text",
     data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo(), school: getSchool()},
     success: function(data) {
        document.getElementById("canvas-container").hidden = false;
       document.getElementById('chart-container').innerHTML = "<table id=\"table\" class=\"w3-table w3-striped w3-bordered\" cellspacing=\"50\" align=\"left\"></table>";
       document.getElementById('table').innerHTML = data;
     }
   });
}

function updateYears(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  $.ajax({
      url: "./sql/retriveUniYearTable.php",
      method: "GET",
      data: {university: uni} ,
      success: function (data){
          document.getElementById('yearfrom').innerHTML=data;
          document.getElementById('yearto').innerHTML=data;
          document.getElementById('yearfrom').selectedIndex=-1;
          document.getElementById('yearto').selectedIndex=-1;
        }
      });
}


function generateStackedArea(){

  document.getElementById('chart-container').innerHTML = "<canvas id=\"bar-chart\" class=\"w3-padding\" height=\"400\" width=\"600\"></canvas>";
  $.ajax({
      url: "./sql/retriveUniMajorWise.php",
      method: "GET",
      data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo(), school: getSchool()} ,
      success: function (data){
          loadChart('line', true, JSON.parse(data));
        }
      })
}

function generateGroupedBar(){
  document.getElementById('chart-container').innerHTML = "<canvas id=\"bar-chart\" class=\"w3-padding\" height=\"400\" width=\"600\" ></canvas>";
  $.ajax({
      url: "./sql/retriveUniMajorWise.php",
      method: "GET",
      data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo(), school: getSchool()} ,
      success: function (data){
          console.log(JSON.parse(data));
          loadChart('bar', false, JSON.parse(data));
        }
      })
}

function ranColor() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
  }

function loadChart(type, stacked, array){
  var year = new Array();
  for (var i = 0; i < array.length; i++){
    year.push(Object.keys(array[i]));
  }

  // console.log(JSON.stringify(array));

  var majorSet = new Set();
  for (var i = 0; i < year.length; i++) {
     var row = array[i][year[i]];
     for (var j = 0; j < row.length; j++) {
       majorSet.add(row[j]['cmajor_id']);
     }
  }
  var major = Array.from(majorSet);




  var dataset = new Array();
  for (var i = 0; i < major.length; i++) {
    var labels = major[i];
    var data = new Array();
    var color = ranColor();

    for (var j = 0; j < year.length; j++) {
      var temp2 = array[j][year[j]];

      var val=0;

      for (var k = 0; k < major.length; k++) {
        try {
          if(temp2[k]['cmajor_id'] == major[i]){
            val=temp2[k]['Student'];
          }
        } catch (e) {
        }


      }
      data.push(val);


    }

    dataset.push(
      {
        label: [major[i]],
        borderColor: color,
        lineTension: 0,
        backgroundColor: color,
        data: data
      }
    );


  }



 var title = "";
 document.getElementById("canvas-container").hidden = false;
  var myBarChart = new Chart(document.getElementById("bar-chart"), {
  type: type,
  data: {
    labels: year,
    datasets: dataset
  },
  options: {
    layout: {
        padding: {
            left: 00,
            right: 40,
            top: 0,
            bottom: 0
        }
    },
    legend: {
    display: true,
    position: "bottom",
    labels: {
      boxWidth: 20,
      boxHeight: 2
    }
  },
    title: {
      display: true,
      text: title
    },
    scales: {
  xAxes: [{
              gridLines: {
                  display:false
              }
          }],
  yAxes: [{
              stacked: stacked,
              gridLines: {
                  display:true,
                  drawBorder: false
              },
              ticks: {
              display: true,
              suggestedMin: 0,
              beginAtZero: true
          }
          }]
  },
    plugins: {
                  datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: 'black',
                    display: function(context) {
                        return context.dataset.data[context.dataIndex];
                    },
                    font: {
                        weight: 'bold',
                        size: 10
                    },
                    formatter: function(value, context) {
                    return value;
                  }
                },
                padding: 24
              }
  }
  });

  myBarChart.update();
}

function generatePie(){

  if(new Date(getYearFrom(),00,00)>new Date(getYearTo(),00,00)){
    alert("Invalid Date");
  }else {
    $.ajax({
        url: "./sql/retriveUniMajorWise.php",
        method: "GET",
        data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo(), school: getSchool()} ,
        success: function (data){
            loadPieChart('pie', false, JSON.parse(data));
          }
        })
      }
      return false;
}

function loadPieChart(type, stacked, array){

  var years = new Array();
  for (var i = 0; i < array.length; i++){
    years.push(Object.keys(array[i]));
  }

  // console.log(JSON.stringify(array));


  document.getElementById('chart-container').innerHTML = "";

  for (var i = 0; i < years.length; i++) {
    document.getElementById('chart-container').innerHTML +=
     "<canvas id=\""+(String.fromCharCode(65+i))+"\" class=\"w3-padding w3-display-center\" height=\"400\" width=\"600\"></canvas>";
  }

  for (var i = 0; i < years.length; i++) {

    var values = new Array();
    var color = new Array();
    var majorSet = new Set();

    var row = array[i][years[i]];
    for (var j = 0; j < row.length; j++) {
      majorSet.add(row[j]['cmajor_id']);
    }

    var major = Array.from(majorSet);

    for (var valll in major) {
      color.push(ranColor());
    }
    console.log(JSON.stringify(row));
    for (var k = 0; k < row.length; k++) {
      values.push(row[k]['Student']);
    }

    var data = [{
      backgroundColor: color,
      data: values
    }];
    pieChart(major, data, String.fromCharCode(65+i), years[i]);
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function pieChart(labels, dataset, id, year){
     var title = "Major Wise Distrubution of "+year+"\n\n";
     document.getElementById("canvas-container").hidden = false;
    var myBarChart = new Chart(document.getElementById((id).toString()), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: dataset
    },
    options: {layout: {
      padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 40
      }
  },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20,
          boxHeight: 2
        }
      },
      scales: {
          yAxes: [{
              display: true,
              ticks: {
                  display: true,
                  suggestedMin: 0,
                  beginAtZero: true
              }
          }]
      },
      title: {
        padding: 20,
        display: true,
        text: title,
        fontSize: 20,
      },
      plugins: {
                    datalabels: {
                      anchor: 'end',
                      align: 'end',
                      color: 'black',
                      display: function(context) {
                          return context.dataset.data[context.dataIndex];
                      },
                      font: {
                          weight: 'bold'
                      },
                      formatter: function(value, context) {
                      return value;
                    }
                    }
                },
                responsive: true
    }
    });

    myBarChart.update();
  }


function updateSchool(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  document.getElementById("school").innerHTML = "";

  $.ajax(
   { url: "./sql/retriveUniSchool.php",
   type:"GET",
     dataType:"text",
     data: { university: uni },
     success: function(data) {

       document.getElementById("school").innerHTML = data;
       if(document.getElementById("school").length >0){
         document.getElementById("school").innerHTML += "<option value=\"all\">All</option>";
        }
       document.getElementById("school").selectedIndex = 4;
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
