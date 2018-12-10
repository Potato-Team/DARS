// $(document).ready(generate);
//$(document).ready(loadChart);


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



function generate(){
  var uni = document.getElementById('university').options[document.getElementById('university').selectedIndex].value;
  var yearfrom = document.getElementById('yearfrom').options[document.getElementById('yearfrom').selectedIndex].value;
  var yearto = document.getElementById('yearto').options[document.getElementById('yearto').selectedIndex].value;

  if(new Date(yearfrom,00,00)>new Date(yearto,00,00)){
    alert("Invalid Date");
  }else {
    //document.getElementById('chart-container').innerHTML = "<canvas id=\"bar-chart\" class=\"w3-padding\" height=\"400\" width=\"600\"></canvas>";
    $.ajax({
        url: "./sql/retriveUniYearWise.php",
        method: "GET",
        data: {university: uni, yearfrom: yearfrom, yearto: yearto} ,
        success: function (data){
            var array = JSON.parse(data);
            var value = [];
            var label = [];
            for (var i = 0; i < array.length; i++) {
              label.push(array[i]['Year']);
              value.push(array[i]['Student']);
            }
            loadChart(value, label);
          }
        })
      }
}

function loadChart( data, label){
   var title = "Year Wise Student Distrubution";
   document.getElementById("canvas-container").hidden = false;
   document.getElementById("print").hidden = false;
  var myBarChart = new Chart(document.getElementById("bar-chart"), {
  type: 'line',
  data: {
    labels: label,
    datasets: [{
        borderColor: '#FF6384',
        lineTension: 0,
        backgroundColor: '#FF6384',
        data: data,
        fill: false
      }]
  },
  options: {
    legend: {
    display: false,
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
