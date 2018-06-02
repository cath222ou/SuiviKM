var points = [];
var map;
var layerLine;

function initmap() {

    /** Donnée fond de carte**/
    var OSM = new ol.layer.Tile({
            source: new ol.source.OSM()
        }
    );
    OSM.setVisible(true);

    ////

    pointCoord = new ol.geom.LineString([]);

    trackFeature = new ol.Feature({
        geometry: pointCoord
    });


    sourceVector =  new ol.source.Vector({
        features: [trackFeature]
    })

    //view.setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    trackLayer = new ol.layer.Vector({
        source: sourceVector,
        visible: true,
    });

    ///



    /** Définition de l'étendue géographique pour carte **/
    var view = new ol.View({
        center: ol.proj.transform([-77.8, 48.1], 'EPSG:4326', 'EPSG:3857'),
        projection: ol.proj.get('EPSG:3857'),
        zoom: 12
    });

    /** Création de la Carte **/
    map = new ol.Map({
        target: 'map',
        renderer: 'canvas',
        layers: [OSM,trackLayer],
        view: view,
        // controls: ol.control.defaults().extend([
        // new ol.control.FullScreen(),
        // new app.RotateNorthControl(),
        // new ol.control.ScaleLine(),
        // new ol.control.ZoomSlider(),
        // mousePositionControl,
        // ]),
        interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
        ])
    });
}