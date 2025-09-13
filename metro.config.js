// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // let Metro handle .cjs files too, since ws sometimes ships them
  config.resolver.sourceExts.push('cjs');

  // map node built-ins to our shims folder
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    events: path.join(__dirname, 'shims/events.js'),
    stream: path.join(__dirname, 'shims/stream.js'),
    http:   path.join(__dirname, 'shims/http.js'),
    crypto: path.join(__dirname, 'shims/crypto.js'),
    // add more if you hit other missing modules
  };
  config.resolver.unstable_conditionNames = ['require', 'default', 'browser']

  return config;
})();
