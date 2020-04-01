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
  const [stagedChanges, setStagedChanges] = React.useState<ChangesArrayItem[]>(
    [],
  );
  const [unstagedChanges, setUnstagedChanges] = React.useState<
    ChangesArrayItem[]
  >([]);
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
      const [unstaged, staged] = onlyChangedFiles.reduce(
        (prev, change) => {
          if (change.staged) {
            prev[1].push(change);
          } else {
            prev[0].push(change);
          }
          return prev;
        },
        [[], []],
      );
      setStagedChanges(unstaged);
      setUnstagedChanges(staged);
    });
  }, [repo]);

  React.useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  const addToStaged = (change: ChangesArrayItem) => {
    const newUnstaged = unstagedChanges.filter(
      unChange => unChange.fileName !== change.fileName,
    );
    const newStaged = [...stagedChanges, change];
    setUnstagedChanges(newUnstaged);
    setStagedChanges(newStaged);
  };

  const removeFromStaged = (change: ChangesArrayItem) => {
    const newStaged = stagedChanges.filter(
      unChange => unChange.fileName !== change.fileName,
    );
    const newUnstaged = [...unstagedChanges, change];
    setUnstagedChanges(newUnstaged);
    setStagedChanges(newStaged);
  };

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
        <View style={[styles.halfSection, styles.firstSection]}>
          <SubheaderWithButton
            buttonText={'Stage All'}
            calloutText={'Unstaged'}
            onButtonClick={() => {}}
            style={showUnstagedDivider ? styles.underlineHeader : {}}
          />
          <ScrollView style={styles.changesList} onScroll={onUnstagedScroll}>
            {unstagedChanges.map(props => {
              return (
                <FileChangeListItemWithCheckbox
                  isChecked={false}
                  key={props.fileName}
                  onToggle={() => addToStaged(props)}
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
            {stagedChanges.map(props => {
              return (
                <FileChangeListItemWithCheckbox
                  isChecked={true}
                  key={props.fileName}
                  onToggle={() => removeFromStaged(props)}
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
  firstSection: {
    borderBottomColor: theme.colors.outlineColor,
    borderBottomWidth: 1,
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
