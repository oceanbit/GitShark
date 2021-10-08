import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SetDarkModeContext, StyleOfStagingContext, theme} from '@constants';
import {SharkButtonToggleGroup} from '@components/shark-button-toggle-group';
import {AppBar} from '@components/app-bar';
import {SharkSubheader} from '@components/shark-subheader';
import {useNavigation} from '@react-navigation/native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {BottomSpacerView, TopSpacerView} from '../../components/shark-safe-top';
import {AccountButton} from './account-button/account-button';
import {useTranslation} from 'react-i18next';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '@components/shark-icon';
import {SharkDivider} from '@components/shark-divider';
import {SrOnly} from '@components/sr-only';
import {NavProps} from "@types";

export const Settings = () => {
  const {t} = useTranslation();

  const accent = useDynamicValue(theme.colors.primary);
  const high_emphasis = useDynamicValue(theme.colors.label_high_emphasis);

  const styles = useDynamicValue(dynamicStyles);

  const history = useNavigation<NavProps>();

  const {setDarkMode, localDarkMode} = React.useContext(SetDarkModeContext);

  const themeValues = React.useMemo(
    () => [t('autoDarkTheme'), t('lightTheme'), t('darkTheme')],
    [t],
  );

  const matchingLocalMode = React.useMemo(() => {
    switch (localDarkMode) {
      case 'light':
        return themeValues[1];
      case 'dark':
        return themeValues[2];
      case 'auto':
      default:
        return themeValues[0];
    }
  }, [themeValues, localDarkMode]);

  const onThemeSelect = (val: string) => {
    switch (val) {
      case themeValues[0]:
      case 'auto':
      case 'Auto': {
        setDarkMode('auto');
        break;
      }
      case themeValues[1]:
      case 'light':
      case 'Light': {
        setDarkMode('light');
        break;
      }
      default: {
        setDarkMode('dark');
        break;
      }
    }
  };

  const {styleOfStaging} = React.useContext(StyleOfStagingContext);

  const stagingDisplayText =
    styleOfStaging === 'split' ? t('splitLayout') : t('sheetLayout');

  return (
    <ScrollView>
      <TopSpacerView isFloating={true} />
      <AppBar
        leftIcon="back"
        leftIconLabel={t('backAction')}
        onLeftSelect={() => history.goBack()}
        headline={t('settingsHeadline')}
      />
      <SharkSubheader calloutText={t('accountHeadline')} />
      <AccountButton />
      <SharkSubheader calloutText={t('themeHeadline')} />
      <SharkButtonToggleGroup
        values={themeValues}
        value={matchingLocalMode}
        onSelect={onThemeSelect}
        style={styles.themeToggle}
      />
      <Text style={styles.themeText}>{t('themeExplain')}</Text>
      <SharkDivider />
      <SrOnly>
        <Text style={styles.stagingCallout} accessibilityRole={'header'}>
          {t('stagingLayoutHeadline')}
        </Text>
      </SrOnly>
      <TouchableRipple onPress={() => history.navigate('StagingLayout')}>
        <View style={styles.stagingBtnContainer}>
          <Icon
            name={
              styleOfStaging === 'split' ? 'staging_split' : 'staging_sheet'
            }
            size={24}
            color={high_emphasis}
            importantForAccessibility={'no'}
            accessibilityElementsHidden={true}
          />
          <View style={styles.stagingBtnTextContainer}>
            <Text
              style={styles.stagingCallout}
              importantForAccessibility={'no'}
              accessibilityElementsHidden={true}>
              {t('stagingLayoutHeadline')}
            </Text>
            <Text style={styles.stagingBody}>{stagingDisplayText}</Text>
          </View>
          <Icon
            name={'arrow_right'}
            size={24}
            color={accent}
            importantForAccessibility={'no'}
            accessibilityElementsHidden={true}
          />
        </View>
      </TouchableRipple>
      <SharkDivider />
      <BottomSpacerView />
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  themeToggle: {
    marginHorizontal: theme.spacing.m,
    marginTop: theme.spacing.xs,
  },
  themeText: {
    marginVertical: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
    ...theme.textStyles.caption_02,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
  },
  stagingBtnContainer: {
    paddingVertical: theme.spacing.s,
    paddingRight: theme.spacing.m,
    paddingLeft: theme.spacing.l,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stagingBtnTextContainer: {
    paddingRight: theme.spacing.m,
    paddingLeft: theme.spacing.l,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  stagingCallout: {
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  stagingBody: {
    ...theme.textStyles.body_02,
    color: theme.colors.label_medium_emphasis,
  },
});
