// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

//Cordova ready
function onDeviceReady() {
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    //Création de la Table deplacement
    db.transaction(populateDBDeplacement, errorCB, getDeplacement);
}

//Création de la table deplacement
function populateDBDeplacement(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS deplacement (deplacement_id INTEGER PRIMARY KEY AUTOINCREMENT, date, distance, commentaire)');
}

//Création de la table demo pour visualisation dans l'application
function afficherTableDeplacement(tx, results) {
    var table01 = $('#tbl tbody');
    table01.html('');
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        table01.append(
            '<tr>'
            + '<td data-title="Identifiant" data-desc="constat_id">'+results.rows.item(i).deplacement_id +'</td>'
            + '<td data-title="Date" data-desc="user_id" class="hidden">'+results.rows.item(i).date +'</td>'
            + '<td data-title="Distance" data-desc="device_id" class="hidden">'+results.rows.item(i).distance +'</td>'
            + '<td data-title="Commentaire" data-desc="a_nom" class="hidden">'+results.rows.item(i).commentaire +'</td>'+
            '</tr>'
        );
    }
}

// Lancer la requête de sélection de tous dans la table demo
function getDeplacement(tx) {
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM deplacement', [], afficherTableDeplacement, errorCB);
    }, errorCB);
}

//Callback d'erreur générique
function errorCB(something) {
    if (typeof something == 'object') {
        something = JSON.stringify(something);
    }
    console.log(something);
}