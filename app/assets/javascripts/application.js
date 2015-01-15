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
//= require turbolinks
//= require_tree .

$(function() {
	
	$( ".bucket_nav" ).on( "click", function(){
		$( ".bucket_drop" ).show();
	});

	$( ".settings_nav" ).on( "click", function(){
		$( ".settings_drop" ).show();
	});

	$( ".close" ).on( "click", function(){
		$( ".bucket_drop" ).hide();
	});

	$( ".close" ).on( "click", function(){
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

		var marker;

		function placeMarker(location) {
		console.log("function in place marker")
		  if ( marker ) {
		    marker.setPosition(location);
		  } else {
		    marker = new google.maps.Marker({
		      position: location,
		      map: map
		    });
		  }
		}

		google.maps.event.addListener(map, 'click', function(event) {
		  placeMarker(event.latLng);
		  window.location.href = "http://localhost:3000/fishes/new";
		});

	};

	if ("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(function(position){
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			map.setCenter(new google.maps.LatLng( latitude, longitude ) );

			var geocoder = new google.maps.Geocoder();
			var address = "new york";
			var lat1 = undefined;
			var lon1 = undefined;

			geocoder.geocode( { 'address': address}, function(results, status) {

				if (status == google.maps.GeocoderStatus.OK) {
				    lat1 = results[0].geometry.location.latitude;
				    lon1 = results[0].geometry.location.longitude;
				} 
			}); 
		})
	}




	// $.ajax({
	// 	type: "GET",
	// 	url: "/show",
	// })
	// .done(function( object ) {
	// 	console.log(object)
	// 	alert( object.latitude );
	// });


});