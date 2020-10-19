  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          q : 'markets',
          in : 'circle:52.49105,13.37917;r=1000'
      }

      function onResult(result){
        //   console.log(result);
        result.items.forEach(item => {
            ui.addBubble(new H.ui.InfoBubble( item.position, {
                content: 'distance: '+item.distance+' m'
            }));
        });

      }

      geocoder.discover(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();