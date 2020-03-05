import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {FileChangeListItem} from '../../components/file-change-list-item/file-change-list-item';

const fileListChanges = [
  {
    fileName: 'application/utils/ui/Adapter.kt',
    changeStatus: 'added' as 'added',
  },
  {
    fileName: 'application/utils/ui/SETrans.kt',
    changeStatus: 'removed' as 'removed',
  },
];

export const RepositoryChanges = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {fileListChanges.map(props => {
            return <FileChangeListItem key={props.fileName} {...props} />;
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  headingText: {
    marginBottom: 16,
    fontSize: 48,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 16,
  },
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
