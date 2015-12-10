document.addEventListener("deviceready", iniciaMapa, false);

function iniciaMapa() {

	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {
		timeout : 10000,
		enableHighAccuracy : true
	});
}

function geolocationSuccess(position) {

	var latitud = position.coords.latitude;
	var longitud = position.coords.longitude;

	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: ' + latitud + '<br />' + 'Longitude: ' + longitud + '<br />' + '<hr />';

	crearMapa(latitud, longitud);
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

google.maps.event.addDomListener(window, 'load', crearMapa);
