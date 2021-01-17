const path = require('path');
const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning")

class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/
    function doneHook(stats) {
      stats.compilation.warnings = stats.compilation.warnings.filter(function(warn) {
        if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
          return false
        }
        return true;
      })
    }
    if (compiler.hooks) {
      compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook)
    } else {
      compiler.plugin("done", doneHook)
    }
  }
}

module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
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
              'react-i18next': './.storybook/react-i18next',
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

  config.module.rules.push({
    test: /\.(js|jsx|mjs)$/,
    exclude: /node_modules\/(?!(react-native-elements|react-native-vector-icons|react-native-safe-area-view|react-native-dynamic|react-native-responsive-ui|react-native-paper|@react-navigation\/native|)\/).*/,
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

  // The file loader baked-in does not load images properly. Replacing it fixes image loading
  const fileLoaderIndex = config.module.rules.findIndex(rule => rule.test.toString().includes('png'));

  config.module.rules[fileLoaderIndex] = {
    test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
    use: {
      loader: 'file-loader',
      options: {name: '[name].[ext]'},
    },
  };

  config.resolve.extensions.push('.ts', '.tsx', '.js');

  // Silence an error in CI Storybook build
  config.plugins.push(new IgnoreNotFoundExportPlugin(['AuroraDataApiPostgresDriver']));

  return config;
};
