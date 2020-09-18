import * as React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import {theme} from '@constants';
import {SharkIconButton} from '@components/shark-icon-button';
import {FileChangeListItem} from '@components/file-change-list-item';
import {SharkTextInput} from '@components/shark-text-input';
import {SharkButton} from '@components/shark-button';
import {ChangesArrayItem} from '@services';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkDivider} from '@components/shark-divider';
import {BottomSpacerView} from '@components/shark-safe-top';

interface CommitActionUIProps {
  onSubmit: (props: {commitTitle: string; commitBody: string}) => Promise<void>;
  files: ChangesArrayItem[];
  onClose: () => void;
}

export const CommitActionUI = ({
  onSubmit,
  files,
  onClose,
}: CommitActionUIProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const [commitTitle, setCommitTitle] = React.useState('');
  const [commitBody, setCommitBody] = React.useState('');

  return (
    <KeyboardAvoidingView
      style={{flex: 1, flexDirection: 'column'}}
      behavior="padding"
      enabled>
      <View style={[styles.commitHeaderContainer]}>
        <SharkIconButton onPress={onClose} iconName="close" />
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
            disabled={!files.length}
            onPress={() => onSubmit({commitBody, commitTitle})}
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
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xs,
  },
  commitHeader: {
    marginLeft: theme.spacing.xs,
    ...theme.textStyles.headline_03,
    color: theme.colors.label_high_emphasis,
  },
  commitData: {
    padding: theme.spacing.m,
  },
  textarea: {
    height: 128,
    marginVertical: theme.spacing.m,
  },
});
