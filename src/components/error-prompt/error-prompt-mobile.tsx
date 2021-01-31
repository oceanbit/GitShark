import * as React from 'react';
import {ErrorMessageBox} from '@components/error-message-box';
import {View} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {ErrorPromptProps} from '@services';
import {Portal} from 'react-native-paper';
import {SharkBottomSheet} from '@components/shark-bottom-sheet';
import {GitHubButton, TryAgainButton} from './error-prompt-common';

export const ErrorPromptMobile = (props: ErrorPromptProps) => {
  const {explainMessage} = props;
  const styles = useDynamicValue(dynamicStyles);

  const gitHubButton = <GitHubButton props={props} />;

  const tryAgainButton = <TryAgainButton props={props} />;

  // Mobile view
  return (
    <Portal>
      <SharkBottomSheet
        maxSheetHeight={600}
        minSheetHeight={100}
        renderContent={() => (
          <View style={styles.sheetContainer}>
            <ErrorMessageBox message={explainMessage} />
            {gitHubButton}
          </View>
        )}
      />
    </Portal>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  sheetContainer: {
    height: '100%',
    backgroundColor: theme.colors.surface,
  },
  callstack: {
    ...theme.textStyles.code,
  },
});
