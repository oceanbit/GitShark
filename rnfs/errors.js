/**
 * @format
 */
function Err(name) {
  return class extends Error {
    constructor(...args) {
      super(...args);
      this.code = name;
      if (this.message) {
        this.message = name + ': ' + this.message;
      } else {
        this.message = name;
      }
    }
  };
}

export const EEXIST = Err('EEXIST');
export const ENOENT = Err('ENOENT');
export const ENOTDIR = Err('ENOTDIR');
export const ENOTEMPTY = Err('ENOTEMPTY');
