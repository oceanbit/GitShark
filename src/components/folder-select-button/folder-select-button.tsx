import * as React from 'react';
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  NativeModules,
  Platform,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '@components/shark-icon';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {useTranslation} from 'react-i18next';

interface FolderSelectButtonProps {
  onFolderSelect: (path: string) => void;
  path: string;
  style?: StyleProp<ViewStyle>;
}

export const FolderSelectButton = ({
  onFolderSelect,
  path,
  style,
}: FolderSelectButtonProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);
  const accent = useDynamicValue(theme.colors.primary);

  const selectDirectory = () => {
    if (Platform.OS === 'android') {
      NativeModules.DirectoryPickerModule.Show(
        {
          title: t('selectFolderTitle'),
          closeMenu: true,
          path: '',
        },
        (selectedPath: string) => {
          // onDone
          console.log('file selected: ' + selectedPath);
          onFolderSelect(selectedPath);
        },
        () => {
          // onCancel
          console.log('cancelled');
        },
      );
    }
  };

  return (
    <>
      {!path && (
        <TouchableRipple onPress={() => selectDirectory()} style={style}>
          <View style={styles.selectFolderBtn}>
            <Icon
              size={24}
              name="folder"
              color={accent}
              importantForAccessibility={'no'}
              accessibilityElementsHidden={true}
            />
            <Text style={styles.selectFolderText}>{t('selectFolder')}</Text>
          </View>
        </TouchableRipple>
      )}
      {!!path && (
        <TouchableRipple onPress={() => selectDirectory()} style={style}>
          <View style={styles.selectFolderBtn}>
            <Text
              ellipsizeMode="head"
              numberOfLines={1}
              accessibilityLabel={t('selectedFolderPath', {path})}
              style={[styles.selectFolderText, styles.selectFolderBtnWithPath]}>
              {path}
            </Text>
            <Icon
              size={24}
              name="folder"
              color={accent}
              importantForAccessibility={'no'}
              accessibilityElementsHidden={true}
            />
          </View>
        </TouchableRipple>
      )}
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  selectFolderBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.tint_on_surface_01,
    borderWidth: theme.borders.thick,
    borderRadius: theme.borderRadius.regular,
    ...theme.textStyles.callout_01,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
  },
  selectFolderBtnWithPath: {
    flexGrow: 1,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
    marginRight: theme.spacing.s,
  },
  selectFolderText: {
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    ...theme.textStyles.callout_01,
  },
});
