const path = require("path");
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

const webpack = require('webpack');

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = ({ config, mode }) => {
  config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [['react-app', { flow: false, typescript: true }]],
          plugins: [
            [
              "module-resolver",
              {
                "alias": {
                  "react-native": "./node_modules/react-native-web",
                  "react-native-fs": "./.storybook/fs",
                 // Brought in from tsconfig "paths"
                  "@components/*": "./src/components/*",
                  "@constants": "./src/constants",
                  "@constants/*": "./src/constants/*",
                  "@entities": "./src/entities",
                  "@entities/*": "./src/entities/*",
                  "@hooks": "./src/hooks",
                  "@hooks/*": "./src/hooks/*",
                  "@types": "./src/types",
                  "@types/*": "./src/types/*",
                  "@utils": "./src/utils",
                  "@utils/*": "./src/utils/*",
                  "@store": "./src/store",
                  "@store/*": "./src/store/*",
                  "@assets/*": "./assets/*",
                  "@services": "./src/services",
                  "@services/*": "./src/services/*"
                }
              }
            ]
          ],
          cacheDirectory: true,
        },
      },
  );

      console.log(resolveApp('../node_modules/react-native-vector-icons'));

  config.module.rules.push({
    test: /\.(js|jsx|mjs)$/,
    exclude: /node_modules\/(?!(react-native-elements|react-native-vector-icons)\/).*/,
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      presets: [
        'react-app',
      ],
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


  config.module.rules.push(

      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: "url-loader",
          options: { name: "[name].[ext]" }
        }
      }
  );

  config.resolve.extensions.push('.ts', '.tsx', '.js');

  return config;
};
