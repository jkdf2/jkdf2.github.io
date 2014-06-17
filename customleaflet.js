/*
 * Playing around with leaflet.
 */

/* sets up the map at the lat/long location */
var map = L.map('map').setView([36.11, -115.17285], 12);

//TODO: Set location based on IP address?

/* sets up attribution properties on the map */
var mapID = "taylorkline.iheaicei";
L.tileLayer('http://{s}.tiles.mapbox.com/v3/' + mapID + '/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
      }).addTo(map);

/* Locate user and put a market in the vicinity of the user */
map.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
   var radius = e.accuracy / 2;

   L.marker(e.latlng).addTo(map)
      .bindPopup("You appear to be within " + radius + " meters from this point").openPopup();

   L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);

/* pop up with lat/long on mouse pointer click */
var popup = L.popup();
function onMapClick(e) {
   popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
}
map.on('click', onMapClick);
