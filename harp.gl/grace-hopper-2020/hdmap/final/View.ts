/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@here/harp-datasource-protocol";
import { MapControls } from "@here/harp-map-controls";
import { MapView, MapAnchor } from "@here/harp-mapview";
import { VectorTileDataSource } from "@here/harp-vectortile-datasource";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import * as THREE from "three";
import { GeoCoordinates } from '@here/harp-geoutils';
import { Apikey } from '../../apikey';

const defaultTheme = "resources/berlin_tilezen_base.json";

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
            theme: this.theme,
            decoderUrl: "decoder.bundle.js"
        });

        const dataSource = new VectorTileDataSource({
            authenticationCode: Apikey.apiKey,
            maxGeometryHeight: 2000
        });
        //mapView.addDataSource(dataSource);

        // Instantiate a loader
        var loader = new GLTFLoader();

        // Optional: Provide a DRACOLoader instance to decode compressed mesh data
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );


        const anchor = new THREE.Object3D() as MapAnchor<THREE.Object3D>;
        anchor.anchor = new GeoCoordinates(48.32886, 11.70044);
        mapView.mapAnchors.add(anchor);

        loader.load(
            // resource URL
            'https://ghc2020.s3.amazonaws.com/lanes.gltf',
            // called when the resource is loaded
            function ( gltf ) {
                anchor.add(gltf.scene);
                mapView.update();
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' + error );
            }
        );

        loader.load(
            // resource URL
            'https://ghc2020.s3.amazonaws.com/signs.gltf',
            function ( gltf ) {
                anchor.add(gltf.scene);
                mapView.update();
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' + error);
            }
        );

        loader.load(
            // resource URL
            'https://ghc2020.s3.amazonaws.com/poles.gltf',
            // called when the resource is loaded
            function ( gltf ) {
                anchor.add(gltf.scene);
                mapView.update();
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' + error);
            }
        );
        return mapView;
    }
}
