function getTransitRoute() {

    let url = "https://transit.router.hereapi.com/v8/routes" +
        "?apiKey=YOUR_API_KEY" +
        "&origin=1.40464,103.79009" +
        "&destination=1.28675,103.85441" +
        "&return=polyline";

    fetch(url)
        .then(response => response.json())
        .then(response => {

            let routeGroup = new H.map.Group();

            response.routes[0].sections.forEach(section => {

                let lineString = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                var polyline = new H.map.Polyline(lineString, { style: { lineWidth: 10 } });
                routeGroup.addObject(polyline);

            });

            map.addObject(routeGroup);
            map.getViewModel().setLookAtData({
                bounds: routeGroup.getBoundingBox()
            });

        }, error => {
            console.log.error(error);
        });

}

getTransitRoute();