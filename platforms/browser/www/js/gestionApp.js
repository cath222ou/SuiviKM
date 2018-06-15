$("#accordion").accordion(
    {
        active: 0,
        heightStyle: "content",
        autoHeight: false
    }
);


$('#suivi').addClass('hidden');

$('#suiviBtn').click(function(){
    $('#suivi').removeClass('hidden');
    $('#accueil').addClass('hidden');
    initmap();
});

$('#retourAcceuilSuivi').click(function(){
    $('#accueil').removeClass('hidden');
    $('#suivi').addClass('hidden');
    supprimerParcours();
});


$('#calculBtn').click(function(){
    $('#calcul').removeClass('hidden');
    $('#accueil').addClass('hidden');
});

$('#retourAccueilCalcul').click(function(){
    $('#accueil').removeClass('hidden');
    $('#calcul').addClass('hidden');
});

$('#infoBtn').click(function(){
    $('#info').removeClass('hidden');
    $('#accueil').addClass('hidden');
});

$('#retourAccueilTable').click(function(){
    $('#accueil').removeClass('hidden');
    $('#info').addClass('hidden');
});



//Affichage date et heure dans formulaire
var myVar = setInterval(function () {
    myTimer()
},5000);

function myTimer() {
    var today = new Date();
    var h = today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    var j = today.toLocaleDateString();
    var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+today.getDate();
    var dateControl = document.querySelector('input[type="date"]');
    dateControl.value = date;
    console.log(date)

}
