import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import {
  DocumentDirectoryPath,
  readFile,
  writeFile,
  stat,
  unlink,
} from 'react-native-fs';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const FSDemos = () => {
  const [path, setPath] = React.useState(DocumentDirectoryPath + '/test');
  const [fileName, setFileName] = React.useState('');
  const [state, setState] = React.useState('Initial state');

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

  const onWrite = async () => {
    try {
      await writeFile(`${path}/${fileName}`, 'Hello, world');
    } catch (err) {
      setState('Error during write');
      console.error(err);
    }
  };

  const onDelete = async () => {
    try {
      await unlink(`${path}/${fileName}`);
    } catch (err) {
      setState('Error during delete');
      console.error(err);
    }
  };

  const onRead = async () => {
    try {
      const val = await readFile(`${path}/${fileName}`);
      console.log(val);
    } catch (err) {
      setState('Error during read');
      console.error(err);
    }
  };

  const onStat = async () => {
    try {
      const val = await stat(`${path}/${fileName}`);
      console.log(val);
    } catch (err) {
      setState('Error during stat');
      console.error(err);
    }
  };

  const onLstat = async () => {
    try {
      const val = await stat(`${path}/${fileName}`);
      console.log(val);
    } catch (err) {
      setState('Error during lstat');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{state}</Text>
      <Button title="Select Folder" onPress={() => selectDirectory()} />
      <Text>{path}</Text>
      <TextInput
        style={{height: 40}}
        placeholder="What's the name of the file we should modify?"
        onChangeText={text => setFileName(text)}
        value={fileName}
      />
      <View style={styles.button}>
        <Button title={'Write File'} onPress={() => onWrite()} />
      </View>
      <View style={styles.button}>
        <Button title={'Read File'} onPress={() => onRead()} />
      </View>
      <View style={styles.button}>
        <Button title={'Delete File'} onPress={() => onDelete()} />
      </View>
      <View style={styles.button}>
        <Button title={'Stat File'} onPress={() => onStat()} />
      </View>
      <View style={styles.button}>
        <Button title={'LStat File'} onPress={() => onLstat()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.black,
  },
  button: {
    paddingVertical: 6,
  },
});
