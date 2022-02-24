# Readme

<div style="text-align: center">
	Superposition de vues 3D - DeckGL & UD-Viz
</div>



### Lancement du projet



→ Dans `UD-Viz`

```bash
yarn
yarn run build-debug
# debug fait tourner nodemon qui repackage le projet a chaque changement.
# compte tenu du poids de cette dernière, ce n'est pas la meilleure option
```



→ Dans `UD-Viz-Template`

```
yarn
yarn run debug
```



## Intégration

### Approche #1

#### Etape 0

Ajout de deckGL

```js
let deckgl = undefined;
// ...
deckglLayers() {
    deckgl = new Deck({
        // mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        initialViewState: {
          longitude: 4.828491,
          latitude: 45.756026,
          zoom: 11,
          maxZoom: 20,
          pitch: 0,
          bearing: 0
        },  
        canvas: 'deck-canvas',
        width: '100%',
        height: '100%',
        map: false,
        controller: true,
        onViewStateChange: ({viewState}) => {
          return viewState;
        },
        layers: [new LayersDeckGL.GeoJsonLayer(
          {
            id: 'GeoJsonLayer',
            data: 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=car_care.carcmp_latest&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4326',
            extruded: true,
            filled: true,
            getElevation: 30,
            getFillColor: [255, 255, 255, 255],
            getPointRadius: 12,
            getText: f => f.properties.nom,
            getTextSize: 11,
            getTextColor: [231, 111, 81, 256],
            getTextAlignmentBaseline : 'bottom',
            lineWidthMinPixels: 2,
            lineWidthScale: 20,
            pointRadiusUnits: 'pixels',
            pointType: 'circle+text',
            stroked: false,
            pickable: true,
            autoHighlight: true,
          }
        )]
      });
    
    return deckgl;
}
```



#### Etape 1

Ajout d'un canvas pour DeckGL dans `UD-Viz/src/AllWidget.js`

```html
<section id="${this.contentSectionId}">
	<div id="${this.viewerDivId}"></div>
    <div id="container">
		<div id="map"></div>
        <!-- Ajout du canvas DeckGL -->
		<canvas id="deck-canvas"></canvas>
    </div>
</section>
```

*Cosmétique*

Afin d'éviter que les données DeckGL passent au dessus du header, on modifie ce dernier avec `z-index=4`.

```html
<header id="${this.headerId}" style="z-index: 4">
```



#### Etape 2

On veut pouvoir écouter l'évènement de drag de la carte UD-Viz.

Dans `UD-Viz/node_modules/itowns/lib/Controls/PlanarControls.js`, on modifie la méthode *update* afin d'y ajouter le code suivant:

```js
this.view.onMovementCallback();
```



Ensuite, dans `UD-Viz/src/Templates/AllWidget/AllWidget.js`, on rajoute le code de notre callback:

```js
this.view.onMovementCallback = () => {
    if (deckgl == undefined) return;
    
    const cam3D = this.view.camera.camera3D; // contient la position de UD-Viz en EPSG:3946
    
    const pos = from3946to4326([cam3D.position.x, cam3D.position.y]);
    
    
    const dirCam = cam3D.getWorldDirection(new THREE.Vector3());
    const axis = new THREE.Vector3(0, 0, -1);
	const pitch = Math.acos(dirCam.dot(axis));	
	const magicNumber = 64118883.098724395;
	const o = proj4
    	.default(this.config['projection'])
        .inverse(cam3D.position.clone());
	deckgl.setProps({ 
        initialViewState: {
          longitude: o.x,
          latitude: o.y,
          zoom: Math.log((2 * magicNumber) / cameraItowns.position.z) / Math.log(2),
          pitch: (pitch * 180) / Math.PI,
	}
}
```

>   Avec cette approche inspirée par le code existant, nous avons un effet de parallax
>
>   -   D'après les travaux empiriques de A. Barrache, il est difficile d'avoir une superposition correcte des deux vues.
>   -   Nous avions de base essayé d'utiliser une fonction de transformation affine mais sans succès. Les points DeckGL avaient tendance à "fuir" en dehors de l'écran.



### Approche #2

Une piste prometteuse se base sur le clipping des deux vues en CSS. Au lieu de procéder à des transformations, il suffit d'ajuster initialement les deux vues et de laisser les mouvements faits sur UD-Viz bouger le layer sous-jacent (DeckGL).



#### Etape 1

Cela est fait en changeant la propriété CSS "position" du container:

```css
    #container {
      position: fixed; /* supprimer cette propriété */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
```

On utilise la position initiale `const initialPos = [4.879038365526159, 45.75702216916448]` pour les ArcsLayers.

>   Il subsiste un léger décalage des points



#### Etape 2

Dans le OnViewStateChange de DeckGL, on ajoute le code suivant:

```js
const cam3D = this.view.camera.camera3D;
const prev = itowns.CameraUtils.getTransformCameraLookingAtTarget(this.view, cam3D);
const newPos = prev;
newPos.coord = new itowns.Coordinates('EPSG:4326', viewState.longitude, viewState.latitude, 0).as('EPSG:3946');

newPos.heading = viewState.bearing;
// newPos.tilt = this.clamp((90 - viewState.pitch), 0, 90);
newPos.tilt = 90
itowns.CameraUtils.transformCameraToLookAtTarget(this.view, cam3D, newPos);
```

