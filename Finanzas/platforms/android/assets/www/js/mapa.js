document.addEventListener("deviceready", iniciaMapa, false);

function iniciaMapa() {

	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {
		timeout : 10000,
		enableHighAccuracy : true
	});
	// var mapDiv = document.getElementById("map_fmat");
// 
  // // Initialize the map plugin
  // var map = plugin.google.maps.Map.getMap(mapDiv);
// 
  // // You have to wait the MAP_READY event.
  // map.on(plugin.google.maps.event.MAP_READY, onMapInit);

}
 
 
 
function onMapInit(map) {
}

function geolocationSuccess(position) {

	var latitud = position.coords.latitude;
	var longitud = position.coords.longitude;

	var element = document.getElementById('geolocation');
	element.innerHTML = 'Tu localizacion es: <br /> Latitud: ' + latitud + '<br />' + 'Longitud: ' + longitud + '<br />' + '<hr />';


	// var map = new GMaps({
      // el: '#map_fmat',
      // lat: latitud,
      // lng: longitud
    // });
//     
	//crearMapa(latitud, longitud);
}

function crearMapa(latitud, longitud) {
	var opciones = {
		center : new google.maps.LatLng(latitud, longitud),
		zoom : 18,
		mapTypeId : google.maps.MapTypeId.SATELLITE
	};
	
	

	var map = new google.maps.Map(document.getElementById("map_fmat"), opciones);
	var marker = new google.maps.Marker({
		position : map.getCenter(),
		map : map,
		title : 'Aqui estoy'
	});

}

//google.maps.event.addDomListener(window,'load',crearMapa);

function geolocationError() {
	alert("Error de geoloc");
}


// function drawMap(position){
	// var latitud = position.coords.latitude;
	// var longitud = position.coords.longitude;
// 
	// var element = document.getElementById('geolocation');
	// element.innerHTML = 'Latitude: ' + latitud + '<br />' + 'Longitude: ' + longitud + '<br />' + '<hr />'; 
    // var CENTER = new plugin.google.maps.LatLng(latitud, longitud);
// 
    // var div = document.getElementById("map_fmat");
// 
    // // Initialize the map view
    // var map = plugin.google.maps.Map.getMap(div, {
        // camera: {
            // latLng: CENTER,
            // zoom: 13
        // }
    // });
// }
//google.maps.event.addDomListener(window, 'load', crearMapa);
