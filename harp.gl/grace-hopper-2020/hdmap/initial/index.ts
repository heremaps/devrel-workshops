/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";
import { MapControls } from '@here/harp-map-controls';
import { MapViewEventNames } from '@here/harp-mapview';

const app = new View({
    canvas: document.getElementById("map") as HTMLCanvasElement
});

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

mapView.lookAt({
    target: new GeoCoordinates(48.33310611297392, 11.693045910653913),
    zoomLevel: 20,
    tilt: 85,
    heading: 80
});

const mapControls = MapControls.create(mapView);
mapControls.maxTiltAngle = 85;

mapView.update();

mapView.addEventListener(MapViewEventNames.MovementFinished, event => {
    console.log('Latitude: '+ event.target.geoCenter.latitude);
    console.log('Longitude: '+ event.target.geoCenter.longitude);
    console.log('Altitude: '+ event.target.geoCenter.altitude);
    console.log('Zoom level: ' +   event.target.zoomLevel);
    console.log('Tilt: ' + event.target.tilt);
    console.log('max tilt value' + mapControls.maxTiltAngle);
    console.log('Heading: '+ event.target.heading);
});
