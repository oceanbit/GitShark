import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {textStyles} from '../../constants/text-styles';
import {theme} from '../../constants/theme';

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

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dialogTitle: {
    marginBottom: 4,
    ...textStyles.headline_03,
  },
  mainText: {
    color: theme.colors.on_surface_secondary_light,
    marginBottom: 20,
    ...textStyles.body_02,
  },
  dialogActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
