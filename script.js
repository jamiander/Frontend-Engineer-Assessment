window.addEventListener("load", function() {
  
  mapboxgl.accessToken = 'pk.eyJ1IjoiamFtaWFuZGVyIiwiYSI6ImNrY3BnMDd1NDBjZHcycm0xanE3eTN1eTIifQ.tFjkEX9kJWXQawtE7Ti9Cw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jamiander/ckcqo45ht02j91imjgie6lzok',
    center: [-94.57, 39.09],
    zoom: 9
  });

  map.addControl(new mapboxgl.NavigationControl());

  //create legend
  map.on('load', function() {
    var layers = ['kc-tracts', 'kc-neighborhoods'];
    var colors = ['#4d65d1', '#d13d3d'];

    for (i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var color = colors[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      var value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    }
});

//
var jsonUrl = ["https://raw.githubusercontent.com/jamiander/interview/master/frontend-engineer/kc-neighborhoods.json", "https://raw.githubusercontent.com/jamiander/interview/master/frontend-engineer/kc-tracts.json"];
var chartRender = ['chart', 'chartB'];
chartTitle = ['Commuter Data by Neighborhood', 'Commuter Data by Tract'];

//pull in json data and create arrays 
for (var i = 0; i < 2; i++) {
  var chart = null;
  var title = null;
  var json = (function() {
  var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': jsonUrl[i],
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
  chart = chartRender[i];
  title = chartTitle[i];
  chartArrays(json);
})();

//create arrays
function chartArrays(json) {
  var jsonLen = Object.keys(json.features).length;
  var nhIds = new Array();
  var daData = new Array();
  var dcData = new Array();
  var ptData = new Array();
  var wData = new Array();

  for (var i = 0; i < jsonLen; i++) {
    nhIds.push(json.features[i].properties.id);
    daData.push(json.features[i].properties['pop-commute-drive_alone']);
    dcData.push(json.features[i].properties['pop-commute-drive_carpool']);
    ptData.push(json.features[i].properties['pop-commute-public_transit']);
    wData.push(json.features[i].properties['pop-commute-walk']);
  }

//create charts
Highcharts.chart(chart, {
  chart: {
     type: 'column'
   },
   title: {
    text: title
  },
   plotOptions: {
     series: {
       stacking: 'normal'
     }
   },
   xAxis: {
     categories: nhIds
   },
   series: [
     {name: 'Drive-Alone',
     data: daData
     },
     {name: 'Drive-Carpool',
     data: dcData
     },
     {name: 'Public-Transit',
     data: ptData
     },
     {name: 'Walk',
     data: wData
     }
   ]
 })
}
}
});



/*var json2 = (function() {
  var json2 = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "https://raw.githubusercontent.com/jamiander/interview/master/frontend-engineer/kc-tracts.json",
    'dataType': "json",
    'success': function(data) {
      json2 = data;
    }
  });
  return json2;
})();

var jsonLen = Object.keys(json2.features).length;
var tractIds = new Array();
var tractDaData = new Array();
var tractDcData = new Array();
var tractPtData = new Array();
var tractWData = new Array();

for (var i = 0; i < jsonLen; i++) {
  tractIds.push(json2.features[i].properties.id);
  tractDaData.push(json2.features[i].properties['pop-commute-drive_alone']);
  tractDcData.push(json2.features[i].properties['pop-commute-drive_carpool']);
  tractPtData.push(json2.features[i].properties['pop-commute-public_transit']);
  tractWData.push(json2.features[i].properties['pop-commute-walk']);
}



//create charts
Highcharts.chart('chart', {
  chart: {
     type: 'column'
   },
   title: {
    text: 'Commuter Data by Neighborhood'
},
   plotOptions: {
     series: {
       stacking: 'normal'
     }
   },
   xAxis: {
     categories: nhIds
   },
   series: [
     {name: 'Drive-Alone',
     data: daData
     },
     {name: 'Drive-Carpool',
     data: dcData
     },
     {name: 'Public-Transit',
     data: ptData
     },
     {name: 'Walk',
     data: wData
     }
   ]

 })


Highcharts.chart('chartB', {
chart: {
    type: 'column'
  },
  plotOptions: {
    series: {
      stacking: 'normal'
    }
  },
  xAxis: {
    categories: tractIds
  },
  series: [
    {name: 'Drive-Alone',
    data: tractDaData
    },
    {name: 'Drive-Carpool',
    data: tractDcData,
    },
    {name: 'Public-Transit',
    data: tractPtData,
    },
    {name: 'Walk',
    data: tractWData,
    }
  ]

 })*/

 


