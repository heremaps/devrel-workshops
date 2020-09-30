var platform = new H.service.Platform({
    'apikey': window.here.apikey
  });
  
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

var myPosition = {lat: 12.9716,lng: 77.5946};

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: myPosition
    });

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);
var mapEvents = new H.mapevents.MapEvents(map);
// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);
// adding map style
var provider = map.getBaseLayer().getProvider();
var style = new H.map.Style('styles/mapStyle.yaml','https://js.api.here.com/v3/3.1/styles/omv/');
provider.setStyle(style);
