var user_placed_marker = null;
var gm_markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 40.426554, lng: -86.914252},
		zoom: 16
	});
	get_all_br(map);

	map.addListener('click', function(event){
		if (user_placed_marker != null)
			user_placed_marker.setMap(null);
		user_placed_marker = new google.maps.Marker({
			position: event.latLng,
			map: map,
		});
	});
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		if (vars[key] != undefined)
			vars[key] = vars[key] + " " + value
		else
			vars[key] = value;
	});
	return vars;
}

function send_br_data(){

}

function generate_marker_html( br_obj ){
	content_str = '<div class="markerWindow">'
		+'<h3>'+br_obj.name+'</h3>';
		if( br_obj.stars != 0 ){
			content_str = content_str+ '<p>'
			+ br_obj.stars + ' stars'
			+ '</p>'
		}
		if( br_obj.tp_ply != null ){
			content_str = content_str+ '<p>'
			+'Toilet Paper Ply: '+ br_obj.tp_ply
			+ '</p>'
		}
		if( br_obj.diaper == true ){
			content_str = content_str+ '<p>'
			+ 'Diaper Changing Station'
			+ '</p>'
		}
		content_str += '</div>';
	return content_str
}

function place_bathroom( br_obj, map_obj){
	var marker = new google.maps.Marker({
		position:{lat:br_obj.lat, lng:br_obj.lng},
		map:map_obj,
		icon: '/toilets_inclusive.png'
	});
	content_str = generate_marker_html(br_obj);
	var info_window = new google.maps.InfoWindow({
		content: content_str
	});

	marker.addListener('click', function(){
		info_window.open(map_obj, marker);
	});
}

function get_all_br( map_obj ){
	var request = new XMLHttpRequest();
	request.open('GET','/bathrooms_all/', true);
	request.onload = function(){
		a = JSON.parse(request.responseText);
		for ( var i = 0; i < a.length; i++){
			place_bathroom(a[i], map_obj);
		}
	}
	request.send();
}
