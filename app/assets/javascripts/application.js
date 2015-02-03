// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {

	// environment-dependant urls

	var env = $(".env").data("env");
	if (env == "development"){
		var host = "localhost:3000";
	} else {
		var host = "myroe.herokuapp.com";
	}



	// mobile-friendly menu animation

	$('.tab_up').click(function(){
		if ($('.content').length) {
			$('.content').slideUp();
		};
		if ($('.info_page').length) {
			$('.info_page').slideUp();
		};
  		$('.over_map').height('66px');
  		$('.tab_up').hide();
  		$('.tab_down').show();
	});

	$('.tab_down').click(function(){
		if ($('.content').length) {
			$('.content').slideDown();
		};
		if ($('.info_page').length) {
			$('.info_page').slideDown();
		};
  		$('.over_map').height('400px');
  		$('.tab_down').hide();
  		$('.tab_up').show();
	});



	// screen resize-dependant div resets

	$(window).resize(function () {
    	if ($(window).width() >= 550) {	
			$('.over_map').slideDown();
			$('.over_map').height('100%');
			$('.content').slideDown();
			$('.info_page').slideDown();
		};
	});
	

	var fishMarker = [];

	var latitude = 0;
	var longitude = 0;
	var map;
	var markers =[];

	google.maps.event.addDomListener(window, 'load', initialize);



	function initialize() {
		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(latitude, longitude)
		};

		map = new google.maps.Map(document.getElementById('mapdiv'),
	                          	  mapOptions);


		// fish warning area polygons

		// Arthur Kill
		var arthurkill;
		var arthurkillCoords = [
		    new google.maps.LatLng(40.502016, -74.277058),
		    new google.maps.LatLng(40.498981, -74.269591),
		    new google.maps.LatLng(40.496044, -74.248476),
			new google.maps.LatLng(40.511903, -74.245386),
			new google.maps.LatLng(40.518885, -74.235859),
			new google.maps.LatLng(40.531346, -74.233370),
			new google.maps.LatLng(40.542044, -74.235087),
			new google.maps.LatLng(40.551240, -74.211655),
			new google.maps.LatLng(40.562456, -74.199639),
			new google.maps.LatLng(40.568585, -74.183417),
			new google.maps.LatLng(40.559652, -74.165221),
			new google.maps.LatLng(40.564738, -74.152947),
			new google.maps.LatLng(40.573540, -74.143076),
			new google.maps.LatLng(40.580611, -74.157204),
		    new google.maps.LatLng(40.595733, -74.163985),
		    new google.maps.LatLng(40.606095, -74.171881),
			new google.maps.LatLng(40.625641, -74.165701),
		    new google.maps.LatLng(40.631764, -74.174284),
		    new google.maps.LatLng(40.644269, -74.180464),
			new google.maps.LatLng(40.651758, -74.177460),
		    new google.maps.LatLng(40.648274, -74.194626),
		    new google.maps.LatLng(40.633685, -74.210419),
			new google.maps.LatLng(40.625738, -74.212651),
		    new google.maps.LatLng(40.612057, -74.218315),
		    new google.maps.LatLng(40.588596, -74.221749),
			new google.maps.LatLng(40.572430, -74.227070),
		    new google.maps.LatLng(40.557302, -74.261574),
		    new google.maps.LatLng(40.549346, -74.275650),
			new google.maps.LatLng(40.516729, -74.277882),
		    new google.maps.LatLng(40.502016, -74.277058)
		];

		arthurkill = new google.maps.Polygon({
			paths: arthurkillCoords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			// visibility: false
		});

		arthurkill.setMap(map);


		// Atlantic Ocean/Long Island South Shore
		var atlocean;
		var atloceanCoords = [
		    new google.maps.LatLng(40.598034, -73.732474),
		    new google.maps.LatLng(40.597252, -73.761656),
			new google.maps.LatLng(40.591386, -73.797190),
			new google.maps.LatLng(40.585715, -73.817274),
			new google.maps.LatLng(40.581544, -73.832037),
			new google.maps.LatLng(40.576850, -73.848345),
			new google.maps.LatLng(40.560094, -73.898127),
			new google.maps.LatLng(40.559050, -73.911345),
			new google.maps.LatLng(40.547834, -73.949282),
			new google.maps.LatLng(40.472788, -74.013136),
			new google.maps.LatLng(40.444837, -73.987043),
			new google.maps.LatLng(40.433079, -73.986013),
			new google.maps.LatLng(40.504382, -73.689382),
		    new google.maps.LatLng(40.595687, -73.712042),
			new google.maps.LatLng(40.598034, -73.732474)
		];

		atlocean = new google.maps.Polygon({
			paths: atloceanCoords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			// visibility: false
		});

		atlocean.setMap(map);


		// East River to the Throgs Neck (includes Harlem and Bronx Rivers)
		var eastriver;
		var eastriverCoords = [
			new google.maps.LatLng(40.799094, -73.793363),
		 	new google.maps.LatLng(40.793766, -73.793363),
			new google.maps.LatLng(40.792922, -73.793363),
			new google.maps.LatLng(40.791102, -73.792677),
			new google.maps.LatLng(40.788893, -73.791303),
			new google.maps.LatLng(40.787528, -73.789673),
			new google.maps.LatLng(40.782459, -73.785209),
			new google.maps.LatLng(40.783499, -73.795166),
			new google.maps.LatLng(40.788178, -73.799715),
			new google.maps.LatLng(40.792402, -73.821258),
			new google.maps.LatLng(40.783889, -73.828297),
			new google.maps.LatLng(40.783824, -73.840914),
			new google.maps.LatLng(40.773945, -73.839884),
			new google.maps.LatLng(40.764324, -73.829584),
			new google.maps.LatLng(40.746900, -73.829241),
			new google.maps.LatLng(40.744364, -73.850355),
			new google.maps.LatLng(40.753857, -73.857393),
			new google.maps.LatLng(40.762309, -73.869066),
			new google.maps.LatLng(40.767250, -73.892069),
			new google.maps.LatLng(40.776090, -73.907004),
			new google.maps.LatLng(40.763479, -73.932924),
			new google.maps.LatLng(40.750346, -73.944941),
		 	new google.maps.LatLng(40.739356, -73.930006),
			new google.maps.LatLng(40.728820, -73.917475),
			new google.maps.LatLng(40.722706, -73.912840),
			new google.maps.LatLng(40.713729, -73.914900),
			new google.maps.LatLng(40.703709, -73.927775),
			new google.maps.LatLng(40.705661, -73.937045),
			new google.maps.LatLng(40.716191, -73.936733),
			new google.maps.LatLng(40.720875, -73.930811),
			new google.maps.LatLng(40.725298, -73.935960),
			new google.maps.LatLng(40.728092, -73.941570),
			new google.maps.LatLng(40.731084, -73.947234),
		 	new google.maps.LatLng(40.733685, -73.954616),
			new google.maps.LatLng(40.724709, -73.953758),
			new google.maps.LatLng(40.715602, -73.960796),
			new google.maps.LatLng(40.706233, -73.962856),
			new google.maps.LatLng(40.696213, -73.964572),
			new google.maps.LatLng(40.696799, -73.980022),
			new google.maps.LatLng(40.697710, -73.991008),
			new google.maps.LatLng(40.679519, -74.004054),
			new google.maps.LatLng(40.694197, -74.013023),
			new google.maps.LatLng(40.704543, -74.016371),
			new google.maps.LatLng(40.711993, -74.003754),
		 	new google.maps.LatLng(40.714075, -73.982296),
			new google.maps.LatLng(40.721361, -73.979721),
			new google.maps.LatLng(40.727996, -73.976974),
			new google.maps.LatLng(40.734175, -73.978348),
			new google.maps.LatLng(40.738597, -73.978262),
			new google.maps.LatLng(40.744905, -73.974915),
			new google.maps.LatLng(40.755569, -73.968048),
			new google.maps.LatLng(40.763110, -73.960667),
			new google.maps.LatLng(40.770001, -73.953629),
			new google.maps.LatLng(40.777541, -73.948822),
			new google.maps.LatLng(40.784040, -73.949509),
			new google.maps.LatLng(40.794762, -73.940926),
		 	new google.maps.LatLng(40.799051, -73.935604), 
			new google.maps.LatLng(40.805808, -73.937836), 
			new google.maps.LatLng(40.812694, -73.938694),
			new google.maps.LatLng(40.833219, -73.939037),
			new google.maps.LatLng(40.839193, -73.937321),
			new google.maps.LatLng(40.856983, -73.926506),
			new google.maps.LatLng(40.869965, -73.917580),
			new google.maps.LatLng(40.871783, -73.924961),
			new google.maps.LatLng(40.876066, -73.927536),
			new google.maps.LatLng(40.883594, -73.921699),
			new google.maps.LatLng(40.875677, -73.903503),
			new google.maps.LatLng(40.866330, -73.904190),
			new google.maps.LatLng(40.854256, -73.914318),
			new google.maps.LatLng(40.840752, -73.924274),
			new google.maps.LatLng(40.833219, -73.927707),
			new google.maps.LatLng(40.811266, -73.926506),
			new google.maps.LatLng(40.805679, -73.920669),
			new google.maps.LatLng(40.801780, -73.913631),
			new google.maps.LatLng(40.807628, -73.907108),
			new google.maps.LatLng(40.810746, -73.893375),
			new google.maps.LatLng(40.807888, -73.883419),
			new google.maps.LatLng(40.808667, -73.877410),
			new google.maps.LatLng(40.817372, -73.888397),
			new google.maps.LatLng(40.831206, -73.888397),
		 	new google.maps.LatLng(40.845492, -73.880672),
			new google.maps.LatLng(40.868603, -73.882217),
			new google.maps.LatLng(40.881972, -73.873291),
			new google.maps.LatLng(40.879766, -73.864536),
			new google.maps.LatLng(40.859256, -73.869343),
			new google.maps.LatLng(40.848349, -73.867798),
			new google.maps.LatLng(40.832895, -73.875007),
			new google.maps.LatLng(40.825361, -73.878612),
			new google.maps.LatLng(40.820295, -73.876209),
			new google.maps.LatLng(40.816527, -73.862991),
			new google.maps.LatLng(40.811071, -73.853378),
			new google.maps.LatLng(40.813279, -73.837757),
		 	new google.maps.LatLng(40.817437, -73.825054),
			new google.maps.LatLng(40.816008, -73.810119), //throgs neck
			new google.maps.LatLng(40.810811, -73.804969),
			new google.maps.LatLng(40.809122, -73.800678),
			new google.maps.LatLng(40.805744, -73.793296),
			new google.maps.LatLng(40.799094, -73.793363) //middle of throgs
		];

		eastriver = new google.maps.Polygon({
			paths: eastriverCoords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			// visibility: false
		});

		eastriver.setMap(map);



			// new google.maps.LatLng(),
		 	// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),
			// new google.maps.LatLng(),

		var newfishMarker;

		function placeMarker(location) {
			if ( newfishMarker ) {
				newfishMarker.setPosition(location);
			} else {
				newfishMarker = new google.maps.Marker({
			  		position: location,
			  		map: map
				});
			};
		};

		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
			window.location.href = "http://"+ host +"/fishes/new?lat="+ event.latLng.k+"&lng="+ event.latLng.D;
		});

		var fishscrollid = window.location.search.split("?fish_id=")[1];
		if (fishscrollid != undefined) {
			$('.catches').scrollTop(0);
			$('.catches').scrollTop($('.fish-' + fishscrollid).position().top - $('.catches').position().top);
		};

	};

	if ("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(function(position){
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			map.setCenter(new google.maps.LatLng( latitude, longitude ) );

			$.ajax({
				type: "GET",
				url: "/fishes",
			})
			.done(function( fishes, current_user ) {
			// 	debugger;
				fish = fishes["fishes"];
				var current_user_id = fishes["current_user"].id;
				for(var i = 0; i < fish.length; i++){
					var user_id = fish[i].user_id;
					if (user_id == current_user_id) {
						var image = '/myfish.png'
						console.log('myfish')
					} else {
						var image = '/fishicon.png'
						console.log('fishicon')
					}
					var fish_type = fish[i].fish_type;
					var number = fish[i].number;
					var weather = fish[i].weather;
					var comments = fish[i].comments;
					var time_caught = fish[i].time_caught;
					var fish_id = fish[i].id;
					var fishLat = fish[i].lat;
					var fishLong = fish[i].long;
					var fishLatlng = new google.maps.LatLng(fishLat,fishLong);
					var fishMarker = new google.maps.Marker({
						position: fishLatlng,
						map: map,
						animation: google.maps.Animation.DROP,
						fish_type: fish_type,
						fish_id: fish_id,
						number: number,
						user_id: user_id,
						weather: weather,
						comments: comments,
						time_caught: time_caught,
						icon: image
					});

					console.log()

					google.maps.event.addListener(fishMarker, 'click', function() {
						window.location.href = "http://"+ host +"/users/" + this.user_id + "?fish_id=" + this.fish_id
					});

					window['fishMarker' + fishMarker.fish_id] = fishMarker

					$(".java_fish[data-fish_id="+fishMarker.fish_id+"]").click(function(){
						event.preventDefault();

						map.setCenter({lat: parseFloat(this.dataset.lat), lng: parseFloat(this.dataset.lng)});

						window['fishMarker' + this.dataset.fish_id].setAnimation(google.maps.Animation.BOUNCE);
						that = this
						setTimeout(function(){ window['fishMarker' + that.dataset.fish_id].setAnimation(null); }, 4200);
					});

		        }
			});


			$.ajax({
				type: "GET",
				url: "/outfalls",
			})
			.done(function( outfalls ) {
				for(var i = 0; i < outfalls.length; i++){
					var outfall_id = outfalls[i].id
					var site = outfalls[i].site;
					var description = outfalls[i].description;
					var lat = outfalls[i].lat;
					var lng = outfalls[i].lng;
					var percent_unsafe = outfalls[i].percent_unsafe;
					var icon_scale_y = ((parseFloat(percent_unsafe))*5 + 3)*10*64/83;
					var icon_scale_x = ((parseFloat(percent_unsafe))*5 + 3)*10;
					var outfallLatlng = new google.maps.LatLng(lat,lng);
					var icon = {
						    url: "/biohazard.png",
						    scaledSize: new google.maps.Size(icon_scale_y, icon_scale_x),
						    origin: new google.maps.Point(0, 0), 
						    anchor: new google.maps.Point(0, 0)
						};
					var outfallMarker = new google.maps.Marker({
						position: outfallLatlng,
						map: map,
						animation: google.maps.Animation.DROP,
						site: site,
						description: description,
						lat: lat,
						lng: lng,
						percent_unsafe: percent_unsafe*100,
						icon: icon,
						outfall_id: outfall_id
					});
					
					var infowindow = new google.maps.InfoWindow({
      					content: '',
      					maxWidth: 125,
      					pixelOffset: 0
  					});

					google.maps.event.addListener(outfallMarker, 'click', function() {
						boxText = document.createElement("html");
						boxText.innerHTML = 
						"<head><link href='http://fonts.googleapis.com/css?family=Muli:400,400italic' rel='stylesheet' type='text/css'><link href='/assets/application.css?body=1' media='all' rel='stylesheet'></head><body><h4 class='info_window'>Location: </h4><h3 class='info_window'>" + this.description + "</h3>" +
      							 "<h4 class='info_window'>Percentage of time water levels of <a href='/csoo'>fecal coliform</a> too high to swim: </h4><h3 class='info_window'>" + this.percent_unsafe + "%</h3></body>";
						infowindow.setContent(boxText);
						infowindow.open(map,this);
					});

		        }
			});




		})
	}



});