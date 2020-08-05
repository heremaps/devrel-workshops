// Get an instance of the routing service version 7:
var router = platform.getRoutingService();

// Create the parameters for the routing request:
var routingParameters = {
  waypoint0:"52.4569927,13.380545",
  waypoint1:"52.4805740,13.4303771",
  mode:"fastest;publicTransport",
  representation: "display"
  };
  
// Define a callback function to process the routing response:
var onResult = function(result) {
  console.log(result);
  var route = result.response.route[0]; 
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
      lineWidth: 3,
      strokeColor: 'rgba(0, 0, 0, 0.7)',
      lineDash : [1,2]
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
  map.getViewModel().setLookAtData({
    bounds: polyline.getBoundingBox()
  });
};


var onError = function(error) {
  alert(error.message);
};

router.calculateRoute(routingParameters, onResult, onError);