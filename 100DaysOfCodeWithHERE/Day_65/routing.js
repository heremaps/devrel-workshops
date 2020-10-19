
function getMatrixRoute(){
  let url = `https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?`+
            `apikey=${window.hereCreds.JS_KEY}`+
            `&mode=fastest;car`+
            `&start0=52.4571601,13.3806395`+
            `&start1=52.530858,13.384744`+
            `&start2=52.50665,13.39162`+
            `&destination0=52.48505,13.47921`+
            `&destination1=52.54345,13.35946`+
            `&matrixAttributes=indices,summary`+
            `&summaryattributes=routeId`

  fetch(url)
    .then(response => response.json())
    .then(response => {
      console.log(response.response.matrixEntry);
      response.response.matrixEntry.forEach(entry=>{
        // let routeId = entry.summary.routeId; 
        // console.log(entry.summary.routeId,entry.startIndex);
        drawRoute(entry.summary.routeId,entry.startIndex);
      });
    }, error =>{
      console.error(error);
    });
}


function drawRoute(routeID, routeIndex){
  let url = `https://route.ls.hereapi.com/routing/7.2/getroute.json?`+
            `apikey=${window.hereCreds.JS_KEY}`+
            `&routeId=${routeID}`+
            `&representation=display`

  fetch(url)
  .then(response => response.json())
  .then(response => {
    drawPolyline(response,routeIndex);
    // console.log(response);
  }, error =>{
    console.error(error);
  });

}


function drawPolyline(response,routeIndex){

  let route = response.response.route
        var lineString = new H.geo.LineString(),
        routeShape = route.shape,
        polyline,
        startMarker,
        endMarker,
        colors = ["#38d9a9","#cc5de8","#ffa94d"];
      
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
          strokeColor: colors[routeIndex]
        }
      });

      startMarker = new H.map.Marker({
        lat:route.waypoint[0].mappedPosition.latitude,
        lng:route.waypoint[0].mappedPosition.longitude 
      },{icon:new H.map.Icon('img/start.png')});

      endMarker = new H.map.Marker({
        lat:route.waypoint[1].mappedPosition.latitude,
        lng:route.waypoint[1].mappedPosition.longitude 
      },{icon:new H.map.Icon('img/end.png')});

      // Add the polyline to the map
      map.addObjects([polyline,startMarker,endMarker]);
      // And zoom to its bounding rectangle

      map.getViewPort().setPadding(100, 0, 0, 0);
      map.getViewModel().setLookAtData({
        bounds: polyline.getBoundingBox()
      });
      map.getViewPort().setPadding(0, 0, 0, 0);

}

getMatrixRoute();
