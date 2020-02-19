import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import {
  DocumentDirectoryPath,
  readFile,
  writeFile,
  stat,
} from 'react-native-fs';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const FSDemos = () => {
  const [path, setPath] = React.useState(DocumentDirectoryPath + '/test');
  const [fileName, setFileName] = React.useState('');

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

  const onWrite = () => {
    writeFile(`${path}/${fileName}`, 'Hello, world');
  };

  const onRead = async () => {
    const val = await readFile(`${path}/${fileName}`);
    console.log(val);
  };

  const onStat = async () => {
    const val = await stat(`${path}/${fileName}`);
    console.log(val);
  };

  const onLstat = async () => {
    const val = await stat(`${path}/${fileName}`);
    console.log(val);
  };

  return (
    <View style={styles.container}>
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
