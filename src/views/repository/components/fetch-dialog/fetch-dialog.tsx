import * as React from 'react';
import {View, Text} from 'react-native';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {Picker} from '@react-native-community/picker';
import {SharkCheckbox} from '@components/shark-checkbox';
import {Remotes} from '@types';

interface FetchDialogProps {
  onDismiss: (
    props: {
      remote: Remotes;
      fetchAll: boolean;
      prune: boolean;
    } | null,
  ) => void;
  visible: boolean;
  remotes: Remotes[];
}

export const FetchDialog = ({
  onDismiss,
  visible,
  remotes,
}: FetchDialogProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [remote, setRemote] = React.useState(remotes[0]?.remote);
  const [fetchAll, setFetchAll] = React.useState(false);
  const [prune, setPrune] = React.useState(false);

  const parentOnDismiss = (bool: boolean) => {
    if (bool) {
      const realRemote = remotes.find(r => r.remote === remote)!;
      onDismiss({
        remote: realRemote,
        fetchAll,
        prune,
      });
    } else {
      onDismiss(null);
    }
    setRemote(remotes[0]?.remote);
    setFetchAll(false);
    setPrune(false);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Fetch'}
      text={'Fetch latest changes from a remote repository.'}
      main={
        <>
          <Text style={styles.pickerLabel}>Remote</Text>

          {/* TODO: REPLACE WITH REAL SEASIDE SELECT COMPONENT */}
          <View style={styles.pickerView}>
            <Picker
              selectedValue={remote}
              onValueChange={v => setRemote(v as string)}>
              {remotes.map(remote => (
                <Picker.Item
                  key={remote.remote}
                  label={remote.remote}
                  value={remote.remote}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox
              checked={fetchAll}
              onValueChange={v => setFetchAll(v)}
            />
            <Text style={styles.checkboxText}>Fetch all remotes</Text>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox checked={prune} onValueChange={v => setPrune(v)} />
            <Text style={styles.checkboxText}>Exclude deleted branches</Text>
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
            text="Fetch"
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
