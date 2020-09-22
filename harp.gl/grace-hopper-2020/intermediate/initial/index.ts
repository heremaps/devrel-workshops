/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";
import { MapControls } from '@here/harp-map-controls';

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

// center the camera to New York
mapView.lookAt({target: new GeoCoordinates(48.33360593898094, 11.699101776097852),
    distance: 1500,
    zoomLevel: 17,
    tilt: 80
});

const mapControls = MapControls.create(mapView);
mapControls.maxTiltAngle = 85;

// make sure the map is rendered
mapView.update();
