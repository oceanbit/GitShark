/**
 * @format
 */
import {atob} from './atob';

// Taken from https://github.com/facebook/react-native/issues/21209#issuecomment-495294672
// eslint-disable-next-line no-undef
FileReader.prototype.readAsArrayBuffer = function(blob) {
  if (this.readyState === this.LOADING) throw new Error('InvalidStateError');
  this._setReadyState(this.LOADING);
  this._result = null;
  this._error = null;
  // eslint-disable-next-line no-undef
  const fr = new FileReader();
  fr.onloadend = () => {
    const content = atob(
      fr.result.substr('data:application/octet-stream;base64,'.length),
    );
    const buffer = new ArrayBuffer(content.length);
    const view = new Uint8Array(buffer);
    view.set(Array.from(content).map(c => c.charCodeAt(0)));
    this._result = buffer;
    this._setReadyState(this.DONE);
  };
  fr.readAsDataURL(blob);
};
