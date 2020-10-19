function getTransitRoute() {

    let url = "https://transit.router.hereapi.com/v8/routes" +
        "?apiKey=YOUR_API_KEY" +
        "&origin=52.5214,13.41555" +
        "&destination=52.50715,13.39061" +
        "&return=polyline" +
        "&arrivalTime=2020-07-03T09:00:00" +
        "&alternatives=1";

    fetch(url)
        .then(response => response.json())
        .then(response => {

            let routeGroup = new H.map.Group();

            response.routes.forEach(route => {
                route.sections.forEach(section => {

                    let lineString = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                    var polyline = new H.map.Polyline(lineString, { style: { lineWidth: 10 } });
                    routeGroup.addObject(polyline);

                });
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