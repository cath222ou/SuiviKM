var geocoder,Lat, lon,lonLat, coordonnee;
geocoder = new google.maps.Geocoder();

//////////////DEPART/////////////////

// valeur des champs adresse, lat et lon
function update_ui( address, latLng ) {
    $('#adrDepart').autocomplete("close");
    $('#adrDepart').val(address);
}

function geocodage( type, value, update ) {

    update = typeof update !== 'undefined' ? update : false;
    request = {address: address, componentRestrictions: {country:  'ca'}};
    request[type] = value;

    geocoder.geocode(request, function(results, status) {

        $('#gmaps-error').html('');
        $('#gmaps-error').hide();
        if (status == google.maps.GeocoderStatus.OK) {
            // Google geocoding has succeeded!
            if (results[0]) {
                // Always update the UI elements with new location data
                update_ui( results[0].formatted_address,results[0].geometry.location );
                // Only update the map (position marker and center map) if requested
                if( update ) { MAJ_map( lonLat ) }
            } else {
                // Geocoder status ok but no results!?
                $('#error').html("Une erreur est survenue. Essayez encore!");
                $('#error').show();
            }
        } else {
            // Echec du géocodage pour 2 raisons:
            //   * Addresse invalide  (par exemple 'zxxzcxczxcx')
            //   * position n'ayant pas d'adresse civique
            if( type == 'address' ) {
                // Adresse érroné
                $('#error').html("Désolé! Impossible de géocoder " + value + ". Essayer une autre adresse." );
                $('#error').show();
            } else {
                // User has clicked or dragged marker to somewhere that Google can't do a reverse lookup for
                // In this case we display a warning, clear the address box, but fill in LatLng
                $('#error').html("Woah... that's pretty remote! You're going to have to manually enter a place name." );
                $('#error').show();
                update_ui('', value)
            }
        };
    });
}


/////////////////ARRIVEEE///////////////////3
// valeur des champs adresse, lat et lon
function update_uiArr( address, latLng ) {
    $('#adrArrivee').autocomplete("close");
    $('#adrArrivee').val(address);
}

function geocodageArr( type, value, update ) {

    update = typeof update !== 'undefined' ? update : false;
    request = {address: address, componentRestrictions: {country:  'ca'}};
    request[type] = value;

    geocoder.geocode(request, function(results, status) {

        $('#gmaps-error').html('');
        $('#gmaps-error').hide();
        if (status == google.maps.GeocoderStatus.OK) {
            // Google geocoding has succeeded!
            if (results[0]) {
                // Always update the UI elements with new location data
                update_uiArr( results[0].formatted_address,results[0].geometry.location );
                // Only update the map (position marker and center map) if requested
                if( update ) { MAJ_map( lonLat ) }
            } else {
                // Geocoder status ok but no results!?
                $('#error').html("Une erreur est survenue. Essayez encore!");
                $('#error').show();
            }
        } else {
            // Echec du géocodage pour 2 raisons:
            //   * Addresse invalide  (par exemple 'zxxzcxczxcx')
            //   * position n'ayant pas d'adresse civique
            if( type == 'address' ) {
                // Adresse érroné
                $('#error').html("Désolé! Impossible de géocoder " + value + ". Essayer une autre adresse." );
                $('#error').show();
            } else {
                // User has clicked or dragged marker to somewhere that Google can't do a reverse lookup for
                // In this case we display a warning, clear the address box, but fill in LatLng
                $('#error').html("Woah... that's pretty remote! You're going to have to manually enter a place name." );
                $('#error').show();
                update_uiArr('', value)
            }
        };
    });
}





// initialise the jqueryUI autocomplete element
function autocomplete_init() {
    $("#adrDepart").autocomplete({
        source: function(request,response) {
            // the geocode method takes an address or LatLng to search for and a callback function which should process the results into a format accepted by jqueryUI autocomplete
            geocoder.geocode( {'address': request.term, 'componentRestrictions': {country:  'CA'} }, function(results, status) {
                response($.map(results, function(item) {
                    return {
                        label: item.formatted_address, // appears in dropdown box
                        value: item.formatted_address, // inserted into input element when selected
                        geocode: item                  // all geocode data: used in select callback event
                    }
                }));
            })
        },
        // event triggered when drop-down option selected
        select: function(event,ui){
            coordonnee = [];
            update_ui(  ui.item.value, ui.item.geocode.geometry.location )
            Lat = ui.item.geocode.geometry.location.lat()
            lon= ui.item.geocode.geometry.location.lng()
            coordonnee.push(lon,Lat);
            lonLat = ol.proj.transform(coordonnee,'EPSG:4326', 'EPSG:3857');
            console.log(Lat,lon)
        }
    });
    $("#adrArrivee").autocomplete({
        source: function(request,response) {
            // the geocode method takes an address or LatLng to search for and a callback function which should process the results into a format accepted by jqueryUI autocomplete
            geocoder.geocode( {'address': request.term, 'componentRestrictions': {country:  'CA'} }, function(results, status) {
                response($.map(results, function(item) {
                    return {
                        label: item.formatted_address, // appears in dropdown box
                        value: item.formatted_address, // inserted into input element when selected
                        geocode: item                  // all geocode data: used in select callback event
                    }
                }));
            })
        },
        // event triggered when drop-down option selected
        select: function(event,ui){
            coordonnee = [];
            update_uiArr(  ui.item.value, ui.item.geocode.geometry.location )
            Lat = ui.item.geocode.geometry.location.lat()
            lon= ui.item.geocode.geometry.location.lng()
            coordonnee.push(lon,Lat);
            lonLat = ol.proj.transform(coordonnee,'EPSG:4326', 'EPSG:3857');
            console.log(Lat,lon)
        }
    });
    // triggered when user presses a key in the address box
    $("#adrArrivee").bind('keydown', function(event) {
        if(event.keyCode == 13) {
            geocodageArr( 'address', $('#adress').val(), true );
            // ensures dropdown disappears when enter is pressed
            $('#adrArrivee').autocomplete("disable")
        } else {
            // re-enable if previously disabled above
            $('#adrArrivee').autocomplete("enable")
        }
    });
};


// autocomplete_init
$(document).ready(function() {
    autocomplete_init();
});