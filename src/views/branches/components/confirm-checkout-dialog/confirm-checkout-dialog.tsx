import * as React from 'react';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {theme} from '@constants';

interface ConfirmCheckoutDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const ConfirmCheckoutDialog = ({
  onDismiss,
  visible,
}: ConfirmCheckoutDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const parentOnDismiss = (bool: boolean) => {
    onDismiss(bool);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Checkout branch'}
      text={
        "Are you sure you'd like to checkout a new branch? Your changes (staged and unstaged) will be lost."
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text={'Cancel'}
          />
          <SharkButton
            onPress={() => parentOnDismiss(true)}
            type="primary"
            text={'Discard & Checkout'}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  cancelBtn: {
    borderColor: theme.colors.tint_on_surface_16,
    borderWidth: theme.borders.thick,
    marginRight: theme.spacing.m,
  },
});
