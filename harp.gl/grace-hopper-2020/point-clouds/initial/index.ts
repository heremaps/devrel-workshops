/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";

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
mapView.lookAt({target: new GeoCoordinates(40.70398928, -74.01319808), zoomLevel:16, tilt: 40});


interface Point {
    lat: number; // latitude
    lng: number; // longitude
    alt: number; // altitude
    c: number; // classification
    r: number; // red
    g: number; // green
    b: number; // blue
}

fetch("https://ghc2020.s3.amazonaws.com/point-cloud.json")
    .then(res => res.json())
    .then(addPointCloud);

function addPointCloud(json: any) {
}