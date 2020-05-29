var RNFS = {
  mkdir() {
    return Promise.resolve();
  },

  moveFile() {
    return Promise.resolve();
  },

  copyFile() {
    return Promise.resolve();
  },

  pathForBundle() {
    return Promise.resolve();
  },
  pathForGroup() {
    return Promise.resolve();
  },

  getFSInfo() {
    return Promise.resolve();
  },

  getAllExternalFilesDirs() {
    return Promise.resolve();
  },

  unlink() {
    return Promise.resolve();
  },

  exists() {
    return Promise.resolve();
  },

  stopDownload() {
    return Promise.resolve();
  },

  resumeDownload() {
    return Promise.resolve();
  },

  isResumable() {
    return Promise.resolve();
  },

  stopUpload() {
    return Promise.resolve();
  },

  completeHandlerIOS() {
    return Promise.resolve();
  },

  readDir() {
    return Promise.resolve();
  },

  // Android-only
  readDirAssets() {
    return Promise.resolve();
  },

  // Android-only
  existsAssets() {
    return Promise.resolve();
  },

  // Android-only
  existsRes() {
    return Promise.resolve();
  },

  // Node style version (lowercase d). Returns just the names
  readdir() {
    return Promise.resolve();
  },

  // setReadable for Android
  setReadable() {
    return Promise.resolve();
  },

  stat() {
    return Promise.resolve();
  },

  readFile() {
    return Promise.resolve();
  },

  read() {
    return Promise.resolve();
  },

  // Android only
  readFileAssets() {
    return Promise.resolve();
  },

  // Android only
  readFileRes() {
    return Promise.resolve();
  },

  hash() {
    return Promise.resolve();
  },

  // Android only
  copyFileAssets() {
    return Promise.resolve();
  },

  // Android only
  copyFileRes() {
    return Promise.resolve();
  },

  // iOS only
  // Copies fotos from asset-library (camera-roll) to a specific location
  // with a given width or height
  // @see: https://developer.apple.com/reference/photos/phimagemanager/1616964-requestimageforasset
  copyAssetsFileIOS() {
    return Promise.resolve();
  },

  // iOS only
  // Copies fotos from asset-library (camera-roll) to a specific location
  // with a given width or height
  // @see: https://developer.apple.com/reference/photos/phimagemanager/1616964-requestimageforasset
  copyAssetsVideoIOS() {
    return Promise.resolve();
  },

  writeFile() {
    return Promise.resolve();
  },

  appendFile() {
    return Promise.resolve();
  },

  write() {
    return Promise.resolve();
  },

  downloadFile() {
    return Promise.resolve();
  },

  uploadFiles() {
    return Promise.resolve();
  },

  touch() {
    return Promise.resolve();
  },

  scanFile() {
    return Promise.resolve();
  },

  MainBundlePath: '',
  CachesDirectoryPath: '',
  ExternalCachesDirectoryPath: '',
  DocumentDirectoryPath: '',
  ExternalDirectoryPath: '',
  ExternalStorageDirectoryPath: '',
  TemporaryDirectoryPath: '',
  LibraryDirectoryPath: '',
  PicturesDirectoryPath: '',
  FileProtectionKeys: ''
};

module.exports = RNFS;
