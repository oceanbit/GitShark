import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ReduxRepo} from '@entities';
import {RepoCard} from './components/repo-card';
import {theme} from '@constants';
import {RepoListLoading} from './components/repo-list-loading';
import {DialogsAndFab} from './components/dialogs-and-fab';
import {SharkIconButton} from '@components/shark-icon-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {BottomSpacerView, SharkSafeTop} from '../../components/shark-safe-top';
import {useTranslation} from 'react-i18next';

interface RepositoryListUIProps {
  isLoading: boolean;
  isDBLoaded: boolean;
  navigateToSettings: () => void;
  repos: ReduxRepo[] | null;
  findRepos: () => Promise<void>;
  renameRepo: (repo: ReduxRepo, newName: string) => void;
  deleteRepo: (repo: ReduxRepo) => void;
}

export const RepositoryListUI = ({
  isLoading,
  isDBLoaded,
  navigateToSettings,
  repos,
  findRepos,
  renameRepo,
  deleteRepo,
}: RepositoryListUIProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const {t} = useTranslation();

  return (
    <SharkSafeTop>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{t('repoListTitle')}</Text>
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
                  onDelete={() => deleteRepo(repo)}
                  onRename={newName => renameRepo(repo, newName)}
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
    paddingTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  headingText: {
    flexGrow: 1,
    width: 1,
    ...theme.textStyles.headline_04,
    color: theme.colors.label_high_emphasis,
  },
  noRepos: {
    ...theme.textStyles.headline_04,
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.disabled,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    // Edgecase for parent padding
    left: theme.spacing.m,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
