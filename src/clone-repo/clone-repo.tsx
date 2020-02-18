import React from 'react';
import * as git from 'isomorphic-git/dist/bundle.umd.min.js';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import {DocumentDirectoryPath, readFile} from 'react-native-fs';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Repo} from '../entities';

interface CloneRepoProps {
  onClone?: () => void;
  onError?: (e: Error) => void;
}
export const CloneRepo = ({onClone: onCloneProp, onError}: CloneRepoProps) => {
  const [path, setPath] = React.useState(DocumentDirectoryPath + '/test');
  const [uri, setURI] = React.useState('');

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
      const newPath = `${path}/${getName(uri)}`;
      await git.clone({
        dir: newPath,
        url: uri,
        singleBranch: true,
        depth: 1,
      });
      await createNewRepo(newPath, uri);
      setURI('');
      setPath('');
      onCloneProp && onCloneProp();
    } catch (e) {
      onError && onError(e);
    }
  };

  return (
    <View style={styles.container}>
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
});
