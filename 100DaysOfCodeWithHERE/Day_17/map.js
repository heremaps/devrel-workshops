
// Initialize platform with JS API KEY 
var platform = new H.service.Platform({
    apikey: "YOUR_JS_API_KEY"
});
// initializing default layers for the map
var defaultLayers = platform.createDefaultLayers();
// rendering map within the container on the page
var map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map, // rendering vector map with NORMAL map view.
        {
            zoom: 11, // Initial zoom level of map
            center: {lat: 52.53086, lng: 13.38474} // Initial center of map
        });

// creating default UI for map
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Add basic map events like pan and zoom 
var mapEvents = new H.mapevents.MapEvents(map);
// Initialize for map behaviour on events
var behavior = new H.mapevents.Behavior(mapEvents);


var provider = map.getBaseLayer().getProvider();

var mapStyle = new H.map.Style('../styles/font_arial.yaml', 'https://js.api.here.com/v3/3.1/styles/omv/');

provider.setStyle(mapStyle);

// adjust tilt and rotation of the map
map.getViewModel().setLookAtData({
tilt: 60,
heading: 90
});

var positionIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-0.5 -0.5 21 21"><defs/><g><ellipse cx="10" cy="10" rx="10" ry="10" fill="#009900" stroke="#000000" pointer-events="none"/><ellipse cx="10" cy="10" rx="3" ry="3" fill="#ffffff" stroke="#000000" pointer-events="none"/></g></svg>`;

var circleStyle ={
            fillColor: 'RGBA(153, 233, 242, 0.5)',strokeColor: 'RGB(11, 114, 133)',
            lineWidth:3
        };


function getBrowserPosition(){

    if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log(position.coords);
                let browserPosition = {lat:position.coords.latitude, lng:position.coords.longitude};
                let posIcon = new H.map.Icon(positionIcon);
                let marker = new H.map.Marker(browserPosition,{icon:posIcon});
                map.addObject(marker);
            });
        } else {
            alert("Geolocation is not supported by this browser!");
    }
};

var imageIcon = new H.map.Icon('../img/robot.png');


function clickToMark(){
    // Add event listener:
    map.addEventListener('tap', function(evt) {
        if(evt.target instanceof H.map.Marker){
            var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData()
            });
            // show info bubble
            ui.addBubble(bubble);
        }
        else{
            // Log 'tap' and 'mouse' events:
            let pointer = evt.currentPointer;
            let pointerPosition = map.screenToGeo(pointer.viewportX, pointer.viewportY);
            let pointerMarker = new H.map.Marker(pointerPosition,{icon:imageIcon,volatility:true}); 
            pointerMarker.draggable = true;
            pointerMarker.setData("I'm Here");
            map.addObject(pointerMarker);
        }  
            
    });
}

function clickDragMarkers(){
    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener('dragstart', function(ev) {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
        var targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
        }
    }, false);


    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', function(ev) {
        var target = ev.target;
        if (target instanceof H.map.Marker) {

            var circle = new H.map.Circle(target.getGeometry(), 10000,{style: circleStyle});
            // Add the circle to the map:
            map.addObject(circle);
            behavior.enable();
        }
    }, false);

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener('drag', function(ev) {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
            let newTargetPosition = map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y)
            target.setGeometry(newTargetPosition);
        }
    }, false);

}


function highlightHosp(){

    var hospStyle = provider.getStyle();
    var hospConfig = hospStyle.extractConfig('landuse.hospital');

    hospConfig.layers.landuse.hospital.draw.polygons.color = 'rgb(255,0,0)'; 

    hospStyle.mergeConfig(hospConfig);
}



getBrowserPosition();
clickToMark();
clickDragMarkers();