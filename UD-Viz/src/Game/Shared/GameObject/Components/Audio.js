/** @format */

const THREE = require('three');

/**
 *  Component used to handle the 3D Audio of the GameObject
 */
const AudioModule = class Audio {
  constructor(parent, json) {
    //gameobject of this component
    this.parent = parent;
    //uuid
    this.uuid = json.uuid || THREE.MathUtils.generateUUID();

    this.soundsJSON = json.sounds || [];
    this.sounds = {};

    this.conf = json.conf || {};
  }

  getSounds() {
    return this.sounds;
  }

  /**
   * This component cant run on server side
   * @returns {Boolean}
   */
  isServerSide() {
    return false;
  }

  dispose() {
    for (let key in this.sounds) {
      this.sounds[key].pause(); //TODO if shared just pause if not unload 
    }
  }

  /**
   * Compute this to JSON
   * @returns {JSON}
   */
  toJSON() {
    return {
      uuid: this.uuid,
      sounds: this.soundsJSON,
      conf: this.conf,
      type: AudioModule.TYPE,
    };
  }

  /**
   * Initialize
   * @param {AssetsManager} assetsManager local assetsManager
   * @param {Shared} udvShared ud-viz/Game/Shared module
   */
  initAssets(assetsManager, udvShared) {
    const _this = this;
    this.soundsJSON.forEach(function (idS) {
      _this.sounds[idS] = assetsManager.fetchSound(idS, _this.conf);
    });
  }

  tick(cameraMatrixWorldInverse, refOrigin) {
    const goPos = this.parent.getPosition().clone();
    goPos.add(refOrigin);
    const positionAudio = goPos.clone().applyMatrix4(cameraMatrixWorldInverse);

    for (let key in this.sounds) {
      const sound = this.sounds[key];

      if (sound.state() != 'loaded') continue;

      if (this.conf.autoplay && !sound.playing()) sound.play();
      if (this.conf.volume) sound.volume(this.conf.volume);

      //https://github.com/goldfire/howler.js#documentation
      if (this.conf.spatialized) {
        sound.pos(positionAudio.x, positionAudio.y, positionAudio.z);
      }
    }
  }

  updateFromComponent() {
    //nada
  }

  getUUID() {
    return this.uuid;
  }
};

AudioModule.TYPE = 'Audio';

module.exports = AudioModule;
