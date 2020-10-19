 // Initialize platform with JS API KEY
var platform = new H.service.Platform({
    apikey: "YOUR_JS_API_KEY"
});
var mapCenter = {lat: 52.53086, lng: 13.38474};
// initializing default layers for the map
var defaultLayers = platform.createDefaultLayers();
// rendering map within the container on the page
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map, // rendering vector map with NORMAL map view.
    {
        zoom: 11, // Initial zoom level of map
        center: mapCenter // Initial center of map
    });