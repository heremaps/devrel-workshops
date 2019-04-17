
# Creating Interactive Maps in the Cloud

Diving into large open data sets, this workshop will introduce techniques and
tools for interactive filtering and visualization of geo data. This session is
geared towards those with basic experience in web development.

[Workshop Pass Registration](https://ti.to/foss4g-na-2019/foss4g-na-2019-san-diego/with/fawgwk87gpu)

During the workshop, attendees will be issued a challenge to utilize the new
XYZ data management service. The submission with the most creative challenge
submission will win 1 of 3 new Super NES Classic gaming systems.

Be sure to join our slack space to ask any questions: [t.her.is/Slack](t.her.is/Slack)
We'll be monitoring the channel called #xyz.

# Overview

- Introduction to HERE XYZ
- XYZ Studio Overview
- Beginner Activity: Make a Map with XYZ Studio
- XYZ CLI Overview
- Intermediate Activity: Make a Tangram Map
- XYZ APIs and HERE Location Services
- Advanced Activity: Make a Leaflet Map

# Topics

## XYZ Studio

*60min*

In this section we'll walk through a live demo of:

- upload GeoJSON data to HERE XYZ
- style a map, including conditionally based on properties
- publish a map for others to view

Once the demo is complete, we encourage you, on your own, to complete this beginner activity:

- [ ] Create a free [XYZ account](https://xyz.here.com) and log into XYZ Studio
- [ ] Download Data (examples below), Upload to Studio, Make a Map
- [ ] Publish Map and Share It

Data Sources:

- [Seismic Activity](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [Volcanoes of the World](https://earthworks.stanford.edu/catalog/harvard-glb-volc)

Resources for more help:

- [Mapping Seismic Activity Tutorial](https://codelabs.here.xyz/tutorial/05-Mapping-Seismic-Activity#0)
- [Mapping Seismic Activity Livestream](https://www.twitch.tv/videos/408122281)
- [Mapping Seismic Activity Webinar](https://youtu.be/KUwLu1Wnlis)

## HERE XYZ CLI

*30min*

Using XYZ with other tools and renders (30 mins)

- mapshaper
  - converting state plane
  - simplify polygons
- Tangram
  - show vector tile endpoint
  - show tags
- Leaflet
- point to Stamen examples
- QGIS XYZ plugin (reading from earthquake data, some sort of GIS magic -- PIP?)

## Interactive Web Maps

*60 min*

Intermediate Activity:
- add a shapefile (tectonic plates) with the CLI, add that space to the earthquake map in Studio
- import csv (unusual lat/lon fields)
- add tags during upload
- streaming large files
- geojsonl
- space invader preview

## HERE XYZ APIs and HERE Location Services

*30 mins*

- routing
- geocoding

Advanced Activity:
