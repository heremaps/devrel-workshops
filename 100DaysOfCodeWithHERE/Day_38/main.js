const start = async () => {
    const map = new HereMap(document.getElementById("map"));
    // creates the same shape as geofence created for spaceneedle
    const points = [
      { lat: '47.620666853267224', lng: '-122.34955611506788' },
      { lat: '47.6208006380942', lng: '-122.34930398742048' },
      { lat: '47.62069758764966', lng: '-122.34902235547392' },
      { lat: '47.62047340703363', lng: '-122.34904917756407' },
      { lat: '47.62034323720253', lng: '-122.34933080951063' },
      { lat: '47.62044990417142', lng: '-122.34958561936705' },
      { lat: '47.620666853267224', lng: '-122.34955611506788' }
    ]
    let lineString = new H.geo.LineString();

    points.forEach(point => lineString.pushPoint(point));
    const polygon = new H.map.Polygon(lineString);
    // draws the shape of geofence on map
    map.draw(polygon);
};

document.addEventListener('DOMContentLoaded', function() {
  start();
});
