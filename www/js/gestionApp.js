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

$('#retour1').click(function(){
    $('#accueil').removeClass('hidden');
    $('#suivi').addClass('hidden');
    supprimerParcours();
});


$('#calculBtn').click(function(){
    $('#calcul').removeClass('hidden');
    $('#accueil').addClass('hidden');
});

$('#retour2').click(function(){
    $('#accueil').removeClass('hidden');
    $('#calcul').addClass('hidden');
});