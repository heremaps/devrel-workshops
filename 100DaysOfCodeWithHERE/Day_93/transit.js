function getTransitRoute() {

    let url = "https://transit.router.hereapi.com/v8/routes" +
        "?apiKey=YOUR_API_KEY" +
        "&origin=40.74843,-73.98567" +
        "&destination=40.78193,-73.97239" +
        "&return=polyline,fares" +
        "&modes=-subway" +
        "&changes=2";

    fetch(url)
        .then(response => response.json())
        .then(response => {

            let routeGroup = new H.map.Group();

            response.routes.forEach(route => {
                console.log(route);
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