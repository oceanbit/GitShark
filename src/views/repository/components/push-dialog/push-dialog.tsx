import * as React from 'react';
import {View, Text} from 'react-native';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkPicker} from '@components/shark-picker';
import {SharkCheckbox} from '@components/shark-checkbox';
import {RemoteBranch} from '@types';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

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
      title={t('pushDialogTitle')}
      text={t('pushDialogText')}
      main={
        <>
          <Text style={styles.pickerLabel}>{t('branchPickerLabel')}</Text>

          {/* TODO: REPLACE WITH REAL SEASIDE SELECT COMPONENT */}
          <View style={styles.pickerView}>
            <SharkPicker
              selectedValue={branch}
              onValueChange={v => setBranch(v as string)}>
              {localBranches?.map(branch => (
                <SharkPicker.Item key={branch} label={branch} value={branch} />
              ))}
            </SharkPicker>
          </View>

          <Text style={styles.pickerLabel}>{t('pushDestinationLabel')}</Text>

          <View style={styles.pickerView}>
            <SharkPicker
              selectedValue={destination}
              onValueChange={v => setDestination(v as string)}>
              {remoteBranches.map(rBranch => {
                const branchDisplay = remoteBranchToString(rBranch);
                return (
                  <SharkPicker.Item
                    key={branchDisplay}
                    label={branchDisplay}
                    value={branchDisplay}
                  />
                );
              })}
            </SharkPicker>
          </View>

          <SharkCheckbox
            checked={forcePush}
            onValueChange={v => setForcePush(v)}>
            <Text style={styles.checkboxText}>{t('forcePushLabel')}</Text>
          </SharkCheckbox>
        </>
      }
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
            text={t('pushAction')}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  pickerLabel: {
    color: theme.colors.label_high_emphasis,
    marginBottom: theme.spacing.xs,
  },
  pickerView: {
    borderWidth: theme.borders.normal,
    borderColor: theme.colors.label_medium_emphasis,
    borderRadius: theme.borderRadius.regular,
    marginBottom: theme.spacing.m,
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
