/** @format */

import * as udviz from 'ud-viz';



const app = new udviz.Templates.AllWidget();

app.start('../assets/config/config.json').then((config) => {
  app.addBaseMapLayer();

  app.addElevationLayer();

  app.setupAndAdd3DTilesLayers();

  ////// REQUEST SERVICE
  const requestService = new udviz.Components.RequestService();

  ////// AUTHENTICATION MODULE
  const authenticationService =
    new udviz.Widgets.Extensions.AuthenticationService(
      requestService,
      app.config
    );

  const authenticationView = new udviz.Widgets.Extensions.AuthenticationView(
    authenticationService
  );
  app.addModuleView('authentication', authenticationView, {
    type: udviz.Templates.AllWidget.AUTHENTICATION_MODULE,
  });

  ////// DOCUMENTS MODULE
  let documentModule = new udviz.Widgets.DocumentModule(
    requestService,
    app.config
  );
  app.addModuleView('documents', documentModule.view);

  ////// DOCUMENTS VISUALIZER EXTENSION (to orient the document)
  const imageOrienter = new udviz.Widgets.DocumentVisualizerWindow(
    documentModule,
    app.view,
    app.controls
  );

  ////// CONTRIBUTE EXTENSION
  new udviz.Widgets.Extensions.ContributeModule(
    documentModule,
    imageOrienter,
    requestService,
    app.view,
    app.controls,
    app.config
  );

  ////// VALIDATION EXTENSION
  new udviz.Widgets.Extensions.DocumentValidationModule(
    documentModule,
    requestService,
    app.config
  );

  ////// DOCUMENT COMMENTS
  new udviz.Widgets.Extensions.DocumentCommentsModule(
    documentModule,
    requestService,
    app.config
  );

  ////// GUIDED TOURS MODULE
  const guidedtour = new udviz.Widgets.GuidedTourController(
    documentModule,
    requestService,
    app.config
  );
  app.addModuleView('guidedTour', guidedtour, {
    name: 'Guided Tours',
  });

  ////// GEOCODING EXTENSION
  const geocodingService = new udviz.Widgets.Extensions.GeocodingService(
    requestService,
    app.extent,
    app.config
  );
  const geocodingView = new udviz.Widgets.Extensions.GeocodingView(
    geocodingService,
    app.controls,
    app.view
  );
  app.addModuleView('geocoding', geocodingView, {
    binding: 's',
    name: 'Address Search',
  });

  ////// CITY OBJECTS MODULE
  let cityObjectModule = new udviz.Widgets.CityObjectModule(
    app.layerManager,
    app.config
  );
  app.addModuleView('cityObjects', cityObjectModule.view);

  ////// LINKS MODULE
  new udviz.Widgets.LinkModule(
    documentModule,
    cityObjectModule,
    requestService,
    app.view,
    app.controls,
    app.config
  );

  ////// 3DTILES DEBUG
  const debug3dTilesWindow = new udviz.Widgets.Extensions.Debug3DTilesWindow(
    app.layerManager
  );
  app.addModuleView('3dtilesDebug', debug3dTilesWindow, {
    name: '3DTiles Debug',
  });

  ////// CAMERA POSITIONER
  const cameraPosition = new udviz.Widgets.CameraPositionerView(
    app.view,
    app.controls
  );
  app.addModuleView('cameraPositioner', cameraPosition);

  ////// LAYER CHOICE MODULE
  const layerChoice = new udviz.Widgets.LayerChoice(app.layerManager);
  app.addModuleView('layerChoice', layerChoice);

  ////// HELP MODULE
  const help = new udviz.Widgets.Extensions.HelpWindow(config.helpWindow);
  app.addModuleView('help', help);
  
  ////// ABOUT MODULE
  const about = new udviz.Widgets.AboutWindow();
  app.addModuleView('about', about);
  
  
  app.deckglLayers();

  const pin1 = geocodingView.getWorldCoordinates(45.749843, 4.823851);
  geocodingView.addPin(pin1);
  geocodingView.addPin(pin1);
  geocodingView.addPin(pin1);
  geocodingView.addPin(pin1);  
  
  const pin2 = geocodingView.getWorldCoordinates(45.7557226, 4.830938);
  geocodingView.addPin(pin2);
  geocodingView.addPin(pin2);
  geocodingView.addPin(pin2);
  geocodingView.addPin(pin2);  
  
  const pin3 = geocodingView.getWorldCoordinates(45.7590861, 4.8437646);
  geocodingView.addPin(pin3);
  geocodingView.addPin(pin3);
  geocodingView.addPin(pin3);
  geocodingView.addPin(pin3);  
  
  const pin4 = geocodingView.getWorldCoordinates(45.7590405, 4.8661112);
  geocodingView.addPin(pin4);
  geocodingView.addPin(pin4);
  geocodingView.addPin(pin4);
  geocodingView.addPin(pin4);  
  
  const pin5 = geocodingView.getWorldCoordinates(45.7758558, 4.8306441);
  geocodingView.addPin(pin5);
  geocodingView.addPin(pin5);
  geocodingView.addPin(pin5);
  geocodingView.addPin(pin5);  
  
  const pin6 = geocodingView.getWorldCoordinates(45.7344648, 4.869507);
  geocodingView.addPin(pin6);
  geocodingView.addPin(pin6);
  geocodingView.addPin(pin6);
  geocodingView.addPin(pin6);  
  
  const pin7 = geocodingView.getWorldCoordinates(45.7308834, 4.8537265);
  geocodingView.addPin(pin7);
  geocodingView.addPin(pin7);
  geocodingView.addPin(pin7);
  geocodingView.addPin(pin7);  
  
  const pin8 = geocodingView.getWorldCoordinates(45.7328251, 4.8740466);
  geocodingView.addPin(pin8);
  geocodingView.addPin(pin8);
  geocodingView.addPin(pin8);
  geocodingView.addPin(pin8);  
  
  const pin9 = geocodingView.getWorldCoordinates(45.7341481, 4.8753049);
  geocodingView.addPin(pin9);
  geocodingView.addPin(pin9);
  geocodingView.addPin(pin9);
  geocodingView.addPin(pin9);  
  
  const pin10 = geocodingView.getWorldCoordinates(45.7337965, 4.8762295);
  geocodingView.addPin(pin10);
  geocodingView.addPin(pin10);
  geocodingView.addPin(pin10);
  geocodingView.addPin(pin10);  
  
  const pin11 = geocodingView.getWorldCoordinates(45.7346081, 4.8691166);
  geocodingView.addPin(pin11);
  geocodingView.addPin(pin11);
  geocodingView.addPin(pin11);
  geocodingView.addPin(pin11);

});




