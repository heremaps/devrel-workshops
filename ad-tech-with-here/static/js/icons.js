var carIcon = new H.map.Icon('static/img/car.png',{size:{w:25,h:25}});
var carGroup = new H.map.Group();
var offerGroup = new H.map.Group();
var geofences = new H.map.Group();
map.addObjects([offerGroup,carGroup,geofences]);

var createSvgMarkerIconWithImg = function (line1) {
    var ua = navigator.userAgent.toLowerCase();
    var svg =
        '<svg width="220" height="50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  >' +
            '<g>' +
            '<rect id="label-box" ry="3" rx="3" stroke="#000000" height="32" width="150" x="35" fill="#ffffff"/>' +
            '<text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="10" font-weight="bold" stroke-width="0" fill="#000000" x="45" y="20">__line1__</text>'+
            '<image x="10" width="40" height="32"   overflow="visible"  href="static/img/offer.png" />'+
            '</g>' +
            '</svg>';


    svg = svg.replace(/__line1__/g, line1);
    return new H.map.DomIcon(svg);
};

