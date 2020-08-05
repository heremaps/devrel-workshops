   // Get an instance of the geocoding service:
   var geocoder = platform.getSearchService();

   function geocodeAndSearch(){

       let geocoderParams = {
           q : 'hauptstraße',
           in: 'countryCode:DEU',
           limit : 5
       }

       function onResult(result){
           console.log(result);
       }

       geocoder.geocode(geocoderParams,onResult,alert);

   }

   geocodeAndSearch();