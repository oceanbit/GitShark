import * as React from 'react';
import {ErrorMessageBox} from '@components/error-message-box';
import {View} from 'react-native';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {ErrorPromptProps, openGitHubIssue} from '@services';

export const ErrorPrompt = (props: ErrorPromptProps) => {
  const {explainMessage} = props;
  const styles = useDynamicValue(dynamicStyles);

  return (
    // TODO: Create translation for buttons
    <View>
      <ErrorMessageBox message={explainMessage} />
      <SharkButton
        style={styles.githubButton}
        type={'primary'}
        onPress={() => openGitHubIssue(props)}
        icon={'github'}
        text={'Create issue'}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  githubButton: {
    backgroundColor: theme.colors.label_high_emphasis,
  },
});
