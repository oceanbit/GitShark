import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {CommitDetailsHeader} from './components/commit-details-header';
import {AppBar} from '@components/app-bar';
import {SharkMenu} from '@components/shark-menu';
import {Menu} from 'react-native-paper';
import {SharkIconButton} from '@components/shark-icon-button';
import {SharkDivider} from '@components/shark-divider';
import {theme} from '@constants';
import {Icon} from '@components/shark-icon';
import {ChangesArrayItem, GitLogCommit} from '@services';
import {FileChangeListItem} from '@components/file-change-list-item';
import {useTranslation} from 'react-i18next';

interface CommitDetailsUIProps {
  committer: GitLogCommit['committer'];
  author?: GitLogCommit['author'];
  message: string;
  title: string;
  sha: string;
  parents: string[];
  onNavToPar: (val: string) => void;
  files: ChangesArrayItem[];
  onBack: () => void;
}

export const CommitDetailsUI = ({
  committer,
  author,
  message,
  title,
  sha,
  parents,
  onNavToPar,
  files,
  onBack,
}: CommitDetailsUIProps) => {
  const {t} = useTranslation();

  const styles = useDynamicValue(dynamicStyles);
  const change_addition = useDynamicValue(theme.colors.change_addition);
  const change_removal = useDynamicValue(theme.colors.change_removal);
  const change_mixed = useDynamicValue(theme.colors.change_mixed);

  const added = files.filter(file => file.fileStatus === 'added').length;
  const removed = files.filter(file => file.fileStatus === 'deleted').length;
  const modified = files.filter(file => file.fileStatus === 'modified').length;

  const [headerExpanded, setHeaderExpanded] = React.useState(false);
  const [headerMessageExpanded, setHeaderMessageExpanded] = React.useState(
    false,
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <AppBar
        leftIcon="back"
        onLeftSelect={onBack}
        hasBottomBorder={false}
        rightChild={
          <SharkMenu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <SharkIconButton
                iconName="menu"
                onPress={() => setIsMenuOpen(true)}
              />
            }>
            <Menu.Item onPress={() => {}} title={t('openFolderAction')} />
            <Menu.Item onPress={() => {}} title={t('renameAction')} />
          </SharkMenu>
        }
      />

      <ScrollView>
        <CommitDetailsHeader
          expanded={headerExpanded}
          setExpanded={setHeaderExpanded}
          messageExpanded={headerMessageExpanded}
          setMessageExpanded={setHeaderMessageExpanded}
          message={message}
          committer={committer}
          author={author}
          title={title}
          sha={sha}
          parents={parents}
          onNavToPar={onNavToPar}
        />
        <SharkDivider />
        <View style={styles.changesHeader}>
          <Text style={styles.changesHeaderText}>{t('changesHeader')}</Text>
          <View style={styles.growContainer} />
          {!!added && (
            <View style={styles.infoBlock}>
              <Icon name="change_addition" size={16} color={change_addition} />
              <Text style={[styles.iconText, styles.additionText]}>
                {added}
              </Text>
            </View>
          )}

          {!!removed && (
            <View style={[styles.infoBlock]}>
              <Icon name="change_removal" size={16} color={change_removal} />
              <Text style={[styles.iconText, styles.removalText]}>
                {removed}
              </Text>
            </View>
          )}

          {!!modified && (
            <View style={[styles.infoBlock]}>
              <Icon name="change_mixed" size={16} color={change_mixed} />
              <Text style={[styles.iconText, styles.modifiedText]}>
                {modified}
              </Text>
            </View>
          )}
        </View>
        <SharkDivider />
        {files.map(file => (
          <React.Fragment key={file.fileName}>
            <FileChangeListItem
              fileName={file.fileName}
              fileStatus={file.fileStatus}
            />
            <SharkDivider />
          </React.Fragment>
        ))}
      </ScrollView>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  changesHeader: {
    padding: theme.spacing.m,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  growContainer: {
    flexGrow: 1,
  },
  changesHeaderText: {
    ...theme.textStyles.callout_01,
    color: theme.colors.label_high_emphasis,
  },
  infoBlock: {
    marginLeft: theme.spacing.xs,
    padding: theme.spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: theme.spacing.xxs,
    ...theme.textStyles.caption_01,
  },
  additionText: {
    color: theme.colors.change_addition,
  },
  removalText: {
    color: theme.colors.change_removal,
  },
  modifiedText: {
    color: theme.colors.change_mixed,
  },
});
