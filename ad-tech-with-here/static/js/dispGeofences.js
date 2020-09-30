function displayGeofences(){

    let geofenceURL ='https://YOUR_GEOFENCE_ENDPOINT.amazonaws.com/Prod/search/all.json' 
    let layer_id = 'SHOES';
    let url = `${geofenceURL}?layer_id=${layer_id}`;

    fetch(url)
    .then(response=>response.json())
    .then(response=>{

        response.geometries.forEach(element => {
        
            let shape = H.util.wkt.toGeometry(element.geometry);
            geofences.addObject(new H.map.Polygon(shape));
                
        });
        map.getViewModel().setLookAtData({
            bounds: geofences.getBoundingBox(),
            zoom:18,
            tilt: 40,
            heading:190
        });
        
    })
    .catch(error=>console.log(error))

    
}

displayGeofences();