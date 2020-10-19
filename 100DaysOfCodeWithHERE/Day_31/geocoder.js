  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          name: 'museum',
          at : '52.45722,13.38044'
      }

      function onResult(result){
        console.log(result);
      }

      geocoder.browse(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();