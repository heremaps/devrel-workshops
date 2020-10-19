
function uploadCustomRoute(){
  let url = `https://fleet.ls.hereapi.com/2/overlays/upload.json`+
    `?apikey=${window.hereCreds.JS_KEY}`+
    `&map_name=OVERLAYIKEA`+
    `&overlay_spec=[{
      "op":"create",
      "shape":[
        [52.46959,13.36809],
          [52.46959,13.36801],
          [52.46960,13.36792],
          [52.46960,13.36781],
          [52.46960,13.36771],
          [52.46961,13.36761],
          [52.46961,13.36751],
          [52.46962,13.36741],
          [52.46962,13.36732]],
      "data":{"NAMES":"IKEA loading Road","TRAVEL_DIRECTION":"B"}
    }]`+
    `&storage=readonly`;
    


  fetch(url)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      
      
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
};

drawCustomRoute();
uploadCustomRoute();

