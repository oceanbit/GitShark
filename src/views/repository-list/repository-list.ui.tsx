import * as React from 'react';
import {ScrollView, Text, View, FlatList} from 'react-native';
import {ReduxRepo} from '@entities';
import {RepoCard} from './components/repo-card';
import {theme} from '@constants';
import {RepoListLoading} from './components/repo-list-loading';
import {DialogsAndFab} from './components/dialogs-and-fab';
import {SharkIconButton} from '@components/shark-icon-button';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {BottomSpacerView, SharkSafeTop} from '../../components/shark-safe-top';
import {useTranslation} from 'react-i18next';
import {mediaQuery, useDimensions} from 'react-native-responsive-ui';

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

  const {width, height} = useDimensions();

  const isTablet = mediaQuery(
    {minWidth: theme.breakpoints.tablet},
    width,
    height,
  );

  const numTabs = isTablet ? 2 : 1;

  const cardClass = isTablet ? {flex: 1} : {};

  const renderItem = ({
    item: repo,
    index,
  }: {
    item: ReduxRepo;
    index: number;
  }) => {
    const addSpacer = isTablet && !(index % numTabs);
    const lastItem = index === repos!.length - 1;

    // Because "flex" is set to "1", it will attempt to fill the entire row. However, if we add a non-existant second "card"
    // It will space out the card as if there were two columns
    const renderFakeSecondView = addSpacer && lastItem;

    return (
      <>
        <View style={cardClass}>
          <RepoCard
            repo={repo}
            onDelete={() => deleteRepo(repo)}
            onRename={newName => renameRepo(repo, newName)}
          />
        </View>
        {addSpacer && <View style={{width: theme.spacing.m}} />}
        {renderFakeSecondView && <View style={cardClass} />}
        {lastItem && <BottomSpacerView additionalSpacing={30} />}
      </>
    );
  };

  return (
    <SharkSafeTop>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text
            style={styles.headingText}
            accessibilityLabel={t('repoListA11Y')}
            accessibilityRole={'header'}>
            {t('repoListTitle')}
          </Text>
          <SharkIconButton
            onPress={navigateToSettings}
            iconName={'settings'}
            label={t('settingsButtonLabel')}
          />
        </View>
        {isLoading && <RepoListLoading />}
        {!isLoading && !!repos?.length && (
          <FlatList
            key={`${isTablet}`}
            data={repos!}
            columnWrapperStyle={
              isTablet
                ? {
                    display: 'flex',
                    justifyContent: 'space-between',
                  }
                : undefined
            }
            numColumns={numTabs}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
          />
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
