import * as React from 'react';
import {View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {CommitDetailsHeader} from './components/commit-details-header';
import {AppBar} from '@components/app-bar';
import {SharkMenu} from '@components/shark-menu';
import {Menu} from 'react-native-paper';
import {SharkIconButton} from '@components/shark-icon-button';
import {SharkDivider} from '@components/shark-divider';
import {textStyles, theme} from '@constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GitLogCommit} from '@services';

const messageDefault = `
The \`FormStyle\` enum offers two options, and the explanation of the difference between the two can be found on the CLDR official website. Sadly, the link changed and the one currently referenced is a dead-end. This commit fixes the link.

PR Close #37069
`.trim();

interface CommitDetailsUIProps {
  committer: GitLogCommit['committer'];
  author?: GitLogCommit['author'];
  message: string;
}

export const CommitDetailsUI = ({
  committer,
  author,
  message = messageDefault,
}: CommitDetailsUIProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const change_addition = useDynamicValue(theme.colors.change_addition);
  const change_removal = useDynamicValue(theme.colors.change_removal);
  const change_mixed = useDynamicValue(theme.colors.change_mixed);

  const [headerExpanded, setHeaderExpanded] = React.useState(false);
  const [headerMessageExpanded, setHeaderMessageExpanded] = React.useState(
    false,
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <AppBar
        leftIcon="arrow-left"
        onLeftSelect={() => {}}
        hasBottomBorder={false}
        rightChild={
          <SharkMenu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <SharkIconButton
                iconName="dots-horizontal"
                onPress={() => setIsMenuOpen(true)}
              />
            }>
            <Menu.Item onPress={() => {}} title="Open Folder" />
            <Menu.Item onPress={() => {}} title="Rename" />
          </SharkMenu>
        }
      />

      <View style={styles.container}>
        <CommitDetailsHeader
          expanded={headerExpanded}
          setExpanded={setHeaderExpanded}
          messageExpanded={headerMessageExpanded}
          setMessageExpanded={setHeaderMessageExpanded}
          message={message}
          committer={committer}
          author={author}
        />
        <SharkDivider />
        <View style={styles.changesHeader}>
          <Text style={styles.changesHeaderText}>Changes</Text>
          <View style={styles.growContainer} />
          <View style={styles.infoBlock}>
            <Icon name="plus-circle" size={24} color={change_addition} />
            <Text style={[styles.iconText, styles.additionText]}>1</Text>
          </View>

          <View style={[styles.infoBlock]}>
            <Icon name="minus-circle" size={24} color={change_removal} />
            <Text style={[styles.iconText, styles.removalText]}>1</Text>
          </View>

          <View style={[styles.infoBlock]}>
            <Icon
              name="dots-horizontal-circle"
              size={24}
              color={change_mixed}
            />
            <Text style={[styles.iconText, styles.modifiedText]}>1</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  changesHeader: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  growContainer: {
    flexGrow: 1,
  },
  changesHeaderText: {
    ...textStyles.callout,
    color: theme.colors.on_surface,
  },
  infoBlock: {
    marginLeft: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 4,
    ...textStyles.caption_01,
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
  movedText: {},
});
