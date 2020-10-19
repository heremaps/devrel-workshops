// Initialize platform with JS API KEY
var platform = new H.service.Platform({
    apikey: "YOUR_JS_API_KEY"
});
// initializing default layers for the map
var defaultLayers = platform.createDefaultLayers();
// rendering map within the container on the page
var map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map, // rendering vector map with NORMAL map view.
        {
            zoom: 11, // Initial zoom level of map
            center: {lat: 52.53086, lng: 13.38474} // Initial center of map
        });

// creating default UI for map
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Add basic map events like pan and zoom 
var mapEvents = new H.mapevents.MapEvents(map);
// Initialize for map behaviour on events
var behavior = new H.mapevents.Behavior(mapEvents);

// adjust tilt and rotation of the map
map.getViewModel().setLookAtData({
tilt: 60,
heading: 90
});

getBrowserPosition();

let positionIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-0.5 -0.5 21 21"><defs/><g><ellipse cx="10" cy="10" rx="10" ry="10" fill="#009900" stroke="#000000" pointer-events="none"/><ellipse cx="10" cy="10" rx="3" ry="3" fill="#ffffff" stroke="#000000" pointer-events="none"/></g></svg>`


function getBrowserPosition(){

    if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log(position.coords);
                let browserPosition = {lat:position.coords.latitude, lng:position.coords.longitude};
                let posIcon = new H.map.Icon(positionIcon);
                let marker = new H.map.Marker(browserPosition,{icon:posIcon});
                map.addObject(marker);
            });
        } else {
            alert("Geolocation is not supported by this browser!");
    }
};
