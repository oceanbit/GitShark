import * as React from 'react';
import {View, Text} from 'react-native';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {Picker} from '@react-native-community/picker';
import {SharkCheckbox} from '@components/shark-checkbox';
import {RemoteBranch} from '@types';

const remoteBranchToString = (branch: RemoteBranch | null) =>
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
  currentBranch: string;
  remoteBranches: RemoteBranch[];
  trackedBranch: RemoteBranch | null;
}

export const PushDialog = ({
  onDismiss,
  visible,
  localBranches,
  remoteBranches,
  currentBranch,
  trackedBranch,
}: PushDialogProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const [branch, setBranch] = React.useState(currentBranch);
  const [destination, setDestination] = React.useState(
    remoteBranchToString(trackedBranch),
  );

  // There's a timing issue where `trackedBranch` is undefined, this fixes that issue
  React.useEffect(() => {
    setDestination(remoteBranchToString(trackedBranch));
  }, [trackedBranch]);

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
    setBranch(currentBranch);
    setDestination(remoteBranchToString(trackedBranch));
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
              {localBranches?.map(branch => (
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
          <SharkButton
            onPress={() => parentOnDismiss(true)}
            type="primary"
            text="Push"
          />
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
    borderColor: theme.colors.label_medium_emphasis,
    borderRadius: theme.borderRadius.regular,
    marginBottom: theme.spacing.m,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: theme.colors.label_high_emphasis,
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
