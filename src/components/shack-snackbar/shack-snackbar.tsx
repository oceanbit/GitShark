import * as React from 'react';
import {Snackbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface SharkSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  action?: React.ComponentProps<typeof Snackbar>['action'];
  message: string;
}
export const SharkSnackbar = ({
  visible,
  onDismiss,
  action,
  message,
}: SharkSnackbarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Snackbar
      visible={visible}
      duration={Snackbar.DURATION_MEDIUM}
      onDismiss={onDismiss}
      style={{marginBottom: insets.bottom}}
      action={action}>
      {message}
    </Snackbar>
  );
};
