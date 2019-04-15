var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 40.426554, lng: -86.914252},
		zoom: 16
	});
	get_all_br(map);
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
		if( br_obj.diaper != null ){
			content_str = content_str+ '<p>'
			+ 'Diaper Changing Station'
			+ '</p>'
		}
		content_str += '</div>';
	return content_str
}

function place_bathroom( br_obj, map_obj){
	console.log(br_obj)
	var marker = new google.maps.Marker({
		position:{lat:br_obj.lat, lng:br_obj.lng},
		map:map_obj
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
	request.open('GET','/bathrooms/', true);
	request.onload = function(){
		console.log(request.response);
		a = JSON.parse(request.responseText);
		console.log(a);
		for ( var i = 0; i < a.length; i++){
			console.log(a[i]);
			place_bathroom(a[i], map_obj);
		}
	}
	request.send();
}
