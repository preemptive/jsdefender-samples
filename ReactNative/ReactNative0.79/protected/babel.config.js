module.exports = function(api) {
  api.cache(true);
  
  const presets = ['module:@react-native/babel-preset'];
  const plugins = [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  ];

  return {
    presets,
    plugins
  };
};