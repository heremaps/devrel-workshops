/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";
import { MapAnchor } from "@here/harp-mapview";
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    Points,
    PointsMaterial,
    Vector3,
} from "three";

const app = new View({
    canvas: document.getElementById("map") as HTMLCanvasElement,
});

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

// make sure the map is rendered
mapView.update();

mapView.lookAt({
    target: new GeoCoordinates(40.70398928, -74.01319808),
    zoomLevel: 17,
});

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
    .then((res) => res.json())
    .then((json) => {
        const points = json.points as Point[];

        const p0 = new GeoCoordinates(points[0].lat, points[0].lng, points[0].alt);
        const v0 = mapView.projection.projectPoint(p0, new Vector3());

        mapView.lookAt({ target: p0, zoomLevel: 20 });

        const vector = new Vector3();
        const color = new Color();
        const positions = new Float32Array(points.length * 3);
        const colors = new Float32Array(points.length * 3);
        let offset = 0;
        points.forEach((p) => {
            mapView.projection
                .projectPoint(new GeoCoordinates(p.lat, p.lng, p.alt), vector)
                .sub(v0);

            vector.toArray(positions, offset);

            if (p.c < 100) {
                color.setRGB(p.r / 255, p.g / 255, p.b / 255);
            } else {
                color.setColorName("red");
            }

            color.toArray(colors, offset);

            offset += 3;
        });
        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new BufferAttribute(positions, 3));
        geometry.setAttribute("color", new BufferAttribute(colors, 3));

        const anchor: MapAnchor<Points> = new Points(
            geometry,
            new PointsMaterial({ size: 1, vertexColors: true, sizeAttenuation: true })
        );
        v0.setZ(0);
        anchor.anchor = v0;
        anchor.renderOrder = 10000;
        mapView.mapAnchors.add(anchor);
    });
