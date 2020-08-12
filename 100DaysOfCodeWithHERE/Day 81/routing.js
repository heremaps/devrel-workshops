
function getEVChargingRoute(){
  let url = `https://fleet.ls.hereapi.com/2/calculateroute.json`+
    `?apikey=${window.hereCreds.JS_KEY}`+
    `&waypoint0=52.53086235,13.38475371`+//Berlin
    `&waypoint1=53.13256,17.98909`+// Warsaw
    `&mode=fastest;car;traffic:disabled`+
    `&departure=2020-06-22T15:01:41`+
    `&customConsumptionDetails=speed,0,0.102,10,0.084,30,0.066,50,0.06,70,0.066,100,0.072,120,0.084,140,0.108;ascent,0.4;descent,0.1`+
    `&batteryParameters=initialCharge:15;maxCharge:33;minChargeAtStop:7;chargingStopDepartureCharge:27;chargingCurve:0,45,20,48,23,50,27,40,28,27,30,15,32,5,33,1`+
    `&routeAttributes=shape`+
    `&linkAttributes=-shape`;
  

  fetch(url)
    .then(response => response.json())
    .then(response => {
       
      let route = response.response.route[0];
      console.log(route);
      if(route){
        let routeShape = route.shape,
        polyline,
        routeGroup = new H.map.Group();

        var lineString = new H.geo.LineString.fromLatLngArray(routeShape);

        // lineString.fromLatLngArray(routeShape);
        console.log(lineString);


        polyline = new H.map.Polyline(lineString, {
          style: {
            lineWidth: 4,
            strokeColor: "blue"
          }
        });

        routeGroup.addObject(polyline);

        route.waypoint.forEach(waypoint => {

          if(waypoint.waypointType){
            let chargingMarker = new H.map.Marker({
              lat:waypoint.mappedPosition.latitude,
              lng:waypoint.mappedPosition.longitude 
            },{icon:(new H.map.Icon('img/EVCharging.png'))});
            chargingMarker.setData("Sequence in route: "+waypoint.seqNrOnRoute);
            routeGroup.addObject(chargingMarker);
          }
          else{
            let startMarker = new H.map.Marker({
              lat:waypoint.mappedPosition.latitude,
              lng:waypoint.mappedPosition.longitude 
            },{icon:(new H.map.Icon('img/start.png'))});
            startMarker.setData("Sequence in route: "+waypoint.seqNrOnRoute);
            routeGroup.addObject(startMarker);
          }

        });

        map.addObject(routeGroup);
        map.getViewPort().setPadding(100, 0, 0, 0);
        map.getViewModel().setLookAtData({
          bounds: routeGroup.getBoundingBox()
        });
        map.getViewPort().setPadding(0, 0, 0, 0);
      }
    }, error =>{
      console.error(error);
    });
}

getEVChargingRoute();


