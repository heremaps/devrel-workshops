class HereMap {

    /*
     * Initialize the HERE platform, the geocoding and routing services,
     * and display a map on the screen.
     */
    constructor(appId, appCode, mapElement) {
        this.platform = new H.service.Platform({
            "app_id": appId,
            "app_code": appCode
        });
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            mapElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: 37.7397, lng: -121.4252 }
            }
        );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.geocoder = this.platform.getGeocodingService();
        this.router = this.platform.getRoutingService();
        this.markers = [];
    }

    /*
     * Add a marker to a list of markers for tracking, then display that marker
     * on the map.
     */
    dropMarker(latitude, longitude) {
        this.markers.push(new H.map.Marker({ lat: latitude, lng: longitude }));
        this.map.addObject(this.markers[this.markers.length - 1]);
    }

    /*
     * Loop through the list of markers and draw a polyline between them in order
     * based on their latitude and longitude coordinates.
     */
    drawLinesBetweenMarkers() {
        let lineString = new H.geo.LineString();
        for(let i = 0; i < this.markers.length; i++) {
            lineString.pushPoint(this.markers[i].getPosition());
        }
        this.map.addObject(new H.map.Polyline(
            lineString, { style: { strokeColor: "green", lineWidth: 5 }}
        ));
    }

    /*
     * Geocode a query string and return only the latitude and longitude
     * coordinates. The request is asynchronous, hence the promise.
     */
    geocode(query) {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ searchText: query }, result => {
                if(result.Response.View.length > 0) {
                    if(result.Response.View[0].Result.length > 0) {
                        resolve(result.Response.View[0].Result[0].Location.DisplayPosition);
                    } else {
                        reject({ message: "no results found" });
                    }
                } else {
                    reject({ message: "no results found" });
                }
            }, error => {
                reject(error);
            });
        });
    }

    /*
     * Calculate a route between two point sets and draw lines between them based
     * on every change in the route.
     */
    drawRoute(start, finish) {
        let params = {
            "mode": "fastest;car",
            "waypoint0": "geo!" + start.Latitude + "," + start.Longitude,
            "waypoint1": "geo!" + finish.Latitude + "," + finish.Longitude,
            "representation": "display"
        }
        this.router.calculateRoute(params, data => {
            if(data.response) {
                data = data.response.route[0];
                let lineString = new H.geo.LineString();
                data.shape.forEach(point => {
                    let parts = point.split(",");
                    lineString.pushLatLngAlt(parts[0], parts[1]);
                });
                let routeLine = new H.map.Polyline(lineString, {
                    style: { strokeColor: "blue", lineWidth: 5 }
                });
                this.map.addObjects([routeLine]);
            }
        }, error => {
            console.error(error);
        });
    }

}
