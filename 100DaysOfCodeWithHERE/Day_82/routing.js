function getEVChargingRoute(){
  let url = `https://wse.ls.hereapi.com/2/findsequence.json`+
    `?apiKey=${window.hereCreds.JS_KEY}`+
    `&start=52.53086235,13.38475371`+//Berlin
    `&destination0=52.457213,13.3806209`+// Warsaw
    `&destination1=52.518229,13.315388`+
    `&destination2=52.54830288,13.3634539`+
    `&mode=fastest;car;traffic:disabled`+
    `&improveFor=time`; 
  

  fetch(url)
    .then(response => response.json())
    .then(response => {
       
      // let route = response.response.route[0];
      console.log(response.results);
      let routeGroup = new H.map.Group();

      response.results[0].waypoints.forEach(waypoint => {
          
        let waypointMarker = new H.map.Marker({
          lat:waypoint.lat,
          lng:waypoint.lng 
        });
        waypointMarker.setData("Sequence: "+waypoint.sequence+" "+waypoint.id);
        routeGroup.addObject(waypointMarker);
          
        });

        map.addObject(routeGroup);
        map.getViewPort().setPadding(100, 0, 0, 0);
        map.getViewModel().setLookAtData({
          bounds: routeGroup.getBoundingBox()
        });
        map.getViewPort().setPadding(0, 0, 0, 0);
  
    }, error =>{
      console.error(error);
    });
}

getEVChargingRoute();


