import * as React from 'react';
import {AppDialog} from '@components/dialog';
import {SharkTextInput} from '@components/shark-text-input';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {borders, spacing, theme} from '@constants';

interface RenameBranchDialogProps {
  onDismiss: () => void;
  visible: boolean;
  onBranchRename: (props: {branchName: string}) => void;
  // The array of local branch names, to validate user input against
  branches: string[];
}

export const RenameBranchDialog = ({
  onDismiss,
  visible,
  onBranchRename,
  branches,
}: RenameBranchDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [branchName, setBranchName] = React.useState('');

  const parentOnDismiss = () => {
    setBranchName('');
    onDismiss();
  };

  React.useEffect(() => {
    if (visible) return;
    // When dismissed via `visible=false`, reset the values within
    setBranchName('');
  }, [visible]);

  const isNameTaken = branches.includes(branchName);

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss()}
      title={'Rename branch'}
      text={'Rename your local branch to a new name.'}
      main={
        <>
          <SharkTextInput
            placeholder={'Branch name'}
            value={branchName}
            onChangeText={val => setBranchName(val)}
            prefixIcon={'branch'}
            errorStr={isNameTaken ? 'Branch name is already taken' : ''}
          />
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss()}
            type="outline"
            style={styles.cancelBtn}
            text={'Cancel'}
          />
          <SharkButton
            onPress={() => onBranchRename({branchName})}
            type="primary"
            disabled={isNameTaken}
            text={'Rename'}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: spacing.xs,
  },
  cancelBtn: {
    borderColor: theme.colors.tint_on_surface_16,
    borderWidth: borders.thick,
    marginRight: spacing.m,
  },
  checkoutText: {
    color: theme.colors.on_surface,
    ...theme.textStyles.body_01,
  },
});
