const path = require("path");

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
                }
              }
            ]
          ],
          cacheDirectory: true,
        },
      },
  );

  config.module.rules.push(
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: [/node_modules/],
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: ['react-app'],
          plugins: [
            [
              "module-resolver",
              {
                "alias": {
                  "react-native": "./node_modules/react-native-web",
                }
              }
            ]
          ],
          cacheDirectory: true,
        },
      },
  );


  config.module.rules.push(

      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: "url-loader",
          options: { name: "[name].[ext]" }
        }
      }
  );

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
