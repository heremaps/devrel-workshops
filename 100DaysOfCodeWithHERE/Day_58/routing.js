let rectangle = new H.map.Rect( H.geo.Rect.fromPoints({"lat":52.47196092299903,"lng":13.376929060418977},{"lat":52.46853475142611,"lng":13.386257162576658}),{
  style:{
    strokeColor:'red',
    fillColor:'rgba(255,0,0,0.5)'
  }
});

map.addObject(rectangle);
// Get an instance of the routing service version 7:
var router = platform.getRoutingService();

// Create the parameters for the routing request:
var routingParameters = {
  waypoint0:"52.4569927,13.380545",
  waypoint1:"52.4805740,13.4303771",
  mode:"fastest;car;traffic:enabled",
  avoidAreas:rectangle.getBoundingBox().getTopLeft().lat+','+
  rectangle.getBoundingBox().getTopLeft().lng+';'+
  rectangle.getBoundingBox().getBottomRight().lat+','+
  rectangle.getBoundingBox().getBottomRight().lng,
  representation: "display"
};
  
// Define a callback function to process the routing response:
var onResult = function(result) {
  console.log(result);
  var colors =["green","orange","yellow","red"]
  result.response.route.forEach(route =>{
    console.log(route);
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
  });

  endMarker = new H.map.Marker({
    lat:route.waypoint[1].mappedPosition.latitude,
    lng:route.waypoint[1].mappedPosition.longitude 
  });

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