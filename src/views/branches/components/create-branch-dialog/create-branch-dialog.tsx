import * as React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {AppDialog} from '@components/dialog';
import {SharkTextInput} from '@components/shark-text-input';
import {ErrorMessageBox} from '@components/error-message-box';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkCheckbox} from '@components/shark-checkbox';
import {borders, spacing, textStyles, theme} from '@constants';

interface CreateBranchDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  onBranchCreate: (props: {
    branchName: string;
    checkAfterCreate: boolean;
  }) => void;
  // The array of local branch names, to validate user input against
  branches: string[];
  errorStr: string;
}

export const CreateBranchDialog = ({
  onDismiss,
  visible,
  onBranchCreate,
  branches,
  errorStr,
}: CreateBranchDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [branchName, setBranchName] = React.useState('');
  const [checkAfterCreate, setCheckAfterCreate] = React.useState(false);

  React.useEffect(() => {
    if (visible) return;
    // When dismissed via `visible=false`, reset the values within
    setBranchName('');
    setCheckAfterCreate(false);
  }, [visible]);

  const parentOnDismiss = (bool: boolean) => {
    setBranchName('');
    setCheckAfterCreate(false);
    onDismiss(bool);
  };

  const isNameTaken = branches.includes(branchName);

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Create branch'}
      text={'Uncommitted changes will be moved to the new branch.'}
      main={
        <>
          <SharkTextInput
            placeholder={'Branch name'}
            value={branchName}
            onChangeText={val => setBranchName(val)}
            prefixIcon={'branch'}
            errorStr={isNameTaken ? 'Branch name is already taken' : ''}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
          <TouchableWithoutFeedback
            style={styles.checkboxContainer}
            onPress={() => setCheckAfterCreate(v => !v)}>
            <View style={styles.checkboxView}>
              <SharkCheckbox
                checked={checkAfterCreate}
                onValueChange={setCheckAfterCreate}
              />
              <Text style={styles.checkoutText}>Checkout after creation</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
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
            onPress={() => onBranchCreate({branchName, checkAfterCreate})}
            type="primary"
            disabled={isNameTaken}
            text={'Create'}
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
    borderColor: theme.colors.divider,
    borderWidth: borders.thick,
    marginRight: spacing.m,
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginTop: spacing.xs,
  },
  checkoutText: {
    color: theme.colors.on_surface,
    ...textStyles.body_01,
  },
});
