import {PromiseFsClient} from 'isomorphic-git/index.umd.min.js';
import * as RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

function Err(name: string) {
  return class extends Error {
    public code = name;
    constructor(...args: any) {
      super(...args);
      if (this.message) {
        this.message = name + ': ' + this.message;
      } else {
        this.message = name;
      }
    }
  };
}

const log = false;

// const EEXIST = Err('EEXIST'); // <-- Unused because RNFS's mkdir never throws
const ENOENT = Err('ENOENT');
const ENOTDIR = Err('ENOTDIR');
// const ENOTEMPTY = Err('ENOTEMPTY'); // <-- Unused because RNFS's unlink is recursive by default

const readdir = async (path: string) => {
  log && console.log('readdir', path);
  try {
    return await RNFS.readdir(path);
  } catch (err) {
    if (/(?:Folder does not exist|ENOENT)/.exec(err.message)) {
      log && console.log('Folder does not exist');
      throw new ENOENT(path);
    }
    if (/(?:Attempt to get length of null array|ENOTDIR)/.exec(err.message)) {
      log && console.log('ENOTDIR');
      throw new ENOTDIR(path);
    }
    throw err;
  }
};

const mkdir = async (path: string) => {
  log && console.log('mkdir', path);
  return RNFS.mkdir(path);
};

const readFile = async (
  path: string,
  opts?: string | {[key: string]: string},
) => {
  log && console.log('readFile', path);

  let encoding;

  if (typeof opts === 'string') {
    encoding = opts;
  } else if (typeof opts === 'object') {
    encoding = opts.encoding;
  }

  let result: string | Uint8Array = await RNFS.readFile(
    path,
    encoding || 'base64',
  );

  if (!encoding) {
    result = Buffer.from(result, 'base64');
  }

  return result;
};

const writeFile = async (
  path: string,
  content: string | Uint8Array,
  opts?: string | {[key: string]: string},
) => {
  log && console.log('writeFile', path);

  let encoding;

  if (typeof opts === 'string') {
    encoding = opts;
  } else if (typeof opts === 'object') {
    encoding = opts.encoding;
  }

  if (typeof content === 'string') {
    encoding = encoding || 'utf8';
  } else {
    encoding = 'base64';
    content = Buffer.from(content).toString('base64');
  }

  await RNFS.writeFile(path, content as string, encoding);
};

const stat = async (path: string) => {
  log && console.log('stat', path);
  try {
    const r = await RNFS.stat(path);
    // we monkeypatch the result with a `isSymbolicLink` method because isomorphic-git needs it.
    // Since RNFS doesn't appear to support symlinks at all, we'll just always return false.
    // @ts-ignore
    r.isSymbolicLink = () => false;
    return r;
  } catch (err) {
    if (/(?:File does not exist|ENOENT)/.exec(err.message)) {
      log && console.log('File does not exist');
      throw new ENOENT(path);
    }
    throw err;
  }
};

const lstat = async (path: string) => {
  log && console.log('lstat', path);
  try {
    const r = await RNFS.lstat(path);
    // we monkeypatch the result with a `isSymbolicLink` method because isomorphic-git needs it.
    // Since RNFS doesn't appear to support symlinks at all, we'll just always return false.
    // @ts-ignore
    r.isSymbolicLink = () => false;
    return r;
  } catch (err) {
    if (/(?:File does not exist|ENOENT)/.exec(err.message)) {
      log && console.log('lstat File does not exist');
      throw new ENOENT(path);
    }
    throw err;
  }
};

const unlink = async (path: string) => {
  log && console.log('path', path);
  try {
    await RNFS.unlink(path);
  } catch (err) {
    if (/(?:File does not exist|ENOENT)/.exec(err.message)) {
      log && console.log('File does not exist');
      throw new ENOENT(path);
    }
    throw err;
  }
};

// RNFS doesn't have a separate rmdir method, so we can use unlink for deleting directories too
const rmdir = unlink;

// These are optional, which is good because there is no equivalent in RNFS
const readlink = async (path: string) => {
  log && console.log('readlink', path);
  const readlinkData = await RNFS.readlink(path);
  return readlinkData;
};
const symlink = async (target: string, path: string) => {
  log && console.log('symlink', target, path);
  const readlinkData = await RNFS.symlink(target, path);
  return readlinkData;
};

// Technically we could pull this off by using `readFile` + `writeFile` with the `mode` option
// However, it's optional, because isomorphic-git will do exactly that (a readFile and a writeFile with the new mode)
const chmod = async () => {
  log && console.log('chmod');
  throw new Error('not implemented');
};

export const fs = {
  promises: {
    readdir,
    mkdir,
    readFile,
    writeFile,
    stat,
    lstat,
    unlink,
    rmdir,
    readlink,
    symlink,
    chmod,
  },
} as PromiseFsClient;
