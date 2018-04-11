const cartoUser = 'steve-carto';
const cartoApiKey = 'YOUR_API_KEY';
const sqlApi = "https://" + cartoUser + ".carto.com/api/v2/sql?q=";

const clientSettings = {
  apiKey: cartoApiKey,
  username: cartoUser
};

//create leaflet popup object
const popup = L.popup({
  closeButton: false
});

// create some basemap layer objects
const cartoBasemapLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
});

const wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
  layers: 'nasa:bluemarble'
});

const topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// create objects that arrange layers into groups for menus
var baseMapLayers = {
  "topo": topomap,
  "CARTO Voyager (xyz)": cartoBasemapLayer,
  "NASA (wms)": wmsLayer
};