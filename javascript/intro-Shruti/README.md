# HERE JavaScript Workshop for Intergeo 2019
Workshop using HERE APIs for Intergeo 2019

[Register here](www.developer.here.com/events/shruti-workshop) for a free developer account</br>
# Generate apikey , app_id and app_code
![Folding in action](https://github.com/kuberaspeaking/Intergeo/blob/master/img/register.gif)

# Start coding!

Open your favourite IDE or a simple code editor like notepad or notepad++

Copy the code below into your editor.

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Smart Cities</title>
<!-- SCRIPTS -->
<meta name="viewport" charset="UTF-8" content="initial-scale=1.0, width=device-width" />
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
<link rel="stylesheet" type="text/css" href="http://js.api.here.com/v3/3.1/mapsjs-ui.css"/>
</head>
<body>
<div id="map" style="width: 100vw; height: 100vh; background: #39B6B3;" ></div> 
<script>
var platform = new H.service.Platform({
  apikey: "{YOUR_APIKEY}"
})

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers()
var MyPos = {lat: 48.69429, lng: 9.1866}
// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('map'),
  defaultLayers.vector.normal.map,
  {
    zoom: 11,
    center: MyPos
  })

var ui = H.ui.UI.createDefault(map, defaultLayers)

var mapEvents = new H.mapevents.MapEvents(map)

var behavior = new H.mapevents.Behavior(mapEvents)
</script>
</body>
</html>
```
# Save the file as HERE_JS_Workshop.html

</br> Double-click on saved file to view on browser

# Adding a position marker using map object of Interactive maps API
Add the following code before </script> tag

```javascript
// create a marker object
posMarker = new H.map.Marker(MyPos)
// Add the marker to the map 
map.addObject(posMarker)
```
</br> Double-click on saved file to view on browser

# Display EV Charging Stations using Places REST API
Add the following code before </script> tag
```javascript
function DisplayEV(){
  let params = {
    "app_id": "{YOUR_APP_ID}",
    "app_code": "{YOUR_APP_CODE}",
    "in":  MyPos.lat + ',' + MyPos.lng +";r=1000000",       // meters
    "cat": "EV-charging-station",
    "size": "500"
  }

  let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&')
  let url = 'https://places.api.here.com/places/v1/browse?' + query


  fetch(url, {
    "method": "GET"
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
    for (i=0; i < response.results.items.length; i++)
      {  
      // resultData[i] = response.results.items[i]
      newpos= {lat: response.results.items[i].position[0], lng: response.results.items[i].position[1]}
      addMarker(newpos)
      // printInfo()
      } 
  })
}
function addMarker(newpos,html){
  // var ev_icon = new H.map.Icon('EV.png')
  ev_marker = new H.map.Marker(newpos)
  map.addObject(ev_marker)
}

DisplayEV()
```
</br> Double-click on saved file to view on browser

# Draw a circle of radius 5 Km using add object of Interactive maps API
Add the following code before </script> tag

```javascript
function drawCircle()
{
var circle = new H.map.Circle(MyPos,5000)
map.addObject(circle)
}

drawCircle()
```
</br> Double-click on saved file to view on browser

# Add isoline routing using isoline of the Routing API
Add the following code before </script> tag

```javascript
var myLoc = MyPos.lat + ',' + MyPos.lng
var routingParams = {
  'mode': 'fastest;car;',
  'start': myLoc,
  'range': '600', // 10 (10x60secs) minutes of driving 
  'rangetype': 'time'
}

// Define a callback function to process the isoline response.
var onResult = function(result) {
  var center = new H.geo.Point(
    result.response.center.latitude,
    result.response.center.longitude),
  isolineCoords = result.response.isoline[0].component[0].shape,
  linestring = new H.geo.LineString(),
  isolinePolygon,
  isolineCenter

  // Add the returned isoline coordinates to a linestring:
  isolineCoords.forEach(function(coords) {
  linestring.pushLatLngAlt.apply(linestring, coords.split(','))
  })

  // Create a polygon and a marker representing the isoline:
  isolinePolygon = new H.map.Polygon(linestring)
//   isolineCenter = new H.map.Marker(center)

  // Add the polygon and marker to the map:
  map.addObject(isolinePolygon)

  // Center and zoom the map so that the whole isoline polygon is
  // in the viewport:
  map.getViewModel().setLookAtData({bounds: isolinePolygon.getBoundingBox()})
}

// Get an instance of the routing service:
var router = platform.getRoutingService()

// Call the Routing API to calculate an isoline:
router.calculateIsoline(
  routingParams,
  onResult,
  function(error) {
  alert(error.message)
  }
);
```
</br> Double-click on saved file to view on browser

Check [final code](/index.html) with modifications

# Contact Information
[![Foo](https://www.gettingstamped.com/wp-content/uploads/2015/02/Twitter-Logo.png)](https://twitter.com/heredev) 
[![Foo](https://dl2.macupdate.com/images/icons128/50617.png?d=1489440003)](https://heredev.slack.com/) 
[![Foo](https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a)](https://stackoverflow.com/questions/tagged/here-api)
[![Foo](http://www.markwk.com/images/github_logo.png)](https://github.com/heremaps)
[![Foo](https://cdn3.iconfinder.com/data/icons/ultimate-social/150/18_email-128.png)](mapcreator@here.com) 

# Watch live webinars and videos

[![Foo](http://howtofilmschool.com/wp-content/uploads/2015/08/twitch-logo-150x150.png)](https://www.twitch.tv/heredev) 
[![Foo](http://logok.org/wp-content/uploads/2014/08/Youtube-logo-2017-150x150.png)](https://www.youtube.com/heremaps) 

# Developer Tutorials and Blogs
[Developer Blog](https://developer.here.com/blog) 
</br>
[Developer Tutorials](https://developer.here.com/tutorials)




