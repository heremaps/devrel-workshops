


# Display EV Charging Stations using Places REST API
Add the following code before </script> tag
```javascript
            function displayEV(){
                 var evIcon = new H.map.Icon('img/EV.png');
                var geocoder = platform.getSearchService();
                let geocoderParams = {
                    at : myPos.lat + ',' + myPos.lng,
                    categories : '700-7600-0322', // Category for EV Charging Station
                  // Find more categories here : https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics-places/introduction.html
                    limit : 100
                }

                function onResult(result){
                        console.log(result);
                        if(result.items){

                            result.items.forEach(item => {
                                let evMarker = new H.map.Marker(item.position,{ icon: evIcon }); 
                                map.addObject(evMarker);
                            });
                        }
                }

                geocoder.browse(geocoderParams,onResult,alert);
            }

            displayEV();
```
</br> Double-click on saved file to view on browser

[![Foo](img/s3.png)](Step3.md)

