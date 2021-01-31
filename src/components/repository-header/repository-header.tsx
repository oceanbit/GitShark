import * as React from 'react';
import {Divider, Menu} from 'react-native-paper';
import {HeaderActionNumber} from './header-action-number/header-action-number';
import {useNavigation} from '@react-navigation/native';
import {RepoHeaderContext} from '@constants';
import {SharkIconButton} from '../shark-icon-button';
import {AppBar} from '../app-bar';
import {SharkMenu} from '../shark-menu';
import {ReduxRepo} from '@entities';
import {useTranslation} from 'react-i18next';

interface RepositoryHeaderProps {
  repo: ReduxRepo | null;
}

export const RepositoryHeader = ({repo}: RepositoryHeaderProps) => {
  const {setActiveDialog, pushPull} = React.useContext(RepoHeaderContext);

  const history = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const {t} = useTranslation();

  if (!repo) return null;

  return (
    <AppBar
      leftIcon="back"
      onLeftSelect={() => history.goBack()}
      headline="Repository"
      caption="Last fetched: 5min ago"
      rightChild={
        <>
          <HeaderActionNumber
            iconName="push"
            val={pushPull?.toPush?.length || 0}
            onPress={() => setActiveDialog('push')}
          />
          <HeaderActionNumber
            iconName="pull"
            val={pushPull?.toPull?.length || 0}
            onPress={() => setActiveDialog('pull')}
          />
          <SharkMenu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <SharkIconButton
                iconName="menu"
                onPress={() => setIsMenuOpen(true)}
              />
            }>
            <Menu.Item
              onPress={() => {
                setIsMenuOpen(false);
                setActiveDialog('fetch');
              }}
              title={t('fetchAction')}
            />
            <Divider />
            {/* <Menu.Item onPress={() => {}} title="Open Folder" /> */}
            <Menu.Item
              onPress={() => {
                setIsMenuOpen(false);
                setActiveDialog('rename');
              }}
              title={t('renameAction')}
            />
          </SharkMenu>
        </>
      }
    />
  );
};
