import * as React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import {spacing, theme} from '@constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SharkIconButton} from '@components/shark-icon-button';
import {FileChangeListItem} from '@components/file-change-list-item';
import {SharkTextInput} from '@components/shark-text-input';
import {SharkButton} from '@components/shark-button';
import {ChangesArrayItem, commit} from '@services';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkDivider} from '@components/shark-divider';
import {BottomSpacerView} from '@components/shark-safe-top';
import {useSelector} from 'react-redux';
import {RootState} from '@store';

export const CommitAction = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const styles = useDynamicStyleSheet(dynamicStyles);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const route = useRoute<any>();
  const getUpdate = route!.params!.updateFiles as () => any;
  const files = route!.params!.files as ChangesArrayItem[];
  const history = useNavigation();

  const [commitTitle, setCommitTitle] = React.useState('');
  const [commitBody, setCommitBody] = React.useState('');

  if (!getUpdate) {
    history.navigate('Repository');
    return null;
  }

  const onSubmit = async () => {
    await commit({repo: repo!, description: commitBody, title: commitTitle});
    getUpdate();
    history.navigate('Repository');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, flexDirection: 'column'}}
      behavior="padding"
      enabled>
      <View style={[styles.commitHeaderContainer]}>
        <SharkIconButton onPress={() => history.goBack()} iconName="close" />
        <Text style={styles.commitHeader}>Commit changes</Text>
      </View>
      <SharkDivider />
      <ScrollView>
        {files.map(file => (
          <React.Fragment key={file.fileName}>
            <FileChangeListItem
              fileName={file.fileName}
              fileStatus={file.fileStatus}
            />
            <SharkDivider />
          </React.Fragment>
        ))}
      </ScrollView>
      <SharkDivider />
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
      <BottomSpacerView />
    </KeyboardAvoidingView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  commitHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xs,
  },
  commitHeader: {
    marginLeft: spacing.xs,
    ...theme.textStyles.headline_03,
    color: theme.colors.on_surface,
  },
  commitData: {
    padding: spacing.m,
  },
  textarea: {
    height: 128,
    marginVertical: spacing.m,
  },
});
