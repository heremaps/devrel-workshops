# Visualizing HERE XYZ Data with harp.gl

Welcome to the OSCON'19 workshop!

This workshop will cover __harp.gl__, a new and beta 3D map rendering engine for the web in combination with __xyz__, a cloud-based, real-time location data management
service that enables developers and map makers to create web maps and manage location data.

![background](img/background.png)

### Workshops hosts

- Dylan Babbs ([Twitter](https://twitter.com/dbabbs) / [Github](https://github.com/dbabbs)) - ask me about XYZ or harp.gl
- Nino Kettlitz. ([Github](https://github.com/ninok)) - ask me about harp.gl
- Oliver Fink. ([Github](https://github.com/olifink)) - ask me about XYZ
- Ignacio Julve Castro. ([Github](https://github.com/musculman)) - ask me about harp.gl

### Feedback

harp.gl is a beta product and we are always looking to improve it with your feedback. For any comments, suggestions, or bug reports, we encourage you to:
- fill out this form: [harp.gl feedback](https://forms.gle/GhTVkruwsReNi3oH7)
- or create an issue on the [harp.gl GitHub repository](https://github.com/heremaps/harp.gl/issues/new)

[xyz](https://explore.xyz.here.com/) has a set of [resources](https://explore.xyz.here.com/resources) that you can explore to get answers to the most common questions you might have, check the tutorials and provide feedback about it.

## Prerequisites

- Laptop with a modern web browser (Chrome, Firefox, Safari, etc.)
- Node and npm installed ([installation directions here](https://nodejs.org/en/download/))

## Resources

### harp.gl resources

* [harp.gl Github repo](https://github.com/heremaps/harp.gl) (Source code for harp.gl)
* [harp.gl documentation](http://harp.gl.s3-website-us-east-1.amazonaws.com/docs/master/doc/)
* [harp.gl examples](http://harp.gl.s3-website-us-east-1.amazonaws.com/docs/master/examples/) (curated list of examples)
* [harp.gl modules on npm](https://www.npmjs.com/~heremaps)

### XYZ Resources

* [HERE XYZ Documentation](https://www.here.xyz/) (documentation for HERE XYZ)
* [XYZ Token Manager](https://xyz.api.here.com/token-ui/index.html) (generate XYZ API Tokens)
* [XYZ Studio](https://explore.xyz.here.com/studio) (XYZ studio where you can manipulate the data)

### Other HERE resources
* [HERE Developer Portal](https://developer.here.com/) (where to sign up as HERE Developer to get access to the APIs)

## Key concepts

Now that you have a base setup of harp.gl, let's review some key concepts.

### MapView

A `MapView` is the high-level main object in harp.gl. This is the object you'll add new layers to or customize the style of. 

### Data source

A data source is a source of data you'll add to the map. Generally, when working with maps, we'll be referring to two different types of data sources:

- __Static data source__: a single object, commonly in the geojson format. Think like a `.json` file or a javascript object.
- __Tiled data source__: a dynamic data source that is broken up into "tiles". These tiles, referenced by parameters `{x}`, `{y}` and `{z}`, are divided by different locations and zoom levels on the map. Tiled data sources are preferred for large data sets because the map only requests data for the current view of the renderer.

[HERE XYZ](https://here.xyz) provides a hosting and tiling service we will be using later on in this workshop. You'll be able to upload large datasets and XYZ will provide and endpoint to access this data using the `{x}`, `{y}` and `{z}` parameters. 

### GeoJSON

GeoJSON is a popular and common format for storing geo data. harp.gl accepts GeoJSON and we will be using this format throughout the workshop.

Generally speaking, there are common types of GeoJSON objects: `Point`, `LineString`, `Polygon`.

An example of a GeoJSON `Point` is:
```json
{
   "type": "Feature",
   "geometry": {
      "type": "Point",
      "coordinates": [125.6, 10.1] 
   },
   "properties": {
      "name": "Dinagat Islands"
   }
}
```
An example of a GeoJSON `LineString` is:
```json
{
   "type": "Feature",
   "geometry": {
      "type": "LineString",
      "coordinates": [
         [100.0, 0.0], [101.0, 1.0]
      ]
   },
   "properties": {
      "name": "The name of a line"
   }
}
```
An example of GeoJSON `Polygon` is:
```json
{
   "type": "Feature",
   "geometry": {
      "type": "Polygon",
      "coordinates": [
         [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
      ]
   },
   "properties": {
      "name": "a polygon for harp.gl!"
   }
}
```

Resources:
- [GeoJSON specification](https://geojson.org/) and [GeoJSON blog post](https://macwright.org/2015/03/23/geojson-second-bite.html) by Tom MacWright
- [GeoJSON Viewer tool](http://geojson.tools/)

_Note: GeoJSON uses the format [Longitude, Latitude] for the coordinate system, while harp.gl uses [Latitude, Longitude]. Be careful not to get these confused!_

### harp.gl style sheets and syntax

harp.gl has its own syntax for styling the map. The styling syntax lives inside a `json` file and contains rules for how the visuals are drawn. For example, in the style sheet, you can specify things like.

- the width for roads
- the background color for water
- the multiplier of the height of 3d buildings

You can take a look at a sample style sheet here: [https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_night_reduced.json](https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_night_reduced.json)

Let's take a look at some example styles. These will be helpful later on when styling data overlayed on a map.

__Style a point__

This technique will style all geometry types that are points with `#7ED321` color and `15` size.

```json
{
   "when": "$geometryType == 'point'",
   "technique": "circles",
   "renderOrder": 10000,
   "attr": {
      "color": "#7ED321",
      "size": 15
   }
}
```

__Style a line__

This technique will style all geometry types that are lines with `blue` color and `1px` width. 

`renderOrder` is the z-index value for the render order. A large number means that the object will show up first.
```json
{
   "when": "$geometryType ^= 'line'",
   "renderOrder": 1000,
   "technique": "solid-line",
   "attr": {
      "color": "blue",
      "opacity": 1,
      "metricUnit": "Pixel",
      "lineWidth": 1
   }
}
```

__Style a polygon__

This technique will style all geometry types that are lines with `#525556` color and `0.8` opacity. 
```json
{
   "when": "$geometryType ^= 'polygon'",
   "technique": "fill",
   "attr": {
      "opacity": 0.8,
      "color": "#525556"
   },
   "renderOrder": 0
}
```

### Projections

Technically, [all maps have been lying to you](https://www.iflscience.com/environment/how-maps-can-lead-you-wrong-idea/). That's because it's difficult to project the spherical earth onto a perfect rectangle.

_Side note: for some fun with mercator projections, check out [The True Size of](https://thetruesize.com/), a cool web app to explore the different sizes of country depending on where they are._

harp.gl provides two different views:

- mercator: the classic and one of the most popular flat projections
- globe: an accurate representation of earth as a sphere, as seen from space.

|Mercator|Globe|
|---|---|
|![mercator](img/mercator.png)|![mercator](img/globe.png)|

### HERE XYZ

We will use XYZ Vector Tile Data for our base maps, by requesting tiles from `https://xyz.api.here.com/tiles/herebase.02`.

Once we have a base map, we will add more data to it by pulling different datasets in GeoJSON from [XYZ Hub](https://explore.xyz.here.com/hub).

Now onto the fun part... making some maps! 🌍

## Acquiring credentials

harp.gl is an open-source and free software project. However, harp.gl needs to be connected to a data source in order to display a map. 

HERE XYZ, another HERE product, is a service for storing and managing geospatial data. HERE XYZ will provide the vector tile data endpoint and authentication for harp.gl as well as additional data to visualize.

### Become a HERE Developer 

Navigate to [developer.here.com/events/oscon](https://developer.here.com/events/oscon) and click __Get started for free__ in the top right. 

Create an account. __No credit card is required__.

### Get an XYZ Token

Once you've created a HERE Developer account, navigate to the to [HERE XYZ Token Manager](https://xyz.api.here.com/token-ui).

Sign in with the HERE account you just created.

You'll want to generate a new token. Select the checkbox under __READ DATA__ and then click __Generate Token__

![token-ui](img/token-ui.png)

Click through the next window until a token has been generated.

__Important__: Copy and paste this token somewhere. You will be using it later in the workshop.


## Section 1: Installing harp.gl

You can get started with harp.gl on the web with two different methods:
- linking a single bundle as a `<script>` tap in your html page
- installing harp.gl as a set of [TypeScript](https://www.typescriptlang.org/) modules through npm

You are free to choose whatever method you please. If you are not familiar with `npm` and `TypeScript` __we recommend method #1__.
If you want to use `TypeScript`, please skip the following section and jump to step #2.

### Method 1: Linking a single `script` bundle to your html (recommended)

In your command line, create a new directory and navigate into it:

```bash
mkdir harp.gl-workshop
cd harp.gl-worshop
```

Create two files: `index.html` and `index.js`:

```bash
touch index.js
touch index.html
```

Copy and paste the following code into each of the files.

__`index.html`__

```html
<html>
   <head>
      <style>
         body, html { border: 0; margin: 0; padding: 0}
         #map { height: 100vh; width: 100vw; }
      </style>
      <script src="https://unpkg.com/three/build/three.min.js"></script>
      <script src="https://unpkg.com/@here/harp.gl/dist/harp.js"></script>
   </head>
   <body>
      <canvas id="map"></canvas>
      <script src="index.js"></script>
   </body>
</html>
```

__`index.js`__
```javascript
const canvas = document.getElementById('map');
const map = new harp.MapView({
   canvas,
   theme: "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_base.json",
   //For tile cache optimization:
   maxVisibleDataSourceTiles: 40, 
   tileCacheSize: 100
});

map.setCameraGeolocationAndZoom(
   new harp.GeoCoordinates(45.5234, -122.6762),
   16
);

const mapControls = new harp.MapControls(map);
const ui = new harp.MapControlsUI(mapControls);
canvas.parentElement.appendChild(ui.domElement);

mapControls.maxPitchAngle = 90;
mapControls.setRotation(6.3, 50);

map.resize(window.innerWidth, window.innerHeight);
window.onresize = () => map.resize(window.innerWidth, window.innerHeight);

const omvDataSource = new harp.OmvDataSource({
   baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
   apiFormat: harp.APIFormat.XYZOMV,
   styleSetName: "tilezen",
   authenticationCode: 'YOUR-XYZ-TOKEN HERE',
});
map.addDataSource(omvDataSource);
```

__NOTE:__ be sure to swap out `YOUR-XYZ-TOKEN-HERE` for the token you obtained from the [XYZ Token Manager](https://xyz.api.here.com/token-ui/).

You can just run it with a simple server, for example in Python 2.x: 
```bash
python -m SimpleHTTPServer 8888
```
and in Python 3.x

```bash
python -m http.server 8888
```

Then navigate to: `localhost:8888`.

### Method 2: Install harp.gl modules through npm

_These instructions are also available on the [harp.gl github repo](https://github.com/heremaps/harp.gl/blob/master/docs/GettingStartedGuide.md)._

```bash
mkdir harp.gl-workshop
cd harp.gl-workshop
npx -p yo -p @here/generator-harp.gl yo @here/harp.gl
```

As the command executes, it will prompt you for some information:
- `package name`: what you would like to name your project
- `access token`: your HERE XYZ token (obtained in the previous step)

Next, run the following commands:

```bash
npm install
npm start
```

A local server will start and you will be able to view the project at `localhost:8081`.

## Section 2: Adding data to the map

__NOTE:__ We will not cover modifying the map and styling it in this workshop, but if you want to learn more about it, please check it out [here](https://developer.here.com/tutorials/harpgl/).

In this section we'll learn how to add data to the map.

As mentioned in the _Key Concepts_ section of this workshop, there are two different types of datasources to add to harp.gl: static and tiled. Static data sources are non-tiled data sources that can be added to the map at once. Tiled data sources come from endpoints that return data only required based on the map's current viewport.
In this workshop, we will focus on adding tiled data coming from XYZ. For an example on adding static data, please check it [here](https://developer.here.com/tutorials/harpgl/).

### 2.1 Adding tiled GeoJSON from a server

For the first exercise, we'll be using a sample data source already uploaded to an XYZ Space.

The data set we'll be adding will be global railroads. The data comes from the [Global Humanitarian Data Exchange](https://data.humdata.org/dataset/global-railways). You can preview the dataset using the [HERE GeoJSON Viewer](http://geojson.tools/index.html?url=https://xyz.api.here.com/hub/spaces/hUJ4ZHJR/search?limit=5000&clientId=cli&access_token=AJXABoLRYHN488wIHnxheik). (The viewer caps out at 500 features, so you won't be able to see all the railroads in this page).

To add tiled data from an XYZ Space, we'll be using the `OmvDataSource` class again. `OmwDataSource` can accept a few different types of data sources. For more information, please take a look at: [`OmvRestClient.ts`](https://github.com/heremaps/harp.gl/blob/master/%40here/harp-omv-datasource/lib/OmvRestClient.ts).

Create a new object from `OmvDataSource` called `globalRailroads`.

```javascript
const globalRailroads = new harp.OmvDataSource({
   baseUrl: "https://xyz.api.here.com/hub/spaces/hUJ4ZHJR/tile/web",
   apiFormat: harp.APIFormat.XYZSpace,
   authenticationCode: 'AfArIuzngG4gkdhlBZkysnc', //Use this token!
});
```

__NOTE:__ in earlier examples, we were using your own XYZ token within `authenticationCode`. However, in this example, we are accessing a shared dataset, so please use the access token in the example above.

The above code will create and connect to the new data source, but we still need to display it on the map:

```javascript
/* This is the same as above */
const globalRailroads = new harp.OmvDataSource({
   baseUrl: "https://xyz.api.here.com/hub/spaces/hUJ4ZHJR/tile/web",
   apiFormat: harp.APIFormat.XYZSpace,
   authenticationCode: 'AfArIuzngG4gkdhlBZkysnc', //Use this token!
});

map.addDataSource(globalRailroads).then(() => {
   const styles = [{
      "when": "$geometryType ^= 'line'",
      "renderOrder": 1000,
      "technique": "solid-line",
      "attr": {
         "color": "#D73060",
         "transparent": true,
         "opacity": 1,
         "metricUnit": "Pixel",
         "lineWidth": 1
      }
   }]

   globalRailroads.setStyleSet(styles);
   map.update();
});
```

To add the datasource, we'll use the command `map.addDataSource(source)` (just like what we did before). This function returns a promise, indicating the command has finished, so we will use the `.then()` syntax.

This is where we assign the styling rules (see the section _Key Concepts_ for more information about styling rules). Since our dataset consists only of lines, we will use the geometry type `line`.

Finally, we set the style using `.setStyleSet(styles)` and update the map with `map.update()`.

Your map should look something like: 

![rails no data driven styling](img/rails.png)

### 2.2 Uploading data to XYZ and visualize it on harp.gl

For this exercise, we are going to upload some data to your own XYZ account, there are some data sources suggested below, but please feel free to use your own.

__Data Sources:__

- [Seismic Activity](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [Volcanoes of the World](https://earthworks.stanford.edu/catalog/harvard-glb-volc)
- [Tectonic Plates](https://www.sciencebase.gov/catalog/item/4f4e4a48e4b07f02db62303e)

The step by step process will be as follows:

1. Install HERE CLI
2. Configure the CLI with your XYZ account information
3. Create an XYZ Space
4. Download something from the data sources listed above
5. Upload your data
6. Add it to harp.gl

1. Install HERE CLI
```
npm install -g @here/cli
```

If you don't have Node installed, detailed instructions are here: https://www.here.xyz/cli/

2. Configure the CLI with your XYZ account information (same as Studio)
```
here configure account
```   
3. Create an XYZ Space
```
here xyz create -t SPACE-ID -d "a meaningful description you'll be happy to have later"
```
The name of your XYZ Space is `SPACE-ID` and it comes after the `-t` parameter, please provide a meaningful space name as you will need to refer to it later.

4. Download something from the data sources listed above

We will assume for this example that you download the [Tectonic Plates](https://www.sciencebase.gov/catalog/item/4f4e4a48e4b07f02db62303e) on a file called `Plate_Boundaries.shp`
5. Upload your data 

```
here xyz upload SPACE-ID -f Plate_Boundaries.shp
```

You will need to replace `SPACE-ID` with the name you chose on step #3. After this command is executed, your data has now been uploaded to an XYZ Space. To verify the data has been uploaded, you can run the following command:

```
here xyz show SPACE-ID
```

6. Add it to `harp.gl`

You can add it to `harp.gl` regardless of the method you used previuosly (js bundle or npm package).
For this example, we will assume you are using javascript bundle.

From the previous section, you can see how did we add `globalRailroads` to the map, we will follow a similar method right now.
Add the following code snippet to your code:
```
const xyzSpaceDataSource = new harp.OmvDataSource({
   baseUrl: `https://xyz.api.here.com/hub/spaces/SPACE-ID/tile/web`,
   apiFormat: harp.APIFormat.XYZSpace,
   authenticationCode: TOKEN,
});
```
Where `SPACE-ID` is the name of the space you chose before and `TOKEN` is your xyz token and _not_ the one we used before for railroads.
To find out your XYZ token, please run the following command:

```
here xyz token
```

With the previous code, we have initialized the data source, but we need to add it to the map:
```
map.addDataSource(xyzSpaceDataSource).then(() => {
   const styles = colorConfig.map(x => {
      return {
         "when": `$geometryType ^= 'line'`,
         "renderOrder": 1000,
         "technique": "solid-line",
         "attr": {
            "color": "#D73060",
            "transparent": true,
            "opacity": 1,
            "metricUnit": "Pixel",
            "lineWidth": 3
         }
      }
   });
   xyzSpaceDataSource.setStyleSet(styles);
   map.update();
});
```

`map.addDataSource()` returns a promise, so we'll wait until the data has been added to the map. Once it's been added to the map, we will style the data with the harp.gl styling specification.

## The end

Congratulations, you've finished the workshop for harp.gl and xyz! So far, you've learned how to:
- create a new harp.gl application from scratch
- find and download public data sets from open data sites
- upload data to an XYZ Space with the command line interface
- initialize a basic harp.gl map
- add a tiled data set from an XYZ Space to a harp.gl map

Thanks for attending the workshop. For any comments, suggestions, or bug reports, we encourage you to:
- fill out this form: [harp.gl feedback](https://forms.gle/GhTVkruwsReNi3oH7)
- or create an issue on the [harp.gl GitHub repository](https://github.com/heremaps/harp.gl/issues/new)

Until next time, Portland!
