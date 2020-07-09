import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ReduxRepo} from '@entities';
import {RepoCard} from './components/repo-card';
import {spacing, theme} from '@constants';
import {RepoListLoading} from './components/repo-list-loading';
import {DialogsAndFab} from './components/dialogs-and-fab';
import {SharkIconButton} from '@components/shark-icon-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {BottomSpacerView, SharkSafeTop} from '../../components/shark-safe-top';

interface RepositoryListUIProps {
  isLoading: boolean;
  isDBLoaded: boolean;
  navigateToSettings: () => void;
  repos: ReduxRepo[] | null;
  findRepos: () => Promise<void>;
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
    paddingTop: spacing.m,
    paddingHorizontal: spacing.m,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  headingText: {
    flexGrow: 1,
    width: 1,
    ...theme.textStyles.headline_01,
    color: theme.colors.on_surface,
  },
  noRepos: {
    ...theme.textStyles.headline_01,
    color: theme.colors.on_surface,
    opacity: 0.4,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    // Edgecase for parent padding
    left: spacing.m,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
