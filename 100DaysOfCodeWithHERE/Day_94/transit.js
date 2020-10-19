function getTransitRoute() {

    let url = "https://transit.router.hereapi.com/v8/stations" +
        "?apiKey=YOUR_API_KEY" +
        "&in=51.50808,-0.07587";

    fetch(url)
        .then(response => response.json())
        .then(response => {

            console.log(response);

            let markerGroup = new H.map.Group();

            response.stations.forEach(station => {
                let marker = new H.map.Marker(station.place.location);
                markerGroup.addObject(marker);
            });

            map.addObject(markerGroup);
            map.getViewModel().setLookAtData({
                bounds: markerGroup.getBoundingBox()
            });

        }, error => {
            console.log.error(error);
        });

}

getTransitRoute();