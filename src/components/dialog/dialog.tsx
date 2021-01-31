import * as React from 'react';
import {Dimensions, StyleProp, Text, View, ViewStyle} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {theme} from '@constants';
import {
  ColorSchemeContext,
  DynamicStyleSheet,
  useDarkMode,
  useDynamicValue,
} from 'react-native-dynamic';
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
  style?: StyleProp<ViewStyle>;
}

type BaseDialogProps = Partial<
  Pick<AppDialogProps, 'visible' | 'dismissable' | 'onDismiss' | 'style'>
>;

export const BaseDialog: React.FC<BaseDialogProps> = ({
  children,
  visible,
  dismissable,
  onDismiss,
  style = {},
}) => {
  const {height} = Dimensions.get('window');

  const keyboard = useKeyboard();

  const styles = useDynamicValue(dynamicStyles);

  const additionalTop = keyboard.keyboardShown
    ? height / 4 - keyboard.keyboardHeight - 10
    : undefined;

  const isDark = useDarkMode();

  return (
    <Portal>
      <Dialog
        visible={visible ?? true}
        dismissable={dismissable}
        onDismiss={onDismiss}
        style={[styles.dialogContainer, style, {top: additionalTop}]}>
        {children}
      </Dialog>
    </Portal>
  );
};

export const AppDialog = ({
  visible,
  dismissable,
  onDismiss,
  title,
  text,
  actions,
  main,
  style,
}: AppDialogProps) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <BaseDialog
      visible={visible}
      dismissable={dismissable}
      onDismiss={onDismiss}
      style={style}>
      <Text style={styles.dialogTitle}>{title}</Text>
      <Text style={styles.mainText}>{text}</Text>
      {main}
      <View style={styles.dialogActions}>{actions}</View>
    </BaseDialog>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  dialogContainer: {
    margin: 0,
    // Set max width for tablet
    maxWidth: theme.breakpoints.singlePanelMaxWidth,
    // Provide horizontal spacing on mobile
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingTop: 20,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.floating_surface,
  },
  dialogTitle: {
    marginBottom: 4,
    ...theme.textStyles.headline_06,
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
