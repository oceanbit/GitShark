import * as React from 'react';
import {
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RepoContext} from '../../constants/repo-context';
import {legacyTheme} from '../../constants/theme';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SharkIconButton} from '../../components/shark-icon-button/shark-icon-button';
import {textStyles} from '../../constants/text-styles';
import {FileChangeListItem} from '../../components/file-change-list-item/file-change-list-item';
import {SharkTextInput} from '../../components/shark-text-input/shark-text-input';
import {SharkButton} from '../../components/shark-button/shark-button';
import {ChangesArrayItem} from '../../services/git';
import {commit} from '../../services/git/commit';

const mockFileChanges = [
  {
    fileName: 'application/utils/ui/Adapter.kt',
    fileStatus: 'added' as 'added',
  },
  {
    fileName: 'application/utils/ui/Adapter2.kt',
    fileStatus: 'added' as 'added',
  },
  {
    fileName: 'application/utils/ui/Adapter3.kt',
    fileStatus: 'added' as 'added',
  },
];

export const Commit = () => {
  const {repo} = React.useContext(RepoContext);
  const route = useRoute<any>();
  const files = JSON.parse(route!.params!.files) as ChangesArrayItem[];
  const history = useNavigation();
  const [showDivider, setShowDivider] = React.useState(false);

  const [commitTitle, setCommitTitle] = React.useState('');
  const [commitBody, setCommitBody] = React.useState('');

  const onStagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowDivider(false);
      return;
    }
    setShowDivider(true);
  };

  const headerLine = showDivider ? styles.underlineHeader : {};

  const onSubmit = async () => {
    if (commitTitle) {
      await commit({repo: repo!, description: commitBody, title: commitTitle});
    }
    history.navigate('Repository', {
      shouldRequery: true,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, flexDirection: 'column'}}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}>
      <View style={[styles.commitHeaderContainer, headerLine]}>
        <SharkIconButton onPress={() => history.goBack()} iconName="close" />
        <Text style={styles.commitHeader}>Commit changes</Text>
      </View>
      <ScrollView style={styles.fileChanges} onScroll={onStagedScroll}>
        {files.map(file => (
          <FileChangeListItem
            key={file.fileName}
            fileName={file.fileName}
            fileStatus={file.fileStatus}
          />
        ))}
      </ScrollView>
      <View style={styles.commitData}>
        <SharkTextInput
          placeholder={'Commit title'}
          value={commitTitle}
          onChangeText={setCommitTitle}
        />
        <SharkTextInput
          placeholder={'Commit description'}
          value={commitBody}
          onChangeText={setCommitBody}
          numberOfLines={4}
          style={styles.textarea}
        />
        <View>
          <SharkButton
            onPress={onSubmit}
            text={'Commit change'}
            type={'primary'}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  commitHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  underlineHeader: {
    borderBottomColor: legacyTheme.colors.outlineColor,
    borderBottomWidth: 1,
  },
  commitHeader: {
    marginLeft: 8,
    ...textStyles.headline_03,
  },
  fileChanges: {
    padding: 8,
  },
  commitData: {
    borderTopColor: legacyTheme.colors.outlineColor,
    borderTopWidth: 1,
    padding: 16,
  },
  textarea: {
    height: 128,
    marginVertical: 16,
  },
});
