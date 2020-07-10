import * as React from 'react';
import {View, Text} from 'react-native';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {Picker} from '@react-native-community/picker';
import {SharkCheckbox} from '@components/shark-checkbox';
import {RemoteBranch} from '@types';

const remoteBranchToString = (branch: RemoteBranch) =>
  `${branch?.remote}/${branch?.name}`;

interface PushDialogProps {
  onDismiss: (
    props: {
      destination: RemoteBranch;
      forcePush: boolean;
      branch: string;
    } | null,
  ) => void;
  visible: boolean;
  localBranches: string[];
  remoteBranches: RemoteBranch[];
}

export const PushDialog = ({
  onDismiss,
  visible,
  localBranches,
  remoteBranches,
}: PushDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [branch, setBranch] = React.useState(localBranches[0]);
  const [destination, setDestination] = React.useState(
    remoteBranchToString(remoteBranches[0]),
  );

  const [forcePush, setForcePush] = React.useState(false);

  const parentOnDismiss = (bool: boolean) => {
    if (bool) {
      const realRemoteBranch = remoteBranches.find(
        r => remoteBranchToString(r) === destination,
      )!;
      onDismiss({
        destination: realRemoteBranch,
        forcePush,
        branch,
      });
    } else {
      onDismiss(null);
    }
    setBranch(localBranches[0]);
    setDestination(remoteBranchToString(remoteBranches[0]));
    setForcePush(false);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Push'}
      text={'Push local changes to a remote repository.'}
      main={
        <>
          <Text style={styles.pickerLabel}>Branch</Text>

          {/* TODO: REPLACE WITH REAL SEASIDE SELECT COMPONENT */}
          <View style={styles.pickerView}>
            <Picker
              selectedValue={branch}
              onValueChange={v => setBranch(v as string)}>
              {localBranches.map(branch => (
                <Picker.Item key={branch} label={branch} value={branch} />
              ))}
            </Picker>
          </View>

          <Text style={styles.pickerLabel}>Destination</Text>

          <View style={styles.pickerView}>
            <Picker
              selectedValue={destination}
              onValueChange={v => setDestination(v as string)}>
              {remoteBranches.map(rBranch => {
                const branchDisplay = remoteBranchToString(rBranch);
                return (
                  <Picker.Item
                    key={branchDisplay}
                    label={branchDisplay}
                    value={branchDisplay}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox
              checked={forcePush}
              onValueChange={v => setForcePush(v)}
            />
            <Text style={styles.checkboxText}>Force Push</Text>
          </View>
        </>
      }
      actions={
        <>
          <SharkButton
            onPress={() => parentOnDismiss(false)}
            type="outline"
            style={styles.cancelBtn}
            text="Cancel"
          />
          <SharkButton onPress={() => {}} type="primary" text="Go Do" />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  pickerLabel: {
    marginBottom: theme.spacing.xs,
  },
  pickerView: {
    borderWidth: theme.borders.normal,
    borderColor: theme.colors.on_surface_secondary,
    borderRadius: theme.borderRadius.regular,
    marginBottom: theme.spacing.m,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: theme.colors.on_surface,
    ...theme.textStyles.body_02,
  },
  cancelBtn: {
    marginRight: theme.spacing.m,
  },
  dialogActions: {
    marginTop: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
