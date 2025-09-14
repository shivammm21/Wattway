// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Keep only the Worklets plugin; Reanimated plugin has been moved here
      "react-native-worklets/plugin",
    ],
  };
};
