

console.log("geolocation loaded")
import mapboxgl from 'mapbox-gl';
export function test(){
    console.log(test)
}
mapboxgl.accessToken = 'pk.eyJ1IjoicmF5MTExMzIwMDIiLCJhIjoiY2tvY3kwb3Y5MmliZDJub24wdnpjMTB5NiJ9.kPPmudTylSbhH27w2lwsoQ';
export function initiateMap(){
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/ray11132002/ckocybags0c1m17k88qzwqa6e', // style URL
        center: [103.99676232382323, 1.3478886553251557], // starting position [lng, lat]
        zoom: 13 // starting zoom
        });
}

    
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
    
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/' + layerId);
};
}
//geolocation search function
const coordinatesGeocoder = function (query) {
        
    // Match anything which looks like
// decimal degrees coordinate pair.
const matches = query.match(
/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
);
if (!matches) {
return null;
}

function coordinateFeature(lng, lat) {
return {
center: [lng, lat],
geometry: {
type: 'Point',
coordinates: [lng, lat]
},
place_name: 'Lat: ' + lat + ' Lng: ' + lng,
place_type: ['coordinate'],
properties: {},
type: 'Feature'
};
}

const coord1 = Number(matches[1]);
const coord2 = Number(matches[2]);
const geocodes = [];

if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
geocodes.push(coordinateFeature(coord1, coord2));
}

if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
geocodes.push(coordinateFeature(coord2, coord1));
}

if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
geocodes.push(coordinateFeature(coord1, coord2));
geocodes.push(coordinateFeature(coord2, coord1));
}

return geocodes;
};

// Add the control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
zoom: 4,
placeholder: 'Try: -40, 170',
mapboxgl: mapboxgl,
reverseGeocode: true
})
);