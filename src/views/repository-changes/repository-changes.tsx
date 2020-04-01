import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {FileChangeListItemWithCheckbox} from '../../components/file-change-list-item/file-change-list-item-with-checkbox';

import {RepoContext} from '../../constants/repo-context';
import {ChangesArrayItem, getRepoStatus} from '../../services/git';
import {SubheaderWithButton} from '../../components/subheaders/subheader-with-button';
import {theme} from '../../constants/theme';

export const RepositoryChanges = () => {
  const {repo} = React.useContext(RepoContext);
  const [changes, setChanges] = React.useState<ChangesArrayItem[]>([]);
  const [showUnstagedDivider, setShowUnstagedDivider] = React.useState(false);
  const [showStagedDivider, setShowStagedDivider] = React.useState(false);

  const getUpdate = React.useCallback(() => {
    if (!repo) {
      return;
    }
    getRepoStatus(repo.path).then(newFiles => {
      const onlyChangedFiles = newFiles.filter(
        file => file.fileStatus !== 'unmodified',
      );
      setChanges(onlyChangedFiles);
    });
  }, [repo]);

  React.useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  const onUnstagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowUnstagedDivider(false);
      return;
    }
    setShowUnstagedDivider(true);
  };

  const onStagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowStagedDivider(false);
      return;
    }
    setShowStagedDivider(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.halfSection}>
          <SubheaderWithButton
            buttonText={'Stage All'}
            calloutText={'Unstaged'}
            onButtonClick={() => {}}
            style={showUnstagedDivider ? styles.underlineHeader : {}}
          />
          <ScrollView style={styles.changesList} onScroll={onUnstagedScroll}>
            {changes.map(props => {
              return (
                <FileChangeListItemWithCheckbox
                  isChecked={false}
                  key={props.fileName}
                  {...props}
                />
              );
            })}
            {changes.map(props => {
              return (
                <FileChangeListItemWithCheckbox
                  isChecked={false}
                  key={props.fileName}
                  {...props}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.halfSection}>
          <SubheaderWithButton
            buttonText={'Commit All'}
            calloutText={'Staged'}
            onButtonClick={() => {}}
            style={showStagedDivider ? styles.underlineHeader : {}}
          />
          <ScrollView style={styles.changesList} onScroll={onStagedScroll}>
            {changes.map(props => {
              return (
                <FileChangeListItemWithCheckbox
                  isChecked={false}
                  key={props.fileName}
                  {...props}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
  changesList: {
    paddingHorizontal: 16,
  },
  halfSection: {
    height: '50%',
  },
  underlineHeader: {
    borderBottomColor: theme.colors.outlineColor,
    borderBottomWidth: 1,
  },
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
