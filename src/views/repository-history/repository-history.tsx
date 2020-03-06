import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {RepoContext} from '../../constants/repo-context';
import {CommitList} from '../../components/commit-list/commit-list';

export const RepositoryHistory = () => {
  const {repo} = React.useContext(RepoContext);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <CommitList />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
