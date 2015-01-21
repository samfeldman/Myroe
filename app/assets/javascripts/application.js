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
	
	$( ".bucket_nav" ).on( "click", function(){
		$( ".bucket_drop" ).show();
	});

	$( ".settings_nav" ).on( "click", function(){
		$( ".settings_drop" ).show();
	});

	$( ".bucket_close" ).on( "click", function(){
		$( ".bucket_drop" ).hide();
	});

	$( ".settings_close" ).on( "click", function(){
		$( ".settings_drop" ).hide();
	});

	var latitude = 0;
	var longitude = 0;
	var map;
	var markers =[];

	google.maps.event.addDomListener(window, 'load', initialize);

	function initialize() {
		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(latitude, longitude)
		};

		map = new google.maps.Map(document.getElementById('mapdiv'),
	                          	  mapOptions);

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
			window.location.href = "http://localhost:3000/fishes/new?lat="+ event.latLng.k+"&lng="+ event.latLng.D;
		});


		$( ".java_fish" ).on( "click", function(event){
			event.preventDefault();
			map.setCenter({lat: parseFloat(this.dataset.lat), lng: parseFloat(this.dataset.lng)});
		});

		var fishscrollid = window.location.search.split("?fish_id=")[1];
		console.log(fishscrollid);
		if (fishscrollid) {
			$('.catches').scrollTop($('.fish-'+fishscrollid).offset().top);
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
			.done(function( fishes ) {
				for(var i = 0; i < fishes.length; i++){
					var image = '/fishicon.png'
					var fish_type = fishes[i].fish_type;
					var number = fishes[i].number;
					var user_id = fishes[i].user_id;
					var weather = fishes[i].weather;
					var comments = fishes[i].comments;
					var time_caught = fishes[i].time_caught;
					var fish_id = fishes[i].id;
					var fishLat = fishes[i].lat;
					var fishLong = fishes[i].long;
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
					
					google.maps.event.addListener(fishMarker, 'click', function() {
						window.location.href = "http://localhost:3000/users/" + this.user_id + "?fish_id=" + this.fish_id
					});

		        }
			});


			$.ajax({
				type: "GET",
				url: "/outfalls",
			})
			.done(function( outfalls ) {
				for(var i = 0; i < outfalls.length; i++){
					var image = '/outfall.png'
					var fish_type = fishes[i].fish_type;
					var number = fishes[i].number;
					var user_id = fishes[i].user_id;
					var weather = fishes[i].weather;
					var comments = fishes[i].comments;
					var time_caught = fishes[i].time_caught;
					var fish_id = fishes[i].id;
					var fishLat = fishes[i].lat;
					var fishLong = fishes[i].long;
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
					
					google.maps.event.addListener(fishMarker, 'click', function() {
						window.location.href = "http://localhost:3000/users/" + this.user_id + "?fish_id=" + this.fish_id
					});

		        }
			});




		})
	}



});