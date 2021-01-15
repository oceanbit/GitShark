import * as React from 'react';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {useTranslation} from 'react-i18next';

interface ConfirmCheckoutDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
}

export const ConfirmCheckoutDialog = ({
  onDismiss,
  visible,
}: ConfirmCheckoutDialogProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const parentOnDismiss = (bool: boolean) => {
    onDismiss(bool);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={t('confirmCheckoutDialogTitle')}
      text={t('confirmCheckoutDialogText')}
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text={t('cancelAction')}
          />
          <SharkButton
            onPress={() => parentOnDismiss(true)}
            type="primary"
            text={t('discardCheckoutAction')}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  cancelBtn: {
    borderColor: theme.colors.tint_on_surface_01,
    borderWidth: theme.borders.thick,
    marginRight: theme.spacing.m,
  },
});
