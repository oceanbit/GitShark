/**
 * @format
 */
import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  unlink as fsUnlink,
  readdir as fsReadDir,
  mkdir as fsMkdir,
  stat as fsStat,
  lstat as fsLstat,
  symlink as fsSymlink,
  readlink as fsReadlink,
} from 'react-native-fs';
import {bytesToBase64} from './encode-uint8array-to-b64';
// import {TextDecoder} from 'text-encoding';

export const mappedRNFSToIsomorphicGitFS = {
  promises: {
    readFile: (path, options = {}) =>
      fsReadFile(path, options.encoding || 'utf8'),
    writeFile: (path, data, options = {}) => {
      debugger;
      let encoding =
        (typeof options === 'string' ? options : options.encoding) || 'utf8';
      // data is capable of being `uint8array` from `isomorphic-git`. This should handle that edgecase
      let dataString = data;
      if (ArrayBuffer.isView(data)) {
        dataString = bytesToBase64(data);
        encoding = 'base64';
      }
      return fsWriteFile(path, dataString, encoding);
    },
    unlink: fsUnlink,
    readdir: fsReadDir,
    mkdir: path => fsMkdir(path),
    rmdir: fsUnlink,
    stat: (...props) => {
      debugger;
      return fsStat(...props);
    },
    lstat: fsLstat,
    readlink: fsReadlink,
    symlink: fsSymlink,
  },
};
