  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          q : 'star',
          at : '52.491059,13.37917'
      }

      function onResult(result){
        console.log(result);
      }

      geocoder.autosuggest(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();