/*
 * Playing around with leaflet.
 */

/* sets up the map at the lat/long location */
var map = L.map('map').setView([36.11, -115.17285], 12);


/* sets up attribution properties on the map */
var mapID = "taylorkline.iheaicei";
L.tileLayer('https://{s}.tiles.mapbox.com/v3/' + mapID + '/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
      }).addTo(map);

/* Set up a custom icon.
var customIcon = L.icon({
   iconUrl: './lflt/images/leaf-green.png',
   iconSize: [38, 95],
   iconAnchor: [22, 94],
   popupAnchor: [-3, -76]
}); */

/* Locate user and put a marker in the vicinity of the user */
map.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
  console.log("Location by GPS.");
   var radius = e.accuracy / 2;
   L.marker(e.latlng).addTo(map)
      .bindPopup("You appear to be within " + radius + " meters from this point").openPopup();
   L.circle(e.latlng, radius).addTo(map);
}

/* Set location based on GeoIP if unable to locate with GPS. */
function onLocationError() {
  console.log("Falling back on IP-based location.");
  map.setView([50.5, 30.5]);
  L.GeoIP.centerMapOnPosition(map); //note, centerMapOnPosition function locates automatically
  //before centering on location.
  L.marker(map.getCenter()).addTo(map)
     .bindPopup("Based on your IP Address, you appear to be in this general area.").openPopup();
  L.circle(map.getCenter(), 10000).addTo(map);
}
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError); //TODO: This only fires in Chrome, not FF
//see: http://forrst.com/posts/Geolocation_browser_error_handling_for_temporar-OQx
//also see: https://github.com/Leaflet/Leaflet/issues/1070

/* pop up with lat/long on mouse pointer double click */
var popup = L.popup();
function onMapClick(e) {
   popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
}
map.on('dblclick', onMapClick);

/* Write out map size on click.
   function getMapSize() {
   var point = map.getSize();
   document.write(point.toString());
   }
   map.on('click', getMapSize); */

/* Destroys the map on a click.
   function destroyEverything() {
   map
   .remove();
   }
   map.on('click', destroyEverything); */
