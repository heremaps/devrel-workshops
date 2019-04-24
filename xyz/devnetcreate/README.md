
# Making Maps with HERE XYZ

Want to create a professional looking map with open source JavaScript libraries
but don’t know how? In this workshop we’ll create some beautiful maps such as:

- seismic activity across the globe
- air quality in Madrid
- solar panels in Amsterdam
- flight traffic from popular airports
- smart streetlights in San Diego
- bike lanes in Chicago
- etc.

Bring your own data, as you can adapt and fork these examples to view the
location of your assets around the world.

# Agenda

Here's an outline of what we'll be doing in this workshop.  I hope you'll be
able to create and share at least one custom map before we're done.

- Introduction
- Demo of HERE XYZ Studio
- Create a HERE XYZ Studio Map (self-paced activity)
- Demo of HERE XYZ CLI, API, and Tangram
- Create a HERE XYZ Web Map (self-paced activity)
- Share your map

Messaging
- Webex Teams
- Slack #xyz channel - [https://t.her.is/Slack](https://t.her.is/Slack)
- Twitter - [@jaysondelancey](https://twitter.com/jaysondelancey)

# Pre-Requisites

The provided laptops should be setup or if using your own device you can find
the pre-requisites in the conference repository:
[github.com/CiscoDevNet/Create2019](https://github.com/CiscoDevNet/Create2019/blob/master/Jayson%20DeLancey/Making%20Maps%20with%20XYZ.md)

# Create a HERE XYZ Studio Map

__Demonstration__

- upload GeoJSON data to HERE XYZ Studio
- style map and conditionally format based on properties
- publish a map for others to view

__Activity__

*20 min*

1. Visit [XYZ Studio](https://xyz.here.com) to create an account
2. Download something from the data sources listed below
3. Upload to XYZ Studio
4. Customize your map by changing basemap, colors, labels, cards
5. Create a map bookmark
6. Publish your project and send to your family (or tag me above)

__Data Sources:__

- [Seismic Activity](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [Volcanoes of the World](https://earthworks.stanford.edu/catalog/harvard-glb-volc)

__Resources for more help:__

- [Mapping Seismic Activity Tutorial](https://codelabs.here.xyz/tutorial/05-Mapping-Seismic-Activity#0)
- [Mapping Seismic Activity Livestream](https://www.twitch.tv/videos/408122281)
- [Mapping Seismic Activity Webinar](https://youtu.be/KUwLu1Wnlis)

# Create a HERE XYZ Web Map

__Demonstration__

- create a space and upload data with `here` CLI
- initialize a tangram project
- use tangram play to customize look and feel
- view of some other maps in the [HERE XYZ Showcase](https://github.com/heremaps/xyz-showcase)

__Activity__

*25 min*

1. Try `here -v` or if not installed run `npm install -g @here/cli`
2. Login to CLI with `here configure account`
3. Create a space for data with `here xyz create -t "workshop" -d "my workpace"` and note SPACE-ID or run `here xyz list`
4. Upload data with `here xyz upload SPACE-ID -f FILEPATH`
5. View with GeoJSON viewer by running `here xyz show SPACE-ID -w` and note
   XYZ-TOKEN
6. Run `npx tangram-make project SPACE-ID XYZ-TOKEN` to initialize a web project
7. From project directory run `python -m SimpleHTTPServer &` or `http-server`
   to start a webserver and load http://localhost:8000 in your web browser

__Data Sources:__

- [Tectonic Plates SHP file](https://www.sciencebase.gov/catalog/item/4f4e4a48e4b07f02db62303e)
- [Tectonic plates GeoJSON](https://github.com/fraxen/tectonicplates/tree/master/GeoJSON)
- [Streetlights in San Diego](https://github.com/heremaps/devrel-workshops/raw/master/xyz/foss4g/streetlights.csv)
- [SF Lands shapefile](sflnds_current.zip)

__Resources for more help:__

- [HERE CLI Documentation](https://www.here.xyz/cli/)
- [Tangram documentation](https://tangrams.readthedocs.io/en/latest/)
- [XYZ Hub APIs documentation](https://www.here.xyz/api/)
- [Mapping Solar Energy Webinar](https://youtu.be/qi5cWF_TxCw)
- [Mapping Solar Energy Tutorial(https://codelabs.here.xyz/tutorial/07-Green-Amsterdam#0) - Tangram
- [Mapping Air Quality Webinar](https://youtu.be/kZo1BQHWSS8)
- [Mapping Air Quality Tutorial](https://codelabs.here.xyz/tutorial/06-Air-Quality-In-Madrid#0) - Leaflet
- [Mapping Live Flights Webinar](https://youtu.be/E78Pw2d-kpM)
- [Mapping Live Flights
  Tutorial](https://codelabs.here.xyz/tutorial/08-Global-Flight-Tracker#0) -
Three.js


