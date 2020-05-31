const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

const webpack = require('webpack');

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: [/node_modules/],
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      presets: [['react-app', {flow: false, typescript: true}]],
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              'react-native': './node_modules/react-native-web',
              'react-native-fs': './.storybook/fs',
              'react-native-reanimated': './.storybook/reanimated',
              // https://github.com/osdnk/react-native-reanimated-bottom-sheet/issues/217
              'reanimated-bottom-sheet': './.storybook/default-noop',
              // Right now, MaskedView does not have web support. This should be fixed
              '@react-native-community/masked-view': './.storybook/masked-view',
              // https://github.com/bakerface/react-native-svg-web#readme
              'react-native-svg': 'react-native-svg-web',
              // https://github.com/react-native-web-community/react-native-web-linear-gradient#readme
              'react-native-linear-gradient':
                'react-native-web-linear-gradient',
              'react-content-loader/native': 'react-content-loader',
              // Brought in from tsconfig "paths"
              '@components': './src/components',
              '@constants': './src/constants',
              '@entities': './src/entities',
              '@hooks': './src/hooks',
              '@types': './src/types',
              '@utils': './src/utils',
              '@store': './src/store',
              '@services': './src/services',
            },
          },
        ],
      ],
      cacheDirectory: true,
    },
  });

  console.log(resolveApp('../node_modules/react-native-vector-icons'));

  config.module.rules.push({
    test: /\.(js|jsx|mjs)$/,
    exclude: /node_modules\/(?!(react-native-elements|react-native-vector-icons)\/).*/,
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      presets: ['react-app'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        [
          'module-resolver',
          {
            alias: {
              'react-native': './node_modules/react-native-web',
            },
          },
        ],
      ],
      cacheDirectory: true,
    },
  });

  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: {name: '[name].[ext]'},
    },
  });

  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'css/[name].[ext]',
        },
      },
      'css-loader',
    ],
    include: [/fonts/],
  });

  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'css/',
      publicPath: url => '../css/' + url,
    },
    include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
  });

  config.resolve.extensions.push('.ts', '.tsx', '.js');

  return config;
};
