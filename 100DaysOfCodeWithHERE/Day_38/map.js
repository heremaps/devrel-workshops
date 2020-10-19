class HereMap {
  constructor(mapElement) {
    this.platform = new H.service.Platform({
      'apikey': config.apiKey
    });

    this.map = new H.Map(
        mapElement,
        this.platform.createDefaultLayers().vector.normal.map,
        {
            zoom: 18,
            center: { lat: '47.62047340703363', lng: '-122.34904917756407' }
        }
    );

    const mapEvent = new H.mapevents.MapEvents(this.map);
    const behavior = new H.mapevents.Behavior(mapEvent);
    this.geofencing = this.platform.getGeofencingService();
    this.currentPosition = new H.map.Marker({ lat: 37.21, lng: -121.21 });
    this.map.addObject(this.currentPosition);
  }

  draw(mapObject) {
    this.map.addObject(mapObject);
  }

  // returns list of uploaded layers
  getLayers() {
    let fleetURL = "https://fleet.ls.hereapi.com/2/layers/list.json"

    return axios({
      method: 'get',
      url: fleetURL,
      params: {
        apiKey: config.apiKey
      }
    })
    .then( response => {
      return response.data.layers
    })
    .catch( error => {
      console.log(error);
      return Promise.reject(error)
    })
  }
}
