var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 40.426554, lng: -86.914252},
		zoom: 15
	});
	test= {name:'test', loc:'40.42,-86.92'};
	place_bathroom(test, map);
}

function place_bathroom( br_obj, map_obj){
	loc_arr = br_obj.loc.split(',')
	var marker = new google.maps.Marker({
		position:{lat:Number(loc_arr[0]), lng:Number(loc_arr[1])},
		map:map_obj
	});
	content_str = '<div class="markerWindow">'
		+'<h3>'+br_obj.name+'</h3>'
		+'</div>';
	var info_window = new google.maps.InfoWindow({
		content: content_str
	});

	marker.addListener('click', function(){
		info_window.open(map_obj, marker);
	});
}

function get_all_br(){
	var request = new XMLHTTPRequest();
	request.open('GET','localhost:3000/bathrooms/', true);
	request.onload = function(){
		console.log(request.response);
		for ( var i = 0; i < request.response.length(); i++){
			place_bathroom(item, map_obj);
		}
	}
	request.send();
}
