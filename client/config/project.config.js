const path = require('path');
const { argv } = require('yargs');

const NODE_ENV = process.env.NODE_ENV || 'development';
const __DEV__ = NODE_ENV === 'development';

const config = {
  argv,
  env: NODE_ENV,
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
};

config.globals = {
  // ----------------------------------
  // Globals
  // ----------------------------------
  __DEV__,
};

// ------------------------------------
// Utilities
// ------------------------------------
function base(...paths) {
  return path.join(config.path_base, ...paths);
}

config.paths = {
  base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
};

module.exports = config;
