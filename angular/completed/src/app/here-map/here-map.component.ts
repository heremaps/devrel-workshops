import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

    @ViewChild("map")
    private mapElement: ElementRef;

    @Input("appId")
    private appId: string;

    @Input("appCode")
    private appCode: string;

    private platform: any;
    private map: any;
    private geocoder: any;
    private router: any;
    private markers: any[];

    public constructor() { }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.markers = [];
        this.geocoder = this.platform.getGeocodingService();
        this.router = this.platform.getRoutingService();
    }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: 37.7397, lng: -121.4252 }
            }
        );
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }

    public dropMarker(latitude: number, longitude: number) {
        this.markers.push(new H.map.Marker({ lat: latitude, lng: longitude }));
        this.map.addObject(this.markers[this.markers.length - 1]);
    }

    public drawLinesBetweenMarkers() {
        let lineString = new H.geo.LineString();
        for(let i = 0; i < this.markers.length; i++) {
            lineString.pushPoint(this.markers[i].getPosition());
        }
        this.map.addObject(new H.map.Polyline(
            lineString, { style: { strokeColor: "green", lineWidth: 5 }}
        ));
    }

    public async geocode(query: string): Promise<any> {
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

    public drawRoute(start: any, finish: any) {
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
