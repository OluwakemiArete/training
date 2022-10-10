//initialize map from leaflet

var map = L.map('project').setView([8.31, 8.23], 6);

//osm tile layer to map from leaflet
 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



//add other base maps via google map to leaflet

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
//.addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//var marker = L.marker([7.31, 5.40]).addTo(map);

//region style
var regionStyle ={
	color: "green",
	opacity: 0.3,
	weight: 2
}


//rivers style
var riversStyle = {
	color:"Blue",
	weight:0.7,
	opacity:0.2,
}

// railways style
var railwaysStyle = {
	color: "brown",
	weight: 2.0,
	opacity: 0.7,
}


//add the geojson layers

//var regionlayer = L.geoJson(region)
//.addTo(map)

var regionlayer = L.geoJson(region, {
	style: regionStyle,
	onEachFeature:function (feature, layer) {
        layer.bindPopup(feature.properties.ADM1_NAME)
    }
		
}).addTo(map)



//var riverslayer = L.geoJson(rivers).addTo(map)

var riverslayer = L.geoJson(rivers,{
 style:riversStyle,
 onEachFeature:function (feature, layer) {
     layer.bindPopup(feature.properties.fclass)
    }

}).addTo(map)


//var railwayslayer = L.geoJson(railways).addTo(map)

var railwayslayer = L.geoJson(railways,{
    style:railwaysStyle,
    onEachFeature:function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }

}).addTo(map)


// var railwaylayer = L.geoJson(railways,{style:railwaysStyle,
// onEachFeature:function (feature, layer) {
//         layer.bindPopup(feature.properties.NAME)
//     }


// })
// //.addTo(map);









//base maps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street Map": googleStreets,
    "Google Terrain": googleTerrain,
    "Google Satellite": googleSat,
    "Google Hybrid": googleHybrid,
};

//layers
var overlays = {
    //"Marker": marker,
    //"Roads": roadsLayer
    "Region": regionlayer,
    "Rivers": riverslayer,
    "Railways": railwayslayer,
};


//added, link from leaflet browser print, you have to link the print file download insided the html folder too

L.control.browserPrint({position: 'topleft'}).addTo(map);



L.control.layers(baseLayers, overlays,{collapsed:true}).addTo(map);

//mouse hover coordinate (you have to ref-link the coordinate in the html folder too, 
//break the existing div, input another div for coordinate)

map.on("mousemove", function(e){

      	$("#coordinate").html(`Lat:${e.latlng.lat.toFixed(4)} , Lng:${e.latlng.lng.toFixed(4)}`)
      	
      })


L.control.scale().addTo(map);