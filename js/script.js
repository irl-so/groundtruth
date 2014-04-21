//setting the map
var map = L.mapbox.map('map', 'lifewinning.i1md1omi', {zoomControl: false})
    .setView([40.74188, -74.00473], 17);
var ui = document.getElementById('map-ui');

new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

function popUp(f,l){
    var popUpcontent = 
    '<a href=/img/'+f.properties.image+'.jpg><img src="/img/'+f.properties.image+'.jpg" width="250"style="padding:1px; margin:1px;"></a>';
    l.bindPopup(popUpcontent);
    };
function altPop(f,l){
	 var popUp = 
    '<p>'+ f.properties.Time + '</p>';
    l.bindPopup(popUp);
};

//wheee here's phone data
var alt_phone = 
	new L.geoJson(alt_phone,
		{onEachFeature: altPop, pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
				radius: 7,
				fillColor: "#729349",
				color: "#fff",
				weight: 1,
				opacity: 1,
				fillOpacity: 1});
		}
	});

var phone_data =
	new L.geoJson(phone_data, 
	{onEachFeature: popUp, pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
				radius: 7,
				fillColor: "#33959C",
				color: "#fff",
				weight: 1,
				opacity: 1,
				fillOpacity: 1});
		}
	});

var cheats= 
	new L.geoJson(cheats, {onEachFeature: popUp, 
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
				radius: 7,
				fillColor: "#C67E48",
				color: "#fff",
				weight: 1,
				opacity: .75,
				fillOpacity: 1});
			}
		});
addLayer(alt_phone, "Phone Data (nothing to click)", "phoneData");
addLayer(phone_data, "Images From Phone", "pictures");
addLayer(cheats, "Images Without Exif GPS Data, Locations Estimated", "cheats");

//this is the thing that controls all the layers, it's important
function addLayer(layer, name, id) {
    //generating a key of layers so viewer can select to add and remove at will
    var item = document.createElement('li');
    var link = document.createElement('a');

    item.className= 'nav clearfix';
    item.id = id;
    link.href = '#';
    link.innerHTML = name;

   	layer.addTo(map);

    item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = 'nav clearfix'
        } else {
            map.addLayer(layer);
            this.className = 'nav active clearfix';
        }
    };

    item.appendChild(link);
    ui.appendChild(item);
    var layer_ids= document.getElementsByTagName('a');
  
}
var hash = new L.Hash(map);

//navigation 
var pull = $('#pull');
var nav = $('#map-ui');

navHeight  = nav.height();

$(pull).on('click', function(e) {  
        e.preventDefault();  
        nav.slideToggle();  
    }); 

$(window).resize(function(){  
    var w = $(window).width();  
    if(w > 320 && nav.is(':hidden')) {  
        nav.removeAttr('style');
    }  
});  
