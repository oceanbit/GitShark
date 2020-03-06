import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {FileChangeListItem} from '../../components/file-change-list-item/file-change-list-item';

import {RepoContext} from '../../constants/repo-context';
import {ChangesArrayItem, getRepoStatus} from '../../services/git';

export const RepositoryChanges = () => {
  const {repo} = React.useContext(RepoContext);
  const [changes, setChanges] = React.useState<ChangesArrayItem[]>([]);

  React.useEffect(() => {
    if (!repo) {
      return;
    }
    getRepoStatus(repo.path).then(newFiles => setChanges(newFiles));
  }, [repo]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {changes.map(props => {
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
