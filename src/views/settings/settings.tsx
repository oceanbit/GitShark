import * as React from 'react';
import {ScrollView, Text} from 'react-native';
import {SetDarkModeContext, theme} from '@constants';
import {SharkButtonToggleGroup} from '@components/shark-button-toggle-group';
import {AppBar} from '@components/app-bar';
import {SharkSubheader} from '@components/shark-subheader';
import {useNavigation} from '@react-navigation/native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {BottomSpacerView, TopSpacerView} from '../../components/shark-safe-top';
import {AccountButton} from './account-button/account-button';
import {useTranslation} from 'react-i18next';
import {SharkButton} from '@components/shark-button';

export const Settings = () => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);

  const history = useNavigation();

  const {setDarkMode, localDarkMode} = React.useContext(SetDarkModeContext);

  const themeValues = [t('autoDarkTheme'), t('lightTheme'), t('darkTheme')];

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

  return (
    <ScrollView>
      <TopSpacerView isFloating={true} />
      <AppBar
        leftIcon="back"
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
      {/*TODO: Update this button*/}
      <SharkButton
        onPress={() => history.navigate('StagingLayout')}
        text={'Staging layout'}
      />
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
});
