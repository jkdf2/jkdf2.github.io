/*
 * Playing around with leaflet
 * by creating a population density map.
 */

/* sets up the map at the lat/long location */
var map = L.map('map').setView([37, -97], 4);

/* sets up attribution properties on the map */
var mapID = "taylorkline.iheaicei";
L.tileLayer('https://{s}.tiles.mapbox.com/v3/' + mapID + '/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
      }).addTo(map);

function getColor(d) {
   return d > 1000 ? '#4A1486' :
      d > 500  ? '#6A51A3' :
      d > 200  ? '#807DBA' :
      d > 100  ? '#9E9AC8' :
      d > 50   ? '#BCBDDC' :
      d > 20   ? '#DADAEB' :
      d > 10   ? '#EFEDF5' :
      '#FCFBFD';
}

function style(feature) {
   return {
      fillColor: getColor(feature.properties.density),
         weight: 2,
         opacity: 1,
         color: 'white',
         dashArray: '3',
         fillOpacity: 0.7
   };
}

/* Import state data from GeoJSON file */
L.geoJson(statesData, {style: style}).addTo(map);
