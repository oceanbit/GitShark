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
import {EEXIST, ENOENT, ENOTDIR, ENOTEMPTY} from './errors';
import {b64toBlob} from './base-64-to-blob';

const logFS = true;

/**
 * @param {Error} error
 */
const convertToErrToEONENT = error => {
  if (logFS) console.warn(error);
  if (/ENOENT/.exec(error.message)) {
    return new ENOENT(error);
  }
  if (/ENOTDIR/.exec(error.message)) {
    return new ENOTDIR(error);
  }
  if (/ENOTEMPTY/.exec(error.message)) {
    return new ENOTEMPTY(error);
  }
  if (/EEXIST/.exec(error.message)) {
    return new EEXIST(error);
  }
  return error;
};

export const mappedRNFSToIsomorphicGitFS = {
  promises: {
    readFile: async (path, options = {}) => {
      try {
        logFS && console.log('readFile', path);
        try {
          const fileRead = await fsReadFile(path, options.encoding || 'utf8');
          return fileRead;
        } catch (e) {
          if (/Invalid UTF-8 detected/.exec(e.message)) {
            const fileReadB64 = await fsReadFile(path, 'base64');
            debugger;
            return b64toBlob(fileReadB64);
          }
          throw e;
        }
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    writeFile: async (path, data, options = {}) => {
      try {
        logFS && console.log('writeFile', path);
        let encoding =
          (typeof options === 'string' ? options : options.encoding) || 'utf8';
        // data is capable of being `uint8array` from `isomorphic-git`. This should handle that edgecase
        let dataString = data;
        if (ArrayBuffer.isView(data)) {
          dataString = bytesToBase64(data);
          encoding = 'base64';
        }
        return await fsWriteFile(path, dataString, encoding);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    unlink: async path => {
      try {
        logFS && console.log('unlink', path);
        return await fsUnlink(path);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    readdir: async path => {
      try {
        logFS && console.log('readdir', path);
        return await fsReadDir(path);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    mkdir: async path => {
      try {
        logFS && console.log('mkdir', path);
        return await fsMkdir(path);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    rmdir: async path => {
      try {
        logFS && console.log('rmdir', path);
        return await fsUnlink(path);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    stat: async path => {
      try {
        logFS && console.log('stat', path);
        const stat = await fsStat(path);
        return stat;
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    lstat: async path => {
      try {
        logFS && console.log('lstat', path);
        const lstat = await fsLstat(path);
        return lstat;
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    readlink: async path => {
      try {
        logFS && console.log('readlink', path);
        return await fsReadlink(path);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
    symlink: async (target, path) => {
      try {
        logFS && console.log('symlink', target, path);
        return await fsSymlink(target, path);
      } catch (e) {
        const newErr = convertToErrToEONENT(e);
        throw newErr;
      }
    },
  },
};
