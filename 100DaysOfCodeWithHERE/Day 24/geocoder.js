  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          qq : 'street=hauptstraße;city=Berlin;country=Germany'
      }

      function onResult(result){
          console.log(result);
      }

      geocoder.geocode(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();