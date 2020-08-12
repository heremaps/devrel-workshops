// Get an instance of the routing service version 7:
var router = platform.getRoutingService();

var routingParameters = {
  waypoint0:"52.53086235,13.38475371",
  waypoint1:"52.1370754,11.6326044",
  mode:"fastest;truck;traffic:enabled",
  truckRestrictionPenalty:'strict',
  trailersCount:1,
  axleCount:4,
  length:20,
  alternatives:3,
  representation: "display", 
};
  
  
// Define a callback function to process the routing response:
var onResult = function(result) {
  console.log(result);
  var colors =["green","orange","yellow","red"]
  result.response.route.forEach(route =>{
  var lineString = new H.geo.LineString(),
    routeShape = route.shape,
    polyline,
    startMarker,
    endMarker;
  
  // Retrieve the mapped positions of the requested waypoints:
  startPoint = route.waypoint[0].mappedPosition;
  endPoint = route.waypoint[1].mappedPosition;

  routeShape.forEach(function(point) {
    var parts = point.split(',');
    lineString.pushLatLngAlt(parts[0], parts[1]);
  });


  polyline = new H.map.Polyline(lineString, {
    style: {
      lineWidth: 4,
      strokeColor: colors[result.response.route.indexOf(route)]
    }
  });

  startMarker = new H.map.Marker({
    lat:route.waypoint[0].mappedPosition.latitude,
    lng:route.waypoint[0].mappedPosition.longitude 
  },{icon:(new H.map.Icon('img/truck.png'))});

  endMarker = new H.map.Marker({
    lat:route.waypoint[1].mappedPosition.latitude,
    lng:route.waypoint[1].mappedPosition.longitude 
  },{icon:(new H.map.Icon('img/end.png'))});

  // Add the polyline to the map
  map.addObjects([polyline,startMarker,endMarker]);
  // And zoom to its bounding rectangle

  map.getViewPort().setPadding(100, 0, 0, 0);
  map.getViewModel().setLookAtData({
    bounds: polyline.getBoundingBox()
  });
  map.getViewPort().setPadding(0, 0, 0, 0);
});
};

var onError = function(error) {
  alert(error.message);
};

router.calculateRoute(routingParameters, onResult, onError);