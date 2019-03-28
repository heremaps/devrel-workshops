/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};
var pickup ;
var drop;
(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });
    function requestUnicorn(pickupLocation) {
        pickup = pickupLocation.latitude+","+ pickupLocation.longitude;
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/ride',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PickupLocation: {
                    Latitude: pickupLocation.latitude,
                    Longitude: pickupLocation.longitude
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }
    

    function completeRequest(result) {
        var unicorn;
        var pronoun;
        //console.log('Response received from API: ', result);
        unicorn = result.Unicorn;
        pronoun = unicorn.Gender === 'Male' ? 'his' : 'her';
        displayUpdate(unicorn.Name + ', your ' + unicorn.Color + ' unicorn, is on ' + pronoun + ' way.');
        animateArrival(function animateCallback() {
            displayUpdate(unicorn.Name + ' has arrived. Giddy up!');
            WildRydes.map.unsetLocation();
            $('#request').prop('disabled', 'disabled');
            $('#request').text('Set Pickup');
           // $('#request1').removeProp('disabled');
            document.getElementById("request1").disabled = false;
          //  $('#request1').text('Click to View Route');
        });
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        $('#request1').click(handleRequestClick1);
        $('#signOut').click(function() {
            WildRydes.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
        $(WildRydes.map).on('pickupChange', handlePickupChanged);

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handlePickupChanged() {
      // alert("Coming to me ");
        var requestButton = $('#request');
        var requestButton1 = $('#request1');
        requestButton.text('Request Unicorn');
        requestButton.prop('disabled', false);
        $("button").click(function(){
            //alert(this.id);
            if( this.id == 'request1' ) {
                requestButton1.text('View Route');
                requestButton1.prop('disabled', false);
               // requestButton1.prop('id', 'viewrouteform');
               // requestButton1.prop('onclick', 'handleviewroute');
                requestButton.prop('disabled', 'disabled');
            }
            else if(this.id == 'request')
            {
                requestButton.text('Request Unicorn');
                requestButton.prop('disabled', false);
                requestButton1.text('Set Drop');
                requestButton1.prop('disabled', 'disabled');
            }
           
            else{
                requestButton.prop('disabled', 'disabled');
                requestButton1.prop('disabled', 'disabled');
                alert("waiting for event");
            }
        });    


       //var requestButton1 = $('#request1');
      // requestButton1.text('View Route');
      // requestButton1.prop('disabled', false);
    }

    function handleRequestClick(event) {
        var pickupLocation = WildRydes.map.selectedPoint;
        event.preventDefault();
        requestUnicorn(pickupLocation);
       // requestUnicorn1(pickupLocation);
    }

    function animateArrival(callback) {
        var dest = WildRydes.map.selectedPoint;
        var origin = {};

        if (dest.latitude > WildRydes.map.center.latitude) {
            origin.latitude = WildRydes.map.extent.minLat;
        } else {
            origin.latitude = WildRydes.map.extent.maxLat;
        }

        if (dest.longitude > WildRydes.map.center.longitude) {
            origin.longitude = WildRydes.map.extent.minLng;
        } else {
            origin.longitude = WildRydes.map.extent.maxLng;
        }

        WildRydes.map.animate(origin, dest, callback);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }

    function requestUnicorn1(pickupLocation) {
        drop = pickupLocation.latitude+","+ pickupLocation.longitude;
        handleviewroute();
     }

     function handleRequestClick1(event) {
        var pickupLocation = WildRydes.map.selectedPoint;
        event.preventDefault();
        requestUnicorn1(pickupLocation);
    }

    function handleviewroute(event) {
     
       /*  var waypoint0 = $('#waypoint0').val();
        var waypoint1 = $('#waypoint1').val();
		var mode = $('#mode').val();
        var departure = $('#departure').val(); */
        
        var waypoint0 = pickup;
        var waypoint1 = drop;
		var mode = "fastest;car;traffic:enabled";
        var departure = "now";
        
        //"waypoint0": "52.5160,13.3779",
        //"waypoint1": "52.5206,13.3862",
        //"mode": "fastest;car;traffic:enabled",
        //"departure": "now"
		
      //  event.preventDefault();
        $('#sec1').css("display","none");
		$.ajax({
		url:'',  //https://xdere345g.dsfs34-api.us-east-2.amazonaws.com/Prod/routing
		  type: 'GET',
		  dataType: 'jsonp',
		  jsonp: 'jsoncallback',
		  data: {
				waypoint0: waypoint0,
				waypoint1: waypoint1,
				mode: mode,
				departure: departure,
				routeattributes : 'waypoints,summary,shape,legs'
			  },
		  success: function (data) {
					$('#main').css("display","none");
					alert("received response");
					//$("#jsonroute").append(JSON.stringify(data));
					 var route = data.response.route[0];
					 addRouteShapeToMap(route);
					 addManueversToMap(route);
				   
					 //addWaypointsToPanel(route.waypoint);
					 //addManueversToPanel(route);
					 //addSummaryToPanel(route.summary);
			
				}
			});
    }


}(jQuery));
