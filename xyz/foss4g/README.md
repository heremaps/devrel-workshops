
# Creating Interactive Maps in the Cloud

Diving into large open data sets, this workshop will introduce techniques and
tools for interactive filtering and visualization of geo data. This session is
geared towards those with basic experience in web development.

[Workshop Pass Registration](https://ti.to/foss4g-na-2019/foss4g-na-2019-san-diego/with/fawgwk87gpu)

During the workshop, attendees will be issued a challenge to utilize the new
XYZ data management service.

The submission with the most creative challenge
submission will win 1 of 3 new Super NES Classic gaming systems.

Be sure to join our slack space to ask any questions: [https://t.her.is/Slack](https://t.her.is/Slack)

We'll be monitoring the channel called #xyz.

# Overview

- Introduction to HERE XYZ
- XYZ Studio Overview
- Activity: Make a Map with XYZ Studio
- XYZ CLI Overview
- Activity: Upload data with the CLI
- QGIS Plugin
- Interactive Web Maps with XYZ & Tangram
- Activity: Make a Tangram Map
- XYZ APIs and HERE Location Services

# Topics

## XYZ Studio

*60min*

__Demonstration__

- upload GeoJSON data to HERE XYZ
- style a map, including conditionally based on properties
- publish a map for others to view

__Activity__

Once the demo is complete, we encourage you, on your own, to complete this beginner activity:

1. Visit [XYZ Studio](https://xyz.here.com) to create and account
2. Download the data sources (listed below)
3. Upload to studio
4. Customize your map
5. Create a map bookmark
6. Share the map and send to your parents!

![studio](studio.png)

__Data Sources:__

- [Seismic Activity](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [Volcanoes of the World](https://earthworks.stanford.edu/catalog/harvard-glb-volc)

__Resources for more help:__

- [Mapping Seismic Activity Tutorial](https://codelabs.here.xyz/tutorial/05-Mapping-Seismic-Activity#0)
- [Mapping Seismic Activity Livestream](https://www.twitch.tv/videos/408122281)
- [Mapping Seismic Activity Webinar](https://youtu.be/KUwLu1Wnlis)

## HERE XYZ CLI

*30min*

__Demonstration__

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
here xyz create -t "xyz workshop demo" -d "a meaningful description you'll be happy to have later"
```
4. Upload a shapefile

  - download [Tectonic Plates](https://www.sciencebase.gov/catalog/item/4f4e4a48e4b07f02db62303e)
  - decompress `Plate_Boundaries.zip`
  - change directories

```
here xyz upload SPACE-ID -f Plate_Boundaries.shp
```

5. View with GeoJSON viewer to understand shape of data
```
here xyz show SPACE-ID -w
```
6. View with Space Invader to inspect properties in depth.
```
here xyz show SPACE-ID -v
```
   - Look for that space in your XYZ Studio and add it to your earthquake map!

7. Use [mapshaper](https://mapshaper.org/) to convert from local NAD83-style coordinates and simplify polygons
   - download mapshaper: `npm install mapshaper`
   - download this [NAD83 shapefile of bike lanes in San Diego](http://seshat.datasd.org/sde/bike_route/bike_routes_datasd.zip)
   - decompress the file and cd to the bike_routes_datasd directory
   - convert to GeoJSON: `mapshaper bike_routes_datasd.shp -proj wgs84 -o bike_routes_datasd.geojson`
   
8. Upload it with the CLI

```
here xyz upload SPACE-ID -f bike_routes_datasd.geojson
```
   
   - Bonus challenge: pipe mapshaper output to the CLI!
   
   `mapshaper bike_routes_datasd.shp -proj wgs84 -o format=geojson | here xyz upload SPACE-ID`


9. Upload CSV with unusual lat/lon fields. 
   
   - download this CSV of [streetlights in San Diego](https://github.com/heremaps/devrel-workshops/raw/master/xyz/foss4g/streetlights.csv)
   - we look for common column names for latitude and longitude -- `lat,lon,lng,x,y` -- but if your file has an uncommon column name, you can specify it with `-x` and `-y`. In this file, latitude/y values are in a column called `why` and longitude/x values are in `ex`:
   
   `here xyz upload SPACE-ID -f streetlights.csv -x ex -y why`
   
10. Stream a large GeoJSON, GeoJSONL, or CSV to an XYZ space using `-s`:

   - download a state or province from the reverse-geocoded [Microsoft Buildings Footprints dataset](https://www.here.xyz/microsoft-buildings/)
   - upload to XYZ, and use `-p` to tag by geojson properties so you can later filter the data server-side by admins:
   
   `here xyz upload SPACE-ID -f region.geojson -p postalcode,neighborhood,locality,county -s` 
   
   - open the map in the XYZ Space Invader using `show -v` to filter features by tags and color features by property:
   
   `here xyz show SPACE-ID -v`
   
   - you can also use `-t` to limit the data by admin region:
   
   `here xyz show SPACE-ID -v -t postalcode@94110`
   `here xyz show SPACE-ID -v -t county@madison`
   

__Activity__

- [ ] upload a shapefile (tectonic plates) with the CLI
- [ ] add that space to the earthquake map in Studio
- [ ] add tags during upload

__Data sources__

- [San Diego Streetlights CSV](streetlights.csv)
- [SF Lands shapefile](sflnds_current.zip)
- [Tectonic plates GeoJSON](https://github.com/fraxen/tectonicplates/tree/master/GeoJSON)

__Resources__
- [HERE CLI Documentation](https://www.here.xyz/cli/)

## QGIS plugin

- [Install QGIS](https://qgis.org/en/site/forusers/download.html) 
- QGIS XYZ plugin from Plugin Directory
- enter your token
- pick your space
- do some QGIS things
- upload data back to XYZ


## Interactive Web Maps

*45 min*

__Demonstration__
1. Create the boilerplate code for a Tangram map by entering this into your command-line
```
npx tangram-make {directory name} {space id} {xyz token}
```
`{directory name}` is the name of the new directory that will be created. `{space id}` is the ID of the XYZ Space of the data you will show. `{xyz token}` is your XYZ access token.

2. Enter into the new directory with `cd {directory name}`

3. Start a local server to view the map
```
python -m SimpleHTTPServer 8888
```

![map](tangram.png)

__Activity__

- [ ] Run `tangram-make` to create the boilerplate code for a Tangram map
- [ ] Show data from XYZ Space on your map
- [ ] Publish to Github pages in order to potentially win a gaming system.


__Resources__

- [Tangram documentation](https://tangrams.readthedocs.io/en/latest/)
- [Tangram and XYZ Space examples](https://github.com/heremaps/xyz-showcase)
- [XYZ Hub APIs documentation](https://www.here.xyz/api/)


## HERE XYZ APIs and HERE Location Services

(Optional, if time)

*30 mins*

1. Grab `AppId` and `AppCode` credentials from [developer.here.com](https://developer.here.com)
2. Before your Tangram initialization, insert your here credentials:
```javascript
const here = {
   id: 'YOUR-HERE-ID',
   code: 'YOUR-HERE-CODE'
}
```
3. Add the code to make a routing request and display the polyline in Leaflet:
```javascript
async function onMapClick (evt) {
   if (evt.feature) {
      const start = '41.881832,-87.623177';
      const leafletClick = evt.leaflet_event.latlng;
      const end = `${leafletClick.lat},${leafletClick.lng}`;

      const shape = await route(start, end);
      const poly = L.polyline(shape).addTo(map)
   }
}

async function route(start, end) {
   const url = `https://route.api.here.com/routing/7.2/calculateroute.json?app_id=${here.id}&app_code=${here.code}&waypoint0=geo!${start}&waypoint1=geo!${end}&mode=fastest;car;traffic:disabled&routeattributes=shape`
   const response = await fetch(url);
   const data = await response.json();
   return await data.response.route[0].shape.map(x => x.split(","));
}
```

