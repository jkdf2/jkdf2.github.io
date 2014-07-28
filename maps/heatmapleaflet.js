/*
 * Playing around with leaflet
 * by creating a heatmap.
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

var heatmapLayer = new L.DivHeatmapLayer();

//Load heatmap data from a .js file
heatmapLayer.setData(heatmapData);

heatmapLayer.addTo(map);
