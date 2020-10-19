// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Create the parameters for the routing request:
var routingParameters = {
  transportMode:'car',
  routingMode: 'fast',
  origin: '52.4569927,13.380545',
  destination: '52.52407865,13.429371',
  alternatives:3,
  return:'polyline',
  };
  
  // Define a callback function to process the routing response:
var onResult = function(result) {
  console.log(result);
  if (result.routes.length) {
    result.routes.forEach(route =>{
      route.sections.forEach((section) => {
        // Create a linestring to use as a point source for the route line
       let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

       // Create a polyline to display the route:
       let routeLine = new H.map.Polyline(linestring, {
         style: { strokeColor: '#034F84', lineWidth: 3 }
       });

       // Create a marker for the start point:
       let startMarker = new H.map.Marker(section.departure.place.location);

       // Create a marker for the end point:
       let endMarker = new H.map.Marker(section.arrival.place.location);

 
       // Add the route polyline and the two markers to the map:
       map.addObjects([routeLine, startMarker, endMarker]);

       // Set the map's viewport to make the whole route visible:
       map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
       
   });
  });
      
  }
};

var onError = function(error) {
  alert(error.message);
};
  
// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult, onError);