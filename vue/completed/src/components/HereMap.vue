<template>
    <div class="here-map">
        <div ref="map" style="width: 800px; height: 600px"></div>
    </div>
</template>

<script>
    export default {
        name: "HereMap",
        data() {
            return {
                platform: {},
                map: {},
                markers: []
            };
        },
        props: {
            appId: String,
            appCode: String
        },
        created() {
            this.platform = new H.service.Platform({
                "app_id": this.appId,
                "app_code": this.appCode
            });
            this.geocoder = this.platform.getGeocodingService();
            this.router = this.platform.getRoutingService();
        },
        mounted() {
            this.map = new H.Map(
                this.$refs.map,
                this.platform.createDefaultLayers().normal.map,
                {
                    zoom: 10,
                    center: { lat: 37.7397, lng: -121.4252 }
                }
            );
            let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        },
        methods: {
            dropMarker(latitude, longitude) {
                this.markers.push(new H.map.Marker({ lat: latitude, lng: longitude }));
                this.map.addObject(this.markers[this.markers.length - 1]);
            },
            drawLinesBetweenMarkers() {
                let lineString = new H.geo.LineString();
                for(let i = 0; i < this.markers.length; i++) {
                    lineString.pushPoint(this.markers[i].getPosition());
                }
                this.map.addObject(new H.map.Polyline(
                    lineString, { style: { strokeColor: "green", lineWidth: 5 }}
                ));
            },
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
            },
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
    }
</script>

<style scoped></style>
