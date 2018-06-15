function calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService.route({
        origin: document.getElementById('adrDepart').value,
        destination: document.getElementById('adrArrivee').value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var distanceTxt = response.routes[0].legs[0].distance.text;
            var distance;
            if (distanceTxt.includes("km")){
                distance = distanceTxt.replace(" km", "");
            }
            else {
                distanceTxt = distanceTxt.replace(" m", "");
                console.log(distanceTxt);
                distance = Number(distanceTxt) / 1000
            }
            $('#distance').text(distance+ "km");
            $('#modalDistance').modal('show');
            console.log(distance);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


function calculOdometre(){
    var valeurD = $('#odoDepart').val();
    var valeurA = $('#odoArrivee').val();
    var distance = valeurA - valeurD;

    $('#distance').text(distance+ "km");
    $('#modalDistance').modal('show');
}