import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HereMapComponent } from './here-map/here-map.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @ViewChild("map")
    public mapElement: HereMapComponent;

    public constructor() { }

    public ngOnInit() { }

    public async ngAfterViewInit() {
        let map = this.mapElement;
        let tracy = await map.geocode("Tracy, CA");
        let manteca = await map.geocode("Manteca, CA");
        let modesto = await map.geocode("Modesto, CA");
        map.dropMarker(tracy.Latitude, tracy.Longitude);
        map.dropMarker(manteca.Latitude, manteca.Longitude);
        map.dropMarker(modesto.Latitude, modesto.Longitude);
        map.drawLinesBetweenMarkers();
        map.drawRoute(tracy, modesto);
    }

}
