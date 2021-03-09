import * as React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {AppDialog} from '@components/dialog';
import {SharkTextInput} from '@components/shark-text-input';
import {ErrorMessageBox} from '@components/error-message-box';
import {SharkButton} from '@components/shark-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {SharkCheckbox} from '@components/shark-checkbox';
import {theme} from '@constants';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

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
      title={t('createBranchDialogTitle')}
      text={t('createBranchDialogText')}
      main={
        <>
          <SharkTextInput
            placeholder={t('branchNameInput')}
            value={branchName}
            onChangeText={val => setBranchName(val)}
            prefixIcon={'branch'}
            errorStr={isNameTaken ? t('branchNameTaken') : ''}
          />
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
          <View style={styles.checkboxContainer}>
            <SharkCheckbox
              checked={checkAfterCreate}
              onValueChange={setCheckAfterCreate}>
              <Text style={styles.checkoutText}>
                {t('checkoutAfterCreate')}
              </Text>
            </SharkCheckbox>
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
            onPress={() => onBranchCreate({branchName, checkAfterCreate})}
            type="primary"
            disabled={isNameTaken}
            text={t('createAction')}
          />
        </>
      }
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  errorBox: {
    marginTop: theme.spacing.xs,
  },
  cancelBtn: {
    borderColor: theme.colors.tint_on_surface_01,
    borderWidth: theme.borders.thick,
    marginRight: theme.spacing.m,
  },
  checkboxContainer: {
    marginTop: theme.spacing.xs,
  },
  checkoutText: {
    color: theme.colors.label_high_emphasis,
    ...theme.textStyles.body_01,
  },
});
