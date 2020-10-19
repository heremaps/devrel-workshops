function getCustomRoute(){
  let url = `https://fleet.ls.hereapi.com/2/calculateroute.json`+
    `?apikey=${window.hereCreds.JS_KEY}`+
    `&overlays=OVERLAYIKEA`+// your overlay name
    `&mode=fastest;truck`+
    `&waypoint0=52.45710,13.38058`+
    `&waypoint1=52.46961,13.36730`+
    `&routeAttributes=shape`;
  //   `&storage=readonly`;
    


  fetch(url)
    .then(result => result.json())
    .then(result => {
      console.log(result);
     


      var route = result.response.route[0];

      

      let routeShape = route.shape;
      if(routeShape.length > 3){

      let string = new H.geo.LineString.fromLatLngArray(routeShape);

      // let string = new H.geo.LineString();

      // routeShape.forEach(function(point) {
      //   var parts = point.split(',');
      //   string.pushLatLngAlt(parts[0], parts[1]);
      // });

      var routeline = new H.map.Polyline(string, { style: {lineWidth: 4 }});

      map.addObject(routeline);

      // map.getViewModel().setPadding(10,0,0);
      // Zoom the map to fit the rectangle:
      map.getViewModel().setLookAtData({bounds: routeline.getBoundingBox()});
      }
      else{
        map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});
        alert("No Route found")

      }    

      

      
    }, error =>{
      console.error(error);
    });
}


function drawCustomRoute(){
  let points = [ 
      {lat:52.46959,lng:13.36809},
      {lat:52.46959,lng:13.36801},
      {lat:52.46960,lng:13.36792},
      {lat:52.46960,lng:13.36781},
      {lat:52.46960,lng:13.36771},
      {lat:52.46961,lng:13.36761},
      {lat:52.46961,lng:13.36751},
      {lat:52.46962,lng:13.36741},
      {lat:52.46962,lng:13.36732}];
   

    var linestring = new H.geo.LineString();
    points.forEach(function(point) {
      linestring.pushPoint(point);
    });

    // Initialize a polyline with the linestring:
    var polyline = new H.map.Polyline(linestring, { style: { strokeColor: "rgba(255,0,0,0.5)", lineWidth: 6 }});

    // Add the polyline to the map:
    map.addObject(polyline);
}

getCustomRoute();
drawCustomRoute();



