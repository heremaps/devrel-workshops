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

    this.getLayers().then(layers =>
      this.map.addEventListener("tap", (ev) => {
        var target = ev.target;

        this.map.removeObject(this.currentPosition);
        this.currentPosition = new H.map.Marker(this.map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY));
        this.map.addObject(this.currentPosition);
        this.fenceRequest(layers, this.currentPosition.b).then(result => {
            if(result.geometries.length > 0) {
                alert("You are within the geofence!")
            } else {
                alert("You are outside of the geofence.")
            }
        });
      }, false)
    )
    this.map.addObject(this.currentPosition);
  }

  draw(mapObject) {
    this.map.addObject(mapObject);
  }

  // given a list of layers and a position, returns whether or not the position is in layer
  fenceRequest(layerIds, position) {
    return new Promise((resolve, reject) => {
      this.geofencing.request(
        H.service.extension.geofencing.Service.EntryPoint.SEARCH_PROXIMITY,
        {
          'layer_ids': layerIds,
          'proximity': position.lat + "," + position.lng + "," + 100,
          'key_attributes': ['NAME']
        },
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
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
