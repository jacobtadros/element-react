module.exports = function (api) {
  api.cache(true);

  return {
    "presets": [
      "@babel/env",
      "@babel/preset-react",
      // ["@babel/preset-typescript", { "allExtensions": true, "isTSX": true }],
      "@babel/preset-flow"
    ],
    "plugins": [
      // "@babel/plugin-syntax-typescript",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  }
}