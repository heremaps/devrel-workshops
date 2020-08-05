
var tollCostCall = `https://fleet.ls.hereapi.com/2/calculateroute.json`+
`?apiKey=${window.hereCreds.JS_KEY}`+
`&waypoint0=52.53086235,13.38475371`+
`&waypoint1=53.13256,17.98909`+
`&mode=fastest;truck;traffic:enabled`+
`&alternatives=3`+
`&legAttributes=none`+
`&routeAttributes=none`+
`&driver_cost=10`+
`&vehicle_cost=0.5`+
`&currency=EUR`+
`&customConsumptionDetails=40t`+
`&fuelType=Diesel`+
`&costPerConsumptionUnit=1.225`;
  
fetch(tollCostCall)
.then(response => response.json())
.then(response => {
  console.log(response);

  response.response.route.forEach(route=>{
    
    document.getElementById("panel").innerHTML += `<br>`+ " Driver Cost: "+route.cost.details.driverCost+ " €"+
    " Vehicle Cost: "+route.cost.details.vehicleCost+ " €"+
    " Energy Cost: "+route.cost.details.energyCost+ " €"+
    " Total Cost: "+route.cost.totalCost+" €";
    
  });

}, error =>{
      console.error(error); 
});