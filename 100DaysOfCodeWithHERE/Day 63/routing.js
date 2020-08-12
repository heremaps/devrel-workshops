var circle10Km = new H.map.Circle({lat:52.4571601,lng:13.3806395}, 10000);
// Add the circle to the map:
map.addObject(circle10Km);
map.getViewModel().setLookAtData({
  bounds: circle10Km.getBoundingBox()
});


var routingParams = {
  'mode': 'fastest;car;',
  'start': '52.4571601,13.3806395',
  'range': '900',// 15 x 60 sec
  'rangetype': 'time'
};

// Define a callback function to process the isoline response.
var onResult = function(result) {
  var center = new H.geo.Point(
      result.response.center.latitude,
      result.response.center.longitude),
    isolineCoords = result.response.isoline[0].component[0].shape,
    linestring = new H.geo.LineString(),
    isolinePolygon,
    isolineCenter;

  // Add the returned isoline coordinates to a linestring:
  isolineCoords.forEach(function(coords) {
  linestring.pushLatLngAlt.apply(linestring, coords.split(','));
  });

  // Create a polygon and a marker representing the isoline:
  isolinePolygon = new H.map.Polygon(linestring);
  isolineCenter = new H.map.Marker(center);

  // Add the polygon and marker to the map:
  map.addObjects([isolineCenter, isolinePolygon]);

  // Center and zoom the map so that the whole isoline polygon is
  // in the viewport:
  map.getViewModel().setLookAtData({bounds: isolinePolygon.getBoundingBox()});
};

// Get an instance of the routing service:
var router = platform.getRoutingService();

// Call the Routing API to calculate an isoline:
router.calculateIsoline(
  routingParams,
  onResult,
  function(error) {
  alert(error.message);
  }
);
