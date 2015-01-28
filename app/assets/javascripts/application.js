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

	var env = $(".env").data("env");
	if (env == "development"){
		var host = "localhost:3000";
	} else {
		var host = "myroe.herokuapp.com";
	}

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