/** @format */

/**
 * Context used to simulate a World
 */
module.exports = class WorldContext {
  constructor(params) {
    //AssetsManager
    this.assetsManager = params.assetsManager;

    //World
    this.world = params.world;

    //Current delta time
    this.dt = 0;

    //Commands
    this.commands = [];

    //Modules
    this.bundles = params.bundles;
  }

  /**
   *
   * @returns {AssetsManager}
   */
  getAssetsManager() {
    return this.assetsManager;
  }

  /**
   *
   * @returns {World}
   */
  getWorld() {
    return this.world;
  }

  /**
   *
   * @param {World} world
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   *
   * @returns {Number}
   */
  getDt() {
    return this.dt;
  }

  /**
   *
   * @param {Number} value
   */
  setDt(value) {
    this.dt = value;
  }

  /**
   *
   * @returns {Array[Command]}
   */
  getCommands() {
    return this.commands;
  }

  /**
   *
   * @returns {Library}
   */
  getBundles() {
    return this.bundles;
  }
};
