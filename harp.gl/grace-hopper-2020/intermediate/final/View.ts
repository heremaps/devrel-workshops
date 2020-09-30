/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from '@here/harp-datasource-protocol';
import { MapAnchor, MapView } from '@here/harp-mapview';
import { VectorTileDataSource } from '@here/harp-vectortile-datasource';

import * as THREE from 'three';
import { GeoCoordinates } from '@here/harp-geoutils';
// @ts-ignore
import { Apikey } from '../../apikey';

const defaultTheme = 'resources/berlin_tilezen_base.json';

export interface ViewParameters {
    theme?: string | Theme;
    canvas: HTMLCanvasElement;
}

export class View {
    readonly canvas: HTMLCanvasElement;
    readonly theme: string | Theme;

    readonly mapView: MapView;

    constructor(args: ViewParameters) {
        this.canvas = args.canvas;
        this.theme = args.theme === undefined ? defaultTheme : args.theme;
        this.mapView = this.initialize();
    }

    protected initialize(): MapView {
        const mapView = new MapView({
            canvas: this.canvas,
            decoderUrl: 'decoder.bundle.js',
            theme: {
                extends: 'resources/berlin_tilezen_base.json',
                styles: {
                    // Data driven styling : https://developer.here.com/tutorials/harpgl/#data-driven-styling
                    poles: [
                        {
                            when: ['==', ['geometry-type'], 'Point'],
                            technique: 'circles',
                            color: '#ff00ff',
                            size: 20
                        }
                    ],
                    signs: [
                        {
                            when: ['==', ['geometry-type'], 'Point'],
                            technique: 'squares',
                            color: '#003cff',
                            size: 20
                        }
                    ]
                }
            }
        });

        const dataSource = new VectorTileDataSource({
            authenticationCode: Apikey.apiKey
        });
        mapView.addDataSource(dataSource);

        /*const geoJsonDataPolesProvider = new GeoJsonDataProvider(
            'poles',
            new URL("resources/poles.json", window.location.href),
            {
                workerTilerUrl: decoderUrl
            }
        );
        const polesDataSource = new VectorTileDataSource({
            dataProvider: geoJsonDataPolesProvider,
            name: 'poles',
            styleSetName: 'poles',
            concurrentDecoderScriptUrl: decoderUrl
        });

        mapView.addDataSource(polesDataSource);
        polesDataSource.enabled = true;

        const geoJsonDataSignsProvider = new GeoJsonDataProvider(
            'poles',
            new URL("resources/signs.json", window.location.href),
            {
                workerTilerUrl: decoderUrl
            }
        );

        const signsDataSource = new VectorTileDataSource({
            dataProvider: geoJsonDataSignsProvider,
            name: 'signs',
            styleSetName: 'signs',
            concurrentDecoderScriptUrl: decoderUrl
        });

        mapView.addDataSource(signsDataSource);
        signsDataSource.enabled = true;*/

        fetch("./resources/poles.json")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then(polesData => {
                // iterate through poles data
                polesData.features.forEach(poleFeature => {
                    // Create a 3d Pole using dimensions
                    const pole3DObject = this.createPole(
                        poleFeature.properties.topCrossSectionDiameterCm.dimensionCm / 2,
                        poleFeature.properties.bottomCrossSectionDiameterCm.dimensionCm / 2
                    );

                    const geoCoordinate = new GeoCoordinates(
                        poleFeature.geometry.coordinates[1],
                        poleFeature.geometry.coordinates[0],
                        0
                    );

                    pole3DObject.anchor = geoCoordinate;

                    // Add pole to the map anchors
                    mapView.mapAnchors.add(pole3DObject);
                });
            });

        fetch("./resources/signs.json")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then(signsData => {
                // Iterate through signs data
                signsData.features.forEach(signFeature => {
                    const geoCoordinate = new GeoCoordinates(
                        signFeature.geometry.coordinates[1],
                        signFeature.geometry.coordinates[0],
                        0
                    );

                    if (signFeature.properties && signFeature.properties.shape) {
                        // Create a 3d object
                        const sign3DObject = this.createSignShape(
                            signFeature.properties.shape.shape,
                            signFeature.properties.widthCm.dimensionCm,
                            signFeature.properties.heightCm.dimensionCm,
                            signFeature.properties.heading.angle
                        );

                        if (sign3DObject) {
                            sign3DObject.anchor = geoCoordinate;
                        }

                        // add it to the map anchors
                        mapView.mapAnchors.add(sign3DObject);
                    }
                });

            });

        return mapView;
    }

    // Add 3D objects to the map : https://developer.here.com/tutorials/harpgl/#add-3d-objects-to-the-map
    // Since harp.gl is built upon three.js, you can add any 3D to the map scene, just like you would with any other three.js scene.
    // For more information on three.js scenes and objects, please take a look at the three.js manual.

    protected createPole(topDiameter, bottomDiameter): MapAnchor<THREE.Object3D> {
        const pole = new THREE.Object3D();

        var cylinderGeometry = new THREE.CylinderGeometry(
            topDiameter / 2,
            bottomDiameter / 2,
            60, // height
            50 // radialSegments
        );
        var material = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            metalness: 1,
            roughness: 1
        });

        cylinderGeometry.rotateX((90 * Math.PI) / 180);
        cylinderGeometry.scale(0.1, 0.1, 0.1);

        var cylinder = new THREE.Mesh(cylinderGeometry, material);

        pole.add(cylinder);
        cylinder.renderOrder = 10000;

        return pole;
    }

    protected createSignShape(signShape, width, height, angle) {
        if (signShape === 'RECTANGLE') {
            return this.createRectangularSign(width, height, angle);
        } else if (signShape === 'CIRCLE') {
            return this.createCircularSign(width, height, angle);
        }
    }

    // Create shape of rectangular sign
    protected createRectangularSign(width, height, angle): MapAnchor<THREE.Object3D> {
        const sign = new THREE.Object3D();

        const shape = new THREE.Shape();
        const x = width / 100;
        const y = height / 100;
        shape.moveTo(x, y);
        shape.lineTo(-x, y);
        shape.lineTo(-x, -y);
        shape.lineTo(x, -y);
        let extrudeSettings = {
            steps: 2,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 3,
            bevelSize: 2,
            bevelOffset: 5,
            bevelSegments: 6
        };
        let xRotation = (90 * Math.PI) / 180;
        let zRotation = -(angle * Math.PI) / 180;

        const extrudedGeometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        extrudedGeometry.rotateX(xRotation);
        extrudedGeometry.rotateZ(zRotation);

        var material = new THREE.MeshStandardMaterial({ color: 0xffffff });

        extrudedGeometry.scale(0.1, 0.1, 0.1);
        var box = new THREE.Mesh(extrudedGeometry, material);

        sign.add(box);
        box.renderOrder = 10000;

        return sign;
    }

    // Create shape of a circular sign
    protected createCircularSign(width, height, angle): MapAnchor<THREE.Object3D> {
        const sign = new THREE.Object3D();
        const cylinderBufferGeometry = new THREE.CylinderBufferGeometry(
            width / 10,
            width / 10,
            0.6,
            15,
            1,
            false,
            0,
            6.3
        );
        let zRotation = -(angle * Math.PI) / 180;

        cylinderBufferGeometry.rotateZ(zRotation);

        cylinderBufferGeometry.scale(0.1, 0.1, 0.1);

        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var box = new THREE.Mesh(cylinderBufferGeometry, material);

        sign.add(box);
        box.renderOrder = 10000;

        return sign;
    }

}
