import * as React from 'react';
import {Text, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {textStyles, theme} from '@constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface AppDialogProps {
  title: string;
  text: string;
  main?: React.ReactNode;
  actions?: React.ReactNode;
  /**
   * Determines whether clicking outside the dialog dismiss it.
   */
  dismissable?: boolean;
  /**
   * Callback that is called when the user dismisses the dialog.
   */
  onDismiss?: () => void;
  visible: boolean;
}

export const AppDialog = ({
  visible,
  dismissable,
  onDismiss,
  title,
  text,
  actions,
  main,
}: AppDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={dismissable}
        onDismiss={onDismiss}
        style={styles.dialogContainer}>
        <Text style={styles.dialogTitle}>{title}</Text>
        <Text style={styles.mainText}>{text}</Text>
        {main}
        <View style={styles.dialogActions}>{actions}</View>
      </Dialog>
    </Portal>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: theme.colors.floating_surface,
  },
  dialogTitle: {
    marginBottom: 4,
    ...textStyles.headline_03,
    color: theme.colors.on_surface,
  },
  mainText: {
    color: theme.colors.on_surface_secondary,
    marginBottom: 20,
    ...textStyles.body_02,
  },
  dialogActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
