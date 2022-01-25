# Cahier Des Charges



## Contexte et définition du problème

Dans le cadre d'un projet de visualisation de données sur la région de Lyon, le client souhaite pouvoir combiner deux vues 3D (deck.gl, UD-Viz), qui, de par leur superposition, permettront d'apporter des informations complémentaires sur la carte.

## Objectif du projet

La réalisation de cette superposition se décompose en deux axes majeurs qui devront se dérouler chronologiquement l'une après l'autre: la compréhension du fonctionnement de deck.gl et de UD-Viz qui sont les deux vues 3D mentionnées précédemment puis l'intégration de deck.gl dans UD-Viz.

## Périmètre

Le projet est restreint à deux librairies Javascript: deck.gl et UD-Viz (basé sur iTown). Chacune remplit un rôle ; deck.gl permet de faire de l'affichage de données dynamique tandis que UD-Viz est utilisée pour visualiser des données urbaines.



## Technologies

### Deck.gl

#### 1 - Définition

Deck.gl est un framework basé sur WebGL pour l'analyse visuelle exploratoire de grands ensembles de données. Il est conçu pour simplifier la visualisation haute performance de grands ensembles de données. Les utilisateurs peuvent obtenir rapidement des résultats visuels impressionnants avec un minimum d'effort en composant des couches existantes, ou tirer parti de l'architecture extensible de Deck.gl pour répondre à des besoins personnalisés.

#### 2 - Fonctionnalités

Deck.gl propose un vaste catalogue de "couches" de visualisation préemballées, notamment `ScatterplotLayer`, `ArcLayer`, `TextLayer`, `GeoJsonLayer`, etc. L'entrée d'une couche est généralement un tableau d'objets JSON. Chaque couche offre une API très flexible pour personnaliser la façon dont les données doivent être rendues.

#### 3 - Modules

Deck.gl est l'un des principaux framework de la suite de cadres Vis.gl. Vis.gl est une suite de framewrok de visualisation géospatiale à code source ouvert, composables et interopérables, centrés sur deck.gl.Deck.gl est développé en parallèle avec un certain nombre de modules, y compris :

- luma.gl : Une bibliothèque WebGL à usage général conçue pour être interopérable à la fois avec l'API WebGL brute et (dans la mesure du possible) avec d'autres bibliothèques WebGL. En particulier, luma.gl ne revendique pas la propriété du contexte WebGL, et peut fonctionner avec n'importe quel contexte fourni, y compris les contextes créés par l'application ou d'autres bibliothèques WebGL.
- loaders.gl : Une suite de chargeurs indépendants du cadre pour les formats de fichiers axés sur la visualisation de données volumineuses, notamment les nuages de points, les géométries 3D, les images, les formats géospatiaux ainsi que les données tabulaires.
- react-map-gl : Un wrapper React autour de Mapbox GL qui fonctionne de manière transparente avec deck.gl.
- nebula.gl : Un cadre d'édition de caractéristiques haute performance pour deck.gl.



### UD-Viz : Urban Data Vizualisation

UD-Viz est une bibliothèque JavaScript basée sur iTowns, publiée sur le référentiel de packages npm, permettant de visualiser, d'analyser et d'interagir avec des données urbaines.

Notre projet intègre cette bibliothèque. Nous nous sommes basés sur `UD-Viz-Template` pour commencer notre développement en suivant les étapes suivantes :

###### 1 - Cloner UD-Viz et UD-Viz-Template dans le répertoire du projet.

```bash
git clone https://github.com/VCityTeam/UD-Viz.git
git clone https://github.com/VCityTeam/UD-Viz-Template.git

rm -r UD-Viz/.git UD-Viz-Template/.git
```

###### 2 - Ajouter la dépendance de UD-Viz dans UD-Viz-Template/package.json

```JSON
  "dependencies": {
    "@egjs/hammerjs": "^2.0.17",
    "keycharm": "^0.4.0",
    "timsort": "^0.3.0",
    "ud-viz": "./../UD-Viz",
    "uuid": "^8.3.2",
    "vis-util": "^5.0.2"
  },
```
Le projet `UD-Viz-Template` contient un fichier JS `src/bootstrap.js` permettant d'instancier un objet de type `AllWidget` et de faire appel à une fonction`start()` qui prend en paramètre le chemin vers un fichier json `../assets/config/config.json` contenant un ensemble d'informations à savoir :

*   Un tableau `3DTitleLayers` contenant les l'URL vers les données des différents quartiers de Lyon:

```JSON
  "3DTilesLayers": [
    {
      "id": "Lyon-1",
      "url": "https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2015/Lyon-1_2015/tileset.json",
      "color": "0xFFFFFF"
    },
    {
      "id": "Lyon-2",
      "url": "https://dataset-dl.liris.cnrs.fr/three-d-tiles-lyon-metropolis/2015/Lyon-2_2015/tileset.json",
      "color": "0xFFFFFF"
    },
    ...    
]
```

- Un objet `extents` pour définir les coordonnées géographiques de la scène:
```JSON
  "extents": {
    "min_x": "1837860.980127206",
    "max_x": "1851647",
    "min_y": "5169347.4265999",
    "max_y": "5180575"
  },
```
- Une propriété projection pour définir le type de la projection utilisée:

```JSON
"projection": "EPSG:3946",
```

- Un objet camera pour déterminer la position de la caméra:
```JSON
  "camera": {
    "position": {
      "range": "3000",
      "heading": "-49.6",
      "tilt": "17"
    }
  },
```



## Description fonctionnelle des besoins

Les besoins formulés par le client dans le cadre de notre projet sont : 

- Enrichissement de la vue actuelle par la superposition de deux vues 3D.

- Intégration de données provenant de sources différentes.

    


## Délais

La première étape du projet - la découverte du fonctionnement de deck.gl et de UD-Viz - a été menée à bien en date du 24 novembre 2021.



## Références

[https://deck.gl/docs](https://deck.gl/docs)

https://vis.gl/frameworks

[Demonstrations provided with UDSV](https://github.com/VCityTeam/UD-Viz-Template)
