
function getEVChargingRoute(){
  let url = `https://fleet.ls.hereapi.com/2/calculateroute.json`+
    `?apikey=${window.hereCreds.JS_KEY}`+
    `&waypoint0=52.53086235,13.38475371`+//HERE Berlin
    `&waypoint1=52.45709,13.38059`+//my Location
    `&mode=fastest;car;traffic:disabled`+
    `&routeAttributes=shape`;
  

  fetch(url)
    .then(response => response.json())
    .then(response => {
      
       
      let route = response.response.route[0];
      if(route){

        let routeShape = route.shape,
        polyline,
        routeGroup = new H.map.Group();

        var lineString = new H.geo.LineString.fromLatLngArray(routeShape);

        polyline = new H.map.Polyline(lineString, {
          style: {
            lineWidth: 4,
            strokeColor: "blue"
          }
        });

        routeGroup.addObject(polyline);

        route.waypoint.forEach(waypoint => {
          let startMarker = new H.map.Marker({
            lat:waypoint.mappedPosition.latitude,
            lng:waypoint.mappedPosition.longitude 
          },{icon:(new H.map.Icon('img/start.png'))});
          routeGroup.addObject(startMarker);

        });

        map.addObject(routeGroup);

        searchCorridor(routeShape);

      }
    }, error =>{
      console.error(error);
    });
}

getEVChargingRoute();

function searchCorridor(corridor){
  let searchUrl = `https://fleet.ls.hereapi.com/1//search/corridor.json`+
    `?apiKey=${window.hereCreds.JS_KEY}`+
    `&corridor=${corridor}`+//
    `&radius=500`+// in meters
    `&layer_ids=EVCHARGING_POI`+
    `&key_attributes=POI_ID`;

  fetch(searchUrl)
  .then(result => result.json())
  .then(result => {
    displayEV(result);
  }, err =>{
    console.error(err);
  });

}

function displayEV(result){
  if(result.geometries){
    let evGroup = new H.map.Group();
    result.geometries.forEach(ev =>{
      let evMarker = new H.map.Marker({
        lat:ev.nearestLat,
        lng:ev.nearestLon 
      },{icon:(new H.map.Icon('img/EVCharging.png'))});
      evGroup.addObject(evMarker);
      evMarker.setData("Distance from route: "+ev.distance+" m");
    });
    map.addObject(evGroup);

    map.getViewPort().setPadding(100, 0, 0, 0);
    map.getViewModel().setLookAtData({
      bounds: evGroup.getBoundingBox()
    });
    map.getViewPort().setPadding(0, 0, 0, 0);

    }

}


