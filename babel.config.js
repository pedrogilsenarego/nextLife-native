module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Reanimated 4 delegates worklet transformation to react-native-worklets.
      'react-native-worklets/plugin',
    ],
  };
};
