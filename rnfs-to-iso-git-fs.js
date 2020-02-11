import {
    readFile as fsReadFile,
    writeFile as fsWriteFile,
    unlink as fsUnlink,
    readdir as fsReadDir,
    mkdir as fsMkdir,
    stat as fsStat
} from 'react-native-fs';

export const mappedRNFSToIsomorphicGitFS = {
    promises: {
        readFile: (path, options = {}) => fsReadFile(path, options.encoding),
        writeFile: (path, data, options = {}) => fsWriteFile(path, data, options.encoding),
        unlink: fsUnlink,
        readdir: fsReadDir,
        mkdir: path => fsMkdir(path),
        rmdir: fsUnlink,
        stat: fsStat
        // missing lstat
        // missing readlink
        // missing symlink
    }
}
