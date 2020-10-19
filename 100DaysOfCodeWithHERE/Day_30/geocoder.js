  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          q : 'star',
          in : 'bbox:13.3817,52.50474,13.40432,52.51647'
      }

      function onResult(result){
        console.log(result);
      }

      geocoder.autosuggest(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();