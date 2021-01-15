import * as React from 'react';
import {ProgressErrorDialog} from '@components/progress-error-dialog';
import {useTranslation} from 'react-i18next';

interface OnCommitActionsDialogProps {
  visible: boolean;
}

export const OnCommitActionsDialog = ({
  visible,
}: OnCommitActionsDialogProps) => {
  const {t} = useTranslation();

  return (
    <ProgressErrorDialog
      headerStr={t('committingAction')}
      errorBodyText={''}
      onRetry={() => {}}
      onDismiss={() => {}}
      visible={visible}
      progress={0}
      indeterminate={true}
      bodyText={''}
      errorStr={''}
    />
  );
};
