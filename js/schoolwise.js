

function getUniversity(){
  return document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
}
function getYearFrom(){
  return document.getElementById('yearfrom').options[document.getElementById('yearfrom').selectedIndex].value;
}
function getYearTo(){
  return document.getElementById('yearto').options[document.getElementById('yearto').selectedIndex].value;
}

function print_canvas(){
  var canvas = document.getElementById('bar-chart');

  var win1 = window.open();

  win1.document.write("<br><img class=\"center\" src = '"+canvas.toDataURL('image/png',1.0)+"'/><style media=\"screen\">.center {display: block;margin-left: auto;margin-right: auto; width: 50%;}</style>");
  win1.print();
  win1.location.reload();
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

  if(new Date(getYearFrom(),00,00)>new Date(getYearTo(),00,00)){
    alert("Invalid Date");
  }else {
    document.getElementById('chart-container').innerHTML = "<canvas id=\"bar-chart\" class=\"w3-padding\" height=\"400\" width=\"600\"></canvas>";
    $.ajax({
        url: "./sql/retriveUniSchoolWise.php",
        method: "GET",
        data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo()} ,
        success: function (data){
            document.getElementById("print").hidden = false;
            //console.log(JSON.parse(data));
            loadChart('line', true, JSON.parse(data));
          }
        })
      }
}

function generateGroupedBar(){

  if(new Date(getYearFrom(),00,00)>new Date(getYearTo(),00,00)){
    alert("Invalid Date");
  }else {
    document.getElementById('chart-container').innerHTML = "<canvas id=\"bar-chart\" class=\"w3-padding\" height=\"400\" width=\"600\"></canvas>";
    $.ajax({
        url: "./sql/retriveUniSchoolWise.php",
        method: "GET",
        data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo()} ,
        success: function (data){
            document.getElementById("print").hidden = false;
            //console.log(JSON.parse(data));
            loadChart('bar', false, JSON.parse(data));
          }
        })
      }
      return false;
}

function ranColor() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
  }

function loadChart(type, stacked, array){

  var school = new Array();
  var dataLabel = new Array();
  var dataset = new Array();
  for (var i = 0; i < array.length; i++) {
    for(var key in array[i]){
      school.push(key);
    }
  }

  var temp = array[0][school[0]];
  for (var i = 0; i < temp.length; i++) {
    dataLabel.push(temp[i]['Year']);
  }
  console.log(JSON.stringify(dataLabel));

  for (var i = 0; i < school.length; i++) {
    var temp = array[i][school[i]];
    var truple = new Array();

    for (var j = 0; j < temp.length; j++) {
      truple.push(temp[j]['Student']);
    }
    //console.log(JSON.stringify(truple));
    var color = ranColor();
    dataset.push({
      label: school[i],
      borderColor: color,
      lineTension: 0,
      backgroundColor: color,
      data: truple
    })

  }

  // var data= [458,124,74,787,458];
  // var label=["Africa", "Asia", "Europe", "Latin America", "North America"];
  //  var data2= [458,787,74,124,552];
  //  var label2=["Africa", "Asia", "Europe", "Latin America", "North America"];
   var title = "";
   document.getElementById("canvas-container").hidden = false;
  var myBarChart = new Chart(document.getElementById("bar-chart"), {
  type: type,
  data: {
    labels: dataLabel,
    datasets: dataset
  },
  options: {
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
                        weight: 'bold'
                    },
                    formatter: function(value, context) {
                    return value;
                  }
                  }
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
        url: "./sql/retriveUniSchoolWise.php",
        method: "GET",
        data: {university: getUniversity(), yearfrom: getYearFrom(), yearto: getYearTo()} ,
        success: function (data){
            document.getElementById("print").hidden = true;
            //console.log(JSON.parse(data));
            loadPieChart('pie', false, JSON.parse(data));
          }
        })
      }
      return false;
}

function loadPieChart(type, stacked, array){

  var school = new Array();
  var years = new Array();
  var color = new Array();

  for (var i = 0; i < array.length; i++) {
    for(var key in array[i]){
      school.push(key);
      color.push(ranColor());
    }
  }

  var temp = array[0][school[0]];
  for (var i = 0; i < temp.length; i++) {
    years.push(temp[i]['Year']);
  }

  document.getElementById('chart-container').innerHTML = "";
  for (var i = 0; i < years.length; i++) {
    document.getElementById('chart-container').innerHTML +=
     "<canvas id=\""+(String.fromCharCode(65+i))+"\" class=\"w3-padding w3-display-center\" height=\"400\" width=\"600\"></canvas>";
  }
  for (var i = 0; i < years.length; i++) {
    var values = new Array();
    for (var j = 0; j < school.length; j++) {
      values.push(array[j][school[j]][i]["Student"]);
    }

    var data = [{
      backgroundColor: color,
      data: values
    }];
    pieChart(school, data, String.fromCharCode(65+i), years[i]);
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function pieChart(labels, dataset, id, year){
     var title = "School Wise Distrubution of "+year+"\n\n";
     document.getElementById("canvas-container").hidden = false;
    var myBarChart = new Chart(document.getElementById((id).toString()), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: dataset
    },
    options: {
      layout: {
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
              display: false,
              ticks: {
                  display: true,
                  suggestedMin: 0,
                  beginAtZero: true
              }
          }]
      },
      title: {
        padding: 40,
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
