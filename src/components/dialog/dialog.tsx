import * as React from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {overlay, Portal, Surface, useTheme} from 'react-native-paper';
import {DialogsContext, theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useKeyboard} from '@react-native-community/hooks';
import {Scrim} from '@components/scrim';

const DIALOG_ELEVATION = 24;

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
  const {setOpenDialogs} = React.useContext(DialogsContext);

  React.useEffect(() => {
    if (!visible) return;
    setOpenDialogs(v => v + 1);

    return () => setOpenDialogs(v => v - 1);
  }, [setOpenDialogs, visible]);

  const {height} = Dimensions.get('window');

  const keyboard = useKeyboard();

  const styles = useDynamicValue(baseDialogStyles);

  const additionalTop = keyboard.keyboardShown
    ? height / 4 - keyboard.keyboardHeight - 10
    : undefined;

  return (
    <Portal>
      <Scrim
        visible={visible ?? true}
        dismissable={dismissable}
        onDismiss={onDismiss}
        style={{
          justifyContent: 'center',
        }}>
        {opacity => (
          <Animated.View
            style={[
              styles.dialogContainer,
              style,
              {top: additionalTop},
              {opacity},
            ]}>
            {children}
          </Animated.View>
        )}
      </Scrim>
    </Portal>
  );
};

const baseDialogStyles = new DynamicStyleSheet({
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
    borderRadius: theme.borderRadius.regular,
    /**
     * This prevents the shadow from being clipped on Android since Android
     * doesn't support `overflow: visible`.
     * One downside for this fix is that it will disable clicks on the area
     * of the shadow around the dialog, consequently, if you click around the
     * dialog (44 pixel from the top and bottom) it won't be dismissed.
     */
    marginVertical: Platform.OS === 'android' ? 44 : 0,
    marginHorizontal: 26,
    elevation: DIALOG_ELEVATION,
  },
});

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
  const styles = useDynamicValue(appDialogDynamicStyles);

  return (
    <BaseDialog
      visible={visible}
      dismissable={dismissable}
      onDismiss={onDismiss}
      style={style}>
      <Text accessibilityRole={'header'} style={styles.dialogTitle}>
        {title}
      </Text>
      <Text accessibilityRole={'summary'} style={styles.mainText}>
        {text}
      </Text>
      {main}
      <View style={styles.dialogActions}>{actions}</View>
    </BaseDialog>
  );
};

const appDialogDynamicStyles = new DynamicStyleSheet({
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
