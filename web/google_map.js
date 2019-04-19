var user_placed_marker = null;
var gm_markers = [];

function initMap() {
	var center_loc = {lat: 40.426554, lng: -86.914252};
	var zoom_init = 16;
	args = window.location.href.split('id=')
	if (args.length > 1){
		// we have an argument passed, if it is an ID,
		// we should update the initial values
		var request = new XMLHttpRequest();
		request.open('GET','/bathroom/'+args[1], true);
		//request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.onload = function(){
			a = JSON.parse(request.responseText);
			console.log(a);
			//center_loc.lat = a.lat;
			//center_loc.lng = a.lng;
			var center_loc= { lat:a.lat, lng: a.lng};
			var zoom_init = 18;
			map = new google.maps.Map(document.getElementById('map'),{
			center: center_loc,
			zoom: zoom_init
			})
			place_bathroom( a, map);
		}
		request.send();
		return;
	}
	console.log(center_loc)
	console.log(zoom_init)

	map = new google.maps.Map(document.getElementById('map'),{
		center: center_loc,
		zoom: zoom_init
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

function generate_marker_html( br_obj ){
	content_str = '<div class="markerWindow">'
		+'<a href=\"/br.html?id=' + br_obj._id + '\">'
		+'<h3>'+br_obj.name+'</h3>';
		+ '</a>';
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
	request.open('POST','/bathrooms_all/', true);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function(){
		a = JSON.parse(request.responseText);
		for ( var i = 0; i < a.length; i++){
			place_bathroom(a[i], map_obj);
		}
	}
	args = window.location.href.split('?')
	if ( args.length > 1)
		request.send(args[1]);
	else
		request.send();
	console.log(args)
}
