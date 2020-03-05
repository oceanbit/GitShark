import * as React from 'react';
import {
  Alert,
  Button,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import {DocumentDirectoryPath} from 'react-native-fs';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Repo} from '../../entities';
import git from 'isomorphic-git/index.umd.min.js';
import http from 'isomorphic-git/http/web/index.js';
import {fs} from '../../constants/fs';

// Note that since we're running isomorphic-git in the main thread, we're competing with React trying to update the UI.
// In order to achieve smooth progress bars, we need to insert a little pause.
// Curiously (perhaps a bug in isomorphic-git? I haven't figured that out yet) when these setTimeouts are added,
// the 'Counting objects' and 'Receiving objects' phases were interleaved, as were
// the 'Compressing objects' and 'Resolving deltas' phases. Since we can't show two progress phases simultaneously
// on a single progress bar, and since they are perfectly in step anyway, we'll just whitelist certain phases.
const phases: {[key: string]: boolean} = {
  'Receiving objects': true,
  'Resolving deltas': true,
  'Analyzing workdir': true,
  'Updating workdir': true,
};

const pauseToRender = () => new Promise(resolve => setTimeout(resolve, 0));

interface CloneRepoProps {
  onClone?: () => void;
  onError?: (e: Error) => void;
}
export const CloneRepo = ({onClone: onCloneProp, onError}: CloneRepoProps) => {
  const [path, setPath] = React.useState(DocumentDirectoryPath + '/test');
  const [uri, setURI] = React.useState('');

  /**
   * The state of the clone itself
   */
  const [loaded, setLoaded] = React.useState(0);
  const [total, setTotal] = React.useState(-1);
  const [phase, setPhase] = React.useState('');

  const selectDirectory = () => {
    RNFileSelector.Show({
      title: 'Select File',
      chooseFolderMode: true,
      onDone: (selectedPath: string) => {
        console.log('file selected: ' + selectedPath);
        setPath(selectedPath);
      },
      onCancel: () => {
        console.log('cancelled');
      },
    });
  };

  const getName = (str: string) => str.slice(str.lastIndexOf('/'), str.length);

  const createNewRepo = async (path: string, url: string) => {
    const newRepo = new Repo();
    newRepo.name = getName(url);
    newRepo.path = path;
    await newRepo.save();
  };

  const onClone = async () => {
    try {
      setPhase('Downloading');
      setTotal(0);
      const newPath = `${path}/${getName(uri)}`;
      await git.clone({
        fs,
        http,
        dir: newPath,
        url: uri,
        singleBranch: true,
        depth: 1,
        async onProgress({phase, loaded, total}) {
          if (phases[phase]) {
            console.log(phase, loaded, total);
            setPhase(phase);
            setLoaded(loaded);
            setTotal(total || 0);
            await pauseToRender();
          }
        },
      });
      await createNewRepo(newPath, uri);
      setURI('');
      setPath('');
      setPhase('Complete');
      setLoaded(1);
      setTotal(1);
      Alert.alert('clone', 'complete');
      onCloneProp && onCloneProp();
    } catch (e) {
      onError && onError(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Text>{phase}</Text>
        {Platform.OS === 'android' ? (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            style={styles.progressBar}
            progress={total > 0 ? loaded / total : 0}
            indeterminate={!total}
          />
        ) : (
          <ProgressViewIOS
            progress={total > 0 ? loaded / total : 0}
            style={styles.progressBar}
          />
        )}
      </View>
      <Button title="Select Folder" onPress={() => selectDirectory()} />
      <Text>{path}</Text>
      <TextInput
        style={{height: 40}}
        placeholder="What's the URI of the Git repo?"
        onChangeText={text => setURI(text)}
        value={uri}
      />
      <Button title={'Clone repo'} onPress={() => onClone()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.black,
  },
  progressBar: {
    flex: 1,
  },
});
