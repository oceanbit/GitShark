import * as React from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {Repo} from '@entities';
import {RepoCard} from './components/repo-card';
import {textStyles, theme} from '@constants';
import {RepoListLoading} from './components/repo-list-loading';
import {DialogsAndFab} from './components/dialogs-and-fab';
import {SharkIconButton} from '@components/shark-icon-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {BottomSpacerView, SharkSafeTop} from '../../components/shark-safe-top';

interface RepositoryListUIProps {
  isLoading: boolean;
  isDBLoaded: boolean;
  navigateToSettings: () => void;
  repos: Repo[] | null;
  findRepos: () => Promise<boolean | undefined>;
}
export const RepositoryListUI = ({
  isLoading,
  isDBLoaded,
  navigateToSettings,
  repos,
  findRepos,
}: RepositoryListUIProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <SharkSafeTop>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Repositories</Text>
          <SharkIconButton onPress={navigateToSettings} iconName={'settings'} />
        </View>
        {isLoading && <RepoListLoading />}
        {!isLoading && !!repos?.length && (
          <ScrollView>
            {repos!.map(repo => {
              return (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  onUpdate={() => findRepos()}
                />
              );
            })}
            <BottomSpacerView additionalSpacing={30} />
          </ScrollView>
        )}
      </View>
      <DialogsAndFab
        isDBLoaded={isDBLoaded}
        isLoading={isLoading}
        repos={repos}
        findRepos={findRepos}
      />
    </SharkSafeTop>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: 16,
  },
  headingText: {
    flexGrow: 1,
    width: 1,
    ...textStyles.headline_01,
    color: theme.colors.on_surface,
  },
  noRepos: {
    ...textStyles.headline_01,
    color: theme.colors.on_surface,
    opacity: 0.4,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    // Edgecase for parent padding
    left: 16,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
