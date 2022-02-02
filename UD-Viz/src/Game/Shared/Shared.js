/** @format */

const commnJsComponents = require('./Components/Components');

const commonJsCommand = require('./Command');

const commonJsGameObject = require('./GameObject/GameObject');

const commonJsRender = require('./GameObject/Components/Render');

const commonJsAudio = require('./GameObject/Components/Audio');

const commonJsCollider = require('./GameObject/Components/Collider');

const commonJsLocalScript = require('./GameObject/Components/LocalScript');


const commonJsWorld = require('./World');

const commonJsWorldState = require('./WorldState');

const commonJsWorldStateDiff = require('./WorldStateDiff');

const commonJsWorldStateComputer = require('./WorldStateComputer');

const THREE = require('three');

const proj4 = require('proj4');

module.exports = {
  Components: commnJsComponents,
  Command: commonJsCommand,
  GameObject: commonJsGameObject,
  Render: commonJsRender,
  ColliderModule: commonJsCollider,
  LocalScript: commonJsLocalScript,
  Audio: commonJsAudio,
  World: commonJsWorld,
  WorldState: commonJsWorldState,
  WorldStateDiff: commonJsWorldStateDiff,
  WorldStateComputer: commonJsWorldStateComputer,
  THREE: THREE,
  proj4: proj4,
};
