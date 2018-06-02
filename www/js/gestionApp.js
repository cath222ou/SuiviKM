$('#suivi').addClass('hidden');

$('#suiviBtn').click(function(){
    $('#suivi').removeClass('hidden');
    $('#accueil').addClass('hidden');
    initmap();
});

$('#retour1').click(function(){
    $('#accueil').removeClass('hidden');
    $('#suivi').addClass('hidden');
    supprimerParcours();
});