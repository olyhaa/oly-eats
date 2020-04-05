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
  dir_static: 'src/static', // TODO not sure if we need this?
  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_hmr: __DEV__ || argv.hmr, // TODO finish proper support for this flag
  compiler_linter: argv.lint !== false && __DEV__, // TODO finish support for this flag
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
  config: base.bind(null, config.dir_config),
  static: base.bind(null, config.dir_static),
};

module.exports = config;
