import * as React from 'react';
import {View, Text} from 'react-native';
import {theme} from '@constants';
import {AppDialog} from '@components/dialog';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {Picker} from '@react-native-community/picker';
import {SharkCheckbox} from '@components/shark-checkbox';
import {Remotes} from '@types';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const [remote, setRemote] = React.useState<string>('');
  const [fetchAll, setFetchAll] = React.useState(false);
  const [prune, setPrune] = React.useState(false);

  React.useEffect(() => {
    if (!remotes || !remotes.length) return;
    setRemote(remotes[0].remote);
  }, [remotes]);

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
    setRemote('');
    setFetchAll(false);
    setPrune(false);
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={t('fetchDialogTitle')}
      text={t('fetchDialogText')}
      main={
        <>
          <Text style={styles.pickerLabel}>{t('remoteLabel')}</Text>

          {/* TODO: REPLACE WITH REAL SEASIDE SELECT COMPONENT */}
          <View style={styles.pickerView}>
            <Picker
              style={styles.pickerStyle}
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
            <Text style={styles.checkboxText}>{t('fetchAllRemotes')}</Text>
          </View>

          <View style={styles.checkbox}>
            <SharkCheckbox checked={prune} onValueChange={v => setPrune(v)} />
            <Text style={styles.checkboxText}>{t('excludeDeleted')}</Text>
          </View>
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
            text={t('fetchAction')}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  pickerLabel: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.label_high_emphasis,
  },
  pickerStyle: {
    color: theme.colors.label_high_emphasis,
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
