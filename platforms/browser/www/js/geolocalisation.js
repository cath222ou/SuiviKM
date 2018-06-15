var watchId;
var points = [];

//Début du suivi GPS
$('#gps').click(function(){
    watchId = navigator.geolocation.watchPosition(geolocationSuccess,
        onError,
        {timeout: 5000});
    $('#gps').addClass('hidden');
    $('#gpsFin').removeClass('hidden');
    points = [];
});


//Creation de point sur la carte de la géolocalisation
function geolocationSuccess(position) {
    var features = sourceVector.getFeatures();
    var featureToUpdate = features[0];

    //Position retourner par la fonction navigator.geolocation.watchPosition
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lon, lat);

    var coord = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
    points.push(coord);
    featureToUpdate.getGeometry().setCoordinates(points);

    map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(16);
}

function supprimerParcours(){
    var features = sourceVector.getFeatures();
    var featureToUpdate = features[0];
    map.getView().setCenter(ol.proj.transform([-77.8, 48.1], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(12);
    points = [];
    featureToUpdate.getGeometry().setCoordinates(points);
}


//Erreur de localisation
function onError(error) {
    console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    if (error.code == 3){
        alert('Localisation impossible. Veuillez vérifier que votre GPS est activé sur votre appareil mobile')
    }
}

//Fin de suivi GPS et effacer le point sur la carte de la géolocalisation
$('#gpsFin').click(function(){
    endLocalisation();
    var features = sourceVector.getFeatures();
    var featureToUpdate = features[0];
    var longueur = featureToUpdate.getGeometry().getLength()/1000;
    var longueurArr = longueur.toFixed(2)
    $('#distance').text(longueurArr+ "km")

    map.getView().fit(featureToUpdate.getGeometry(), map.getSize())
});

function endLocalisation(){
    $('#gpsFin').addClass('hidden');
    $('#gps').removeClass('hidden');
    navigator.geolocation.clearWatch(watchId);
}