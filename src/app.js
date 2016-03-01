var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var URL = 'http://exp.rw12.net/vatsim/gen_json.php';

var splashWindow = new UI.Window();
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Downloading data\nfrom VATSIM',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'white'
});
splashWindow.add(text);
splashWindow.show();

var getStationList = function(data){
  var menuItems = [];
  for(var i = 0; i < data.length; i++){
    if(data[i][3].toString() == 'ATC'){
      var station_name = data[i][0].toString();
      var freq = data[i][4].toString();
      menuItems.push({
        title:station_name,
        subtitle:freq
      });
    }
  }
  return menuItems;
};

var getStationDetails = function(data){
  var details = [];
  for(var i = 0; i < data.length; i++){
    if(data[i][3].toString() == 'ATC'){
      var station_name = data[i][0].toString();
      var freq = data[i][4].toString();
      var body_text = data[i][35] === null ? '' : data[i][35].toString();
      details.push({
        title: station_name,
        subtitle: freq,
        body: data[i][2].toString()+'\n('+data[i][1].toString()+')\n'+body_text
      });
    }
  }
  return details;
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
  splashWindow.hide();
    
  resultsMenu.on('select', function(e){
    var detailCard = new UI.Card({
    title: getStationDetails(data)[e.itemIndex].title,
    subtitle: getStationDetails(data)[e.itemIndex].subtitle,
    body: getStationDetails(data)[e.itemIndex].body,
    scrollable: true
    });
    detailCard.show();
    splashWindow.hide();
  });
  },
  function(error) {
    // Failure!
    console.log('Failed fetching data: ' + error);
  });