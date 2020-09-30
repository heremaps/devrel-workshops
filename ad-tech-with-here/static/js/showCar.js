

function inFence(latlng){

    let geofenceURL ='https://YOUR_GEOFENCE_ENDPOINT.amazonaws.com/Prod/search/proximity.json' 
    let layer_ids = 'SHOES';
    let key_attributes = 'NAME'
    let radius = '100'
    let url = `${geofenceURL}?layer_ids=${layer_ids}&proximity=${latlng.lat},${latlng.lng},${radius}&key_attributes=${key_attributes}`

    fetch(url,{
        method:'GET'
    })
    .then(response => response.json())
    .then(response => {
        offerGroup.removeAll();
        if(response.geometries.length > 0){
            
            response.geometries.forEach(store=>{
                let storeName = store.attributes.NAME;

                let marker = new H.map.DomMarker(
                    stores[storeName],
                    {
                        icon: createSvgMarkerIconWithImg("20% off at "+storeName)
                    });
                    offerGroup.addObject(marker);

                console.log(storeName,stores[storeName]);
            })
            
        }
    })
    .catch(error=> console.log(error))

}

function refreshDt(latlng){
    carGroup.removeAll();
   let marker = new H.map.Marker(latlng,{icon:carIcon});
   carGroup.addObject(marker);
   inFence(latlng);
}

async function refreshDtsct(){

    let url= 'http://127.0.0.1:5000/getlatlng'
    // async await

    const latlng = await (await fetch(url,{
        method: 'GET'
    })
    .catch(err =>{console.log(err);}))
    .json();
    // console.log(latlng)
    refreshDt(latlng)
};

refreshDtsct();

setInterval(_ => {
    refreshDtsct()
}, 5000);