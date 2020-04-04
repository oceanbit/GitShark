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
import {theme} from '../../constants/theme';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {useNavigation} from '@react-navigation/native';
import {SharkIconButton} from '../../components/shark-icon-button/shark-icon-button';
import {textStyles} from '../../constants/text-styles';
import {FileChangeListItem} from '../../components/file-change-list-item/file-change-list-item';
import {SharkTextInput} from '../../components/shark-text-input/shark-text-input';
import {SharkButton} from '../../components/shark-button/shark-button';

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
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const {repo} = React.useContext(RepoContext);
  const history = useNavigation();
  const [showDivider, setShowDivider] = React.useState(false);

  const onStagedScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event.nativeEvent.contentOffset.y) {
      setShowDivider(false);
      return;
    }
    setShowDivider(true);
  };

  const headerLine = showDivider ? styles.underlineHeader : {};

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
        {mockFileChanges.map(file => (
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
          value={''}
          onChangeText={() => {}}
        />
        <SharkTextInput
          placeholder={'Commit title'}
          value={''}
          onChangeText={() => {}}
          numberOfLines={4}
          style={styles.textarea}
        />
        <View>
          <SharkButton
            onPress={() => {}}
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
    borderBottomColor: theme.colors.outlineColor,
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
    borderTopColor: theme.colors.outlineColor,
    borderTopWidth: 1,
    padding: 16,
  },
  textarea: {
    height: 128,
    marginVertical: 16,
  },
});
