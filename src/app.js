var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://exp.rw12.net/vatsim/gen_json.php';

var getStationList = function(data){
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
    var stations = getStationList(data);
    var resultsMenu = new UI.Menu({
    sections: [{
      title: 'VATSIM ATC Stations',
      items: stations
    }]  
  });
  resultsMenu.show();
  resultsMenu.on('select', function(e){
    if(data[e.itemIndex][3].toString() == 'ATC'){
    var controller = data[e.itemIndex][0];
    var detailCard = new UI.Card({
    title:controller,
    subtitle:'sub',
    body:'body'
    });
      detailCard.show();
    }
  });
  },
  function(error) {
    // Failure!
    console.log('Failed fetching data: ' + error);
  });