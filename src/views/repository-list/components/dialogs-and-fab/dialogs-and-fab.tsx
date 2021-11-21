import * as React from 'react';
import {CreateRepositoryDialog} from '../create-repository-dialog';
import {AddExistingRepositoryDialog} from '../add-existing-repository-dialog';
import {CloneRepositoryDialog} from '../clone-repository-dialog';
import {DialogSelection} from './types';
import {
  RepoListExtendedFab,
  RepoListExtendedFabProps,
} from './repo-list-extended-fab';
import {View, Platform} from 'react-native';
import {FullError} from '@types';

const iOS = Platform.OS === 'ios';

interface DialogsProps
  extends Omit<RepoListExtendedFabProps, 'setSelectedAction'> {
  findRepos: () => Promise<void>;
  setComponentError: (error: FullError) => void;
}

export const DialogsAndFab = ({
  findRepos,
  setComponentError,
  ...props
}: DialogsProps) => {
  const [selectedAction, setSelectedAction] = React.useState<
    DialogSelection | ''
  >('');

  const onDismiss = React.useCallback(
    (didUpdate: boolean) => {
      if (didUpdate) {
        findRepos();
      }
      setSelectedAction('');
    },
    [findRepos],
  );

  const dialogElsBase = (
    <>
      <CreateRepositoryDialog
        visible={selectedAction === 'create'}
        onDismiss={onDismiss}
        setComponentError={setComponentError}
      />
      <AddExistingRepositoryDialog
        visible={selectedAction === 'existing'}
        onDismiss={onDismiss}
        setComponentError={setComponentError}
      />
      <CloneRepositoryDialog
        visible={selectedAction === 'clone'}
        onDismiss={onDismiss}
      />
    </>
  );

  // iOS handles zIndex differently, and if this "hack" is not applied, the dialongs
  // won't render properly. Android, however, doesn't support this and it breaks the UI
  const iOSDialogs = <View style={{zIndex: 100}}>{dialogElsBase}</View>;

  const dialogEls = iOS ? iOSDialogs : dialogElsBase;

  return (
    // The dialogs must come AFTER the FAB otherwise there will be a z-index problem when the dialogs are open
    <>
      <RepoListExtendedFab {...props} setSelectedAction={setSelectedAction} />
      {/* Prevent iOS from rendering FAB above dialogs */}
      {dialogEls}
    </>
  );
};
