var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://exp.rw12.net/vatsim/gen_json.php';

var getStations = function(data){
  var items = [];
  for(var i = 0; i < data.length; i++){
    if(data[i][3].toString() == 'ATC'){
      var station_name = data[i][0].toString();
      var freq = data[i][4].toString();
      items.push({
        title:station_name,
        subtitle:freq
      });
    }
  }
  return items;
};

ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    var stations = getStations(data);
    var resultsMenu = new UI.Menu({
    sections: [{
      title: 'VATSIM ATC Stations',
      items: stations
    }]  
  });
  resultsMenu.show();
  },
  function(error) {
    // Failure!
    console.log('Failed fetching data: ' + error);
  });