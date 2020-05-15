module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@entities': './src/entities',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@utils': './src/utils',
          '@store': './src/store',
          '@assets': './assets',
          '@services': './src/services',
        },
      },
    ],
  ],
};
