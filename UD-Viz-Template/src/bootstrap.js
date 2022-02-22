/** @format */

import * as udviz from '../../UD-Viz/dist/debug/udv';



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

  console.log("app.controls", app.controls._handlerUpdate);
  app.controls._handlerUpdate = () => {
    console.log("update");
  }

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
  
  console.log("cameraPosition: ", cameraPosition);


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

  // geocodingView.addPin(geocodingView.getWorldCoordinates(45.7557226, 4.830938));

  const pin1 = geocodingView.getWorldCoordinates(45.76525, 4.8775179);
  geocodingView.addPin(pin1);
  geocodingView.addPin(pin1);
  geocodingView.addPin(pin1);
  geocodingView.addPin(pin1); 

  // const pin2 = geocodingView.getWorldCoordinates(45.7432992, 4.8405543);
  // geocodingView.addPin(pin2);
  // geocodingView.addPin(pin2);
  // geocodingView.addPin(pin2);
  // geocodingView.addPin(pin2); 

});




