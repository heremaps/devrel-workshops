  // Get an instance of the geocoding service:
  var geocoder = platform.getSearchService();

  function geocodeAndSearch(){

      let geocoderParams = {
          q : 'invalidenstraße 116, Berlin'
      }

      function onResult(result){
          console.log(result);
          map.addObject(new H.map.Marker(result.items[0].access[0]));
      }

      geocoder.geocode(geocoderParams,onResult,alert);

  }

  geocodeAndSearch();