  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          at : '52.5415,13.39316'
      }

      function onResult(result){
        console.log(result);
      }

      geocoder.reverseGeocode(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();