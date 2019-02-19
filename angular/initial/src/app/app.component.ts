import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

// Import Map Component

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
        // Interact with the Map Component...
    }

}
