  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          name: 'restaurant',
          at : '52.45722,13.38044',
          categories: '102-000,100-1000-0003'
      }

      function onResult(result){
        console.log(result);
      }

      geocoder.browse(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();