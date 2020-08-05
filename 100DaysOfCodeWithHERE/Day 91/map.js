// Step 1: initialize the HERE map platform
// IMPORTANT: Replace the apikey with your own from developer.here.com
var platform = new H.service.Platform({
  apikey: 'YOUR_API_KEY'
});
var defaultLayers = platform.createDefaultLayers();

// Step 2: Initialize the map in the "map" div
// This map is centered on New York, using the default map style
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 40.71, lng: -74.01 },
  zoom: 15,
  pixelRatio: window.devicePixelRatio || 1
});

// Step 4: Add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 5: Enable the event system and add default interactions (e.g., zoom)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 6: Create the default UI components (e.g., zoom buttons)
var ui = H.ui.UI.createDefault(map, defaultLayers);
