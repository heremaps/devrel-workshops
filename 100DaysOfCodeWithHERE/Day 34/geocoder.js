  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          id : 'here:pds:place:276aabd1-9fd829e3684d05b86f7ddb1f3f83924c'
      }

      function onResult(result){
        console.log(result);
      }

      geocoder.lookup(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();