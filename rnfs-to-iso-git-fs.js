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

export const mappedRNFSToIsomorphicGitFS = {
  promises: {
    readFile: (path, options = {}) => fsReadFile(path, options.encoding || 'utf8'),
    writeFile: (path, data, options = {}) =>
      fsWriteFile(path, data, options.encoding || 'utf8'),
    unlink: fsUnlink,
    readdir: fsReadDir,
    mkdir: path => fsMkdir(path),
    rmdir: fsUnlink,
    stat: fsStat,
    lstat: fsLstat,
    readlink: fsReadlink,
    symlink: fsSymlink,
  },
};
