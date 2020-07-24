import * as React from 'react';
import {ProgressErrorDialog} from '@components/progress-error-dialog';

interface OnCommitActionsDialogProps {
  visible: boolean;
}

export const OnCommitActionsDialog = ({
  visible,
}: OnCommitActionsDialogProps) => {
  return (
    <ProgressErrorDialog
      headerStr={'Committing...'}
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
