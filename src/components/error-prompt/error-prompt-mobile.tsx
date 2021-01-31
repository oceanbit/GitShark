import * as React from 'react';
import {View, Text} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {ErrorPromptProps} from '@services';
import {Portal} from 'react-native-paper';
import {SharkBottomSheet} from '@components/shark-bottom-sheet';
import {
  GitHubButton,
  RedContainer,
  TryAgainButton,
} from './error-prompt-common';
import {SharkDivider} from '@components/shark-divider';
import {ScrollView} from 'react-native-gesture-handler';

export const ErrorPromptMobile = (props: ErrorPromptProps) => {
  const {callStack} = props;
  const styles = useDynamicValue(dynamicStyles);

  const gitHubButton = <GitHubButton props={props} style={styles.ghButton} />;

  const tryAgainButton = <TryAgainButton props={props} />;

  const [buttonHeight, setButtonHeight] = React.useState(0);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  const minSheetHeight =
    buttonHeight + headerHeight + theme.spacing.m + theme.spacing.xs;

  // Mobile view
  return (
    <Portal>
      <SharkBottomSheet
        maxSheetHeight={'100%'}
        minSheetHeight={minSheetHeight}
        renderHeader={() => (
          <View
            style={styles.headerContainer}
            onLayout={event => {
              const {height: eventHeight} = event.nativeEvent.layout;
              setHeaderHeight(eventHeight);
            }}>
            <View style={styles.redContainer}>
              <RedContainer {...props} />
            </View>
            <SharkDivider />
          </View>
        )}
        renderContent={() => (
          <ScrollView style={styles.sheetContainer}>
            <View style={styles.stackContainer}>
              <Text style={styles.callstack}>{callStack}</Text>
            </View>
            <SharkDivider />
            <View style={styles.buttonContainer}>
              {gitHubButton}
              {tryAgainButton}
            </View>
          </ScrollView>
        )}
      />
      <View
        style={styles.buttonOverlay}
        onLayout={event => {
          const {height: eventHeight} = event.nativeEvent.layout;
          setButtonHeight(eventHeight);
        }}>
        <SharkDivider />
        <View style={styles.buttonContainer}>
          {gitHubButton}
          {tryAgainButton}
        </View>
      </View>
    </Portal>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  headerContainer: {
    backgroundColor: theme.colors.surface,
  },
  sheetContainer: {
    height: '100%',
    backgroundColor: theme.colors.surface,
  },
  redContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    paddingTop: theme.spacing.xs,
  },
  stackContainer: {
    padding: theme.spacing.m,
  },
  callstack: {
    ...theme.textStyles.code,
  },
  buttonContainer: {
    padding: theme.spacing.m,
  },
  ghButton: {
    marginBottom: theme.spacing.xs,
  },
  buttonOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
});
