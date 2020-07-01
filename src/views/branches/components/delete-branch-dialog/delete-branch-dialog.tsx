import * as React from 'react';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {spacing, theme} from '@constants';

interface DeleteBranchDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const DeleteBranchDialog = ({
  onDismiss,
  visible,
}: DeleteBranchDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const parentOnDismiss = (bool: boolean) => {
    onDismiss(bool);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Delete branch'}
      text={
        'Are you sure that you want to delete the local branch from your repository?'
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
            text={'Delete'}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  cancelBtn: {
    borderColor: theme.colors.divider,
    borderWidth: 2,
    marginRight: spacing.m,
  },
});
