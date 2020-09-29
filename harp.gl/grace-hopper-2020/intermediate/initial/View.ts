/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from '@here/harp-datasource-protocol';
import { MapAnchor, MapView } from '@here/harp-mapview';
import { GeoJsonDataProvider, VectorTileDataSource } from '@here/harp-vectortile-datasource';

import * as THREE from 'three';
import { GeoCoordinates } from '@here/harp-geoutils';
// @ts-ignore
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
            authenticationCode: Apikey.apiKey
        });
        mapView.addDataSource(dataSource);

        return mapView;
    }
}
