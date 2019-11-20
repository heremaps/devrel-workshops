


# Display EV Charging Stations using Places REST API
Add the following code before </script> tag
```javascript
      function displayEV(){
        let params = {
          "app_id": "{YOUR_APP_ID}",
          "app_code": "{YOUR_APP_CODE}",
          "in":  myPos.lat + ',' + myPos.lng +";r=1000000",       // meters
          "cat": "EV-charging-station",
          "size": "500"
          };

        let query = Object.keys(params)
                  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')

        let url = 'https://places.api.here.com/places/v1/browse?' + query


        fetch(url,{
          "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          // create a marker object
          for (i=0; i < response.results.items.length; i++)
            {  
            // resultData[i] = response.results.items[i]
            newPos= ({lat: response.results.items[i].position[0], lng: response.results.items[i].position[1]});
            addMarker(newPos)
            // printInfo()
            } 
        })
      }

      function addMarker(newPos,html){
        var evIcon = new H.map.Icon('img/EV.png');
        var evMarker = new H.map.Marker(newPos,{ icon: evIcon });
        map.addObject(evMarker);
        };

      displayEV();
```
</br> Double-click on saved file to view on browser

[![Foo](https://github.com/kuberaspeaking/HERE-JS-workshop/blob/master/img/s3.png)](https://github.com/kuberaspeaking/HERE-JS-workshop/blob/master/Step3.md) 

