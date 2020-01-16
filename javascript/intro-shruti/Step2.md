


# Display EV Charging Stations using Places REST API
Add the following code before </script> tag
```javascript
            function displayEV(){
                let params = {
                    "apiKey": "YOUR_REST_APIKEY",
                    "in":  myPos.lat + ',' + myPos.lng +";r=10000",       // meters
                    "cat": "EV-charging-station",
                    "size": "500"
                };

                let query = Object.keys(params)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                    .join('&');

                let url = 'https://places.ls.hereapi.com/places/v1/browse?' + query;


                fetch(url, {
                    "method": "GET"
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    // create a marker object
                    for (i=0; i < response.results.items.length; i++){  
                        newPos= ({lat: response.results.items[i].position[0], lng: response.results.items[i].position[1]});
                        addMarker(newPos);
                    } 
                })
            }

            function addMarker(newpos){
                evMarker = new H.map.Marker(newPos);
                map.addObject(evMarker)
            }

            displayEV();
```
</br> Double-click on saved file to view on browser

[![Foo](https://github.com/kuberaspeaking/HERE-JS-workshop/blob/master/img/s3.png)](https://github.com/kuberaspeaking/HERE-JS-workshop/blob/master/Step3.md) 

