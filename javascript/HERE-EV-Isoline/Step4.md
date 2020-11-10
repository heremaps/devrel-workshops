
# Add isoline routing using isoline of the Routing API
Add the following code before </script> tag

```javascript
                function drawIsoline(){
                    // Get an instance of the routing service:
                    var router = platform.getRoutingService();
                    //  Define Isoline routing parameters
                    var routingParams = {
                        'mode': 'fastest;car;',
                        'start': myPos.lat + ',' + myPos.lng,
                        'range': '600', // 10 (10x60secs) minutes of driving 
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
                            linestring.pushLatLngAlt.apply(linestring, coords.split(','))
                        })

                        // Create a polygon and a marker representing the isoline:
                        isolinePolygon = new H.map.Polygon(linestring);
                        //   isolineCenter = new H.map.Marker(center)

                        // Add the polygon and marker to the map:
                        map.addObject(isolinePolygon);

                        // Center and zoom the map so that the whole isoline polygon is
                        // in the viewport:

                        map.getViewModel().setLookAtData({bounds: isolinePolygon.getBoundingBox()});
                    }

                    // Call the Routing API to calculate an isoline:
                    router.calculateIsoline(routingParams,onResult,function(error) {
                        alert(error.message);
                        }
                    );
                }

                drawIsoline();
```
</br>Save file to view the changes

[![Foo](img/s5.png)](Step5.md)

