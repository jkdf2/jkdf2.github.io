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

/* Color code the states based on popdensity */
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

/* Import state data from GeoJSON file */
L.geoJson(statesData, {style: style}).addTo(map);

/* Outline the states. */
function style(feature) {
   return {
      fillColor: getColor(feature.properties.density),
         weight: 2,
         opacity: 1,
         color: 'black',
         dashArray: '3',
         fillOpacity: 0.7
   };
}

/* Zoom to the state. */
function zoomToFeature(e) {
   map.fitBounds(e.target.getBounds());
}

/* Unzoom from the states. */
function unzoomFeature(){
   map.setView([37, -97], 4);
}

/* Defines what to do when the state is highlighted */
function highlightFeature(e) {
   var layer = e.target;
   layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
   });

   if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
   }

   info.update(layer.feature.properties);
}

/* Define the reset of states back to normal color. */
function resetHighlight(e) {
   geojson.resetStyle(e.target);
   info.update();
}

/* Listener for mouseovers and mouseouts. */
function onEachFeature(feature, layer) {
   layer.on({
      mouseover: highlightFeature,
   mouseout: resetHighlight,
   click: zoomToFeature,
   dblclick: unzoomFeature
   });
}

/* Allows the geoJson layer to be accessed. */
var geojson;
geojson = L.geoJson(statesData, {
   style: style,
        onEachFeature: onEachFeature
}).addTo(map);

/* Custome control: state infographic in top corner */
var info = L.control();

info.onAdd = function (map) {
   this._div = L.DomUtil.create('div', 'info'); //create a div with class 'info'
   this.update();
   return this._div;
};

/* Method to update the control based on feature properties */
info.update = function (props) {
   this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
         '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup><br /> Click on state to zoom in<br />double click to zoom out.'
         : 'Hover over a state for information.<br />Click on a state to zoom in<br />double click to zoom out.');
};
info.addTo(map);
