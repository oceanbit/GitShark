/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const extraNodeModules = {
  githubIssues: path.resolve(__dirname + '/.github/ISSUE_TEMPLATE'),
};
const watchFolders = [path.resolve(__dirname + '/.github/ISSUE_TEMPLATE')];

// get defaults assetExts array
const defaultAssetExts = require('metro-config/src/defaults/defaults')
  .assetExts;

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
    assetExts: [
      ...defaultAssetExts, // <- array spreading defaults
      'md',
    ],
  },
  watchFolders,
};
