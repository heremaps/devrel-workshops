# Rendering point clouds with harp.gl

## Initialize app

- Follow initial steps from pre-requesites.
- `npm install`
- `npm start`

## Run the application

```
npm start
```

## Add the point cloud to the map

For this workshop we prepared the point cloud data in JSON format to avoid adding another dependency.

### Point data format
To make the parsing easier we add an interface for the point data format:

```typescript
interface Point {
    lat: number; // latitude
    lng: number; // longitude
    alt: number; // altitude
    c: number; // classification
    r: number; // red
    g: number; // green
    b: number; // blue
}
```

### Fetch the point data
```typescript
fetch("https://ghc2020.s3.amazonaws.com/point-cloud.json")
    .then(res => res.json())
    .then(addPointCloud);

function addPointCloud(json: any) {
}
```

All following code goes to `addPointCloud`.

### Center the map on the first point

```typescript
const points = json.points as Point[];

const geoPt0 = new GeoCoordinates(points[0].lat, points[0].lng, points[0].alt);
mapView.lookAt({ target: geoPt0, zoomLevel: 22 });

```


### Create the point cloud object

```typescript

const geometry = new THREE.Geometry();
const worldPt0 = mapView.projection.projectPoint(geoPt0, new THREE.Vector3());
points.forEach((pt) => {
    const geoPt = new GeoCoordinates(pt.lat, pt.lng, pt.alt);
    const worldPt = mapView.projection.projectPoint(geoPt, new THREE.Vector3());

    // Due to floating point precision we need to use relative coordinates
    worldPt.sub(worldPt0);

    geometry.vertices.push(worldPt);
});
const material = new THREE.PointsMaterial({ color: "#aabbcc" });
const threePoints = new THREE.Points(geometry, material) as MapAnchor<THREE.Points>;

```


### Finally add the point cloud to the map

```typescript
geoPt0.altitude = 0;
threePoints.anchor = geoPt0;
threePoints.renderOrder = 100000;
mapView.mapAnchors.add(threePoints);
mapView.update();
```

### Use colors from JSON file

Inside the `forEach` function

```typescript
const color = new THREE.Color(pt.r / 255, pt.g / 255, pt.b / 255);
geometry.colors.push(color);
```

To convince THREE.js to actually use the colors we need to change the material:
```typescript
const material = new THREE.PointsMaterial({ color: "#ffffff", vertexColors: true });
```

### Filter by classification

```typescript
const points = (json.points as Point[]).filter(pt => pt.c > 110);
```