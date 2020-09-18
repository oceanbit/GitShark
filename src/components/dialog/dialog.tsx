import * as React from 'react';
import {Dimensions, KeyboardAvoidingView, Text, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useKeyboard} from '@react-native-community/hooks';

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
  const {height} = Dimensions.get('window');

  const keyboard = useKeyboard();

  const styles = useDynamicValue(dynamicStyles);

  const additionalTop = keyboard.keyboardShown
    ? height / 4 - keyboard.keyboardHeight - 10
    : undefined;

  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={dismissable}
        onDismiss={onDismiss}
        style={[styles.dialogContainer, {top: additionalTop}]}>
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
    paddingHorizontal: theme.spacing.l,
    paddingTop: 20,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.floating_surface,
  },
  dialogTitle: {
    marginBottom: 4,
    ...theme.textStyles.headline_03,
    color: theme.colors.label_high_emphasis,
  },
  mainText: {
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
    marginBottom: 20,
    ...theme.textStyles.body_02,
  },
  dialogActions: {
    marginTop: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
