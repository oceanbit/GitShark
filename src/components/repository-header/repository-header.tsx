import * as React from 'react';
import {Divider, Menu} from 'react-native-paper';
import {HeaderActionNumber} from './header-action-number/header-action-number';
import {useNavigation} from '@react-navigation/native';
import git from 'isomorphic-git/index.umd.min.js';
import {fs, RepoHeaderDialogContext} from '@constants';
import http from 'isomorphic-git/http/web/index.js';
import {SharkIconButton} from '../shark-icon-button';
import {AppBar} from '../app-bar';
import {SharkMenu} from '../shark-menu';
import {ReduxRepo} from '@entities';

interface RepositoryHeaderProps {
  repo: ReduxRepo | null;
}

export const RepositoryHeader = ({repo}: RepositoryHeaderProps) => {
  const {setActiveDialog} = React.useContext(RepoHeaderDialogContext);

  const history = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            val={4}
            onPress={() => setActiveDialog('push')}
          />
          <HeaderActionNumber iconName="pull" val={0} />
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
              title="Fetch"
            />
            <Divider />
            {/* <Menu.Item onPress={() => {}} title="Open Folder" /> */}
            <Menu.Item
              onPress={() => {
                setIsMenuOpen(false);
                setActiveDialog('rename');
              }}
              title="Rename"
            />
          </SharkMenu>
        </>
      }
    />
  );
};
