
function getMatrixRoute(){
  let url = `https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?`+
            `apikey=${window.hereCreds.JS_KEY}`+
            `&mode=fastest;car`+
            `&start0=52.4571601,13.3806395`+
            `&start1=52.530858,13.384744`+
            `&start2=52.50665,13.39162`+
            `&destination0=52.48505,13.47921`+
            `&destination1=52.54345,13.35946`+
            `&matrixAttributes=indices`

  fetch(url)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    }, error =>{
      console.error(error);
    });
}

getMatrixRoute();
