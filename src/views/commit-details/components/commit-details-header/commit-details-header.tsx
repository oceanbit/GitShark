import * as React from 'react';
import {Animated, Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {CommitDetailsDualAuthor} from './commit-detail-dual-author';
import {CommitDetailsSingleAuthor} from './commit-detail-single-author';
import {theme} from '@constants';
import {DropdownContent} from '@components/dropdown-content';
import {AnimatedDropdownArrow} from '@components/animated-dropdown-arrow';
import {TouchableRipple} from 'react-native-paper';
import {CommitDetailsMoreInfo} from './commit-details-more-info';
import {CommitMessageDropdown} from './commit-message-dropdown';
import {GitLogCommit} from '@services';

interface CommitDetailsHeaderProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  messageExpanded: boolean;
  setMessageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  committer: GitLogCommit['committer'];
  author?: GitLogCommit['author'];
  title: string;
  sha: string;
  parents: string[];
  onNavToPar: (val: string) => void;
}

export const CommitDetailsHeader = ({
  expanded,
  setExpanded,
  messageExpanded,
  setMessageExpanded,
  message,
  committer,
  author,
  title,
  sha,
  parents,
  onNavToPar,
}: CommitDetailsHeaderProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [showMoreInfoOpacity] = React.useState(new Animated.Value(0));
  const [showLessInfoOpacity] = React.useState(new Animated.Value(0));

  const showOne = !author || author.email === committer.email;

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(showMoreInfoOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(showLessInfoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(showMoreInfoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(showLessInfoOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded, showMoreInfoOpacity, showLessInfoOpacity]);

  return (
    <View style={styles.container}>
      <Text style={styles.commitStyle}>{title}</Text>
      {!!message && (
        <CommitMessageDropdown
          message={message}
          expanded={messageExpanded}
          setExpanded={setMessageExpanded}
        />
      )}
      {showOne && (
        <CommitDetailsSingleAuthor
          style={styles.authorBlock}
          committer={committer}
          author={author}
        />
      )}
      {!showOne && (
        <CommitDetailsDualAuthor
          expanded={expanded}
          style={styles.authorBlock}
        />
      )}
      <DropdownContent expanded={expanded}>
        <CommitDetailsMoreInfo
          sha={sha}
          parents={parents}
          onNavToPar={onNavToPar}
        />
      </DropdownContent>
      <TouchableRipple
        style={styles.dropdownContainer}
        onPress={() => setExpanded(v => !v)}>
        <>
          <AnimatedDropdownArrow
            expanded={expanded}
            setExpanded={setExpanded}
          />
          <View style={styles.dropdropTextContainer}>
            <Animated.Text
              style={[styles.dropdownText, {opacity: showMoreInfoOpacity}]}>
              More info
            </Animated.Text>
            <Animated.Text
              style={[
                styles.dropdownText,
                styles.showLess,
                {opacity: showLessInfoOpacity},
              ]}>
              Less info
            </Animated.Text>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
  commitStyle: {
    ...theme.textStyles.callout,
    marginHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.xs,
  },
  authorBlock: {
    marginTop: theme.spacing.xs,
    paddingVertical: theme.spacing.xxs,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.m,
  },
  dropdownContainer: {
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.l,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    ...theme.textStyles.caption_01,
    color: theme.colors.primary,
    marginLeft: theme.spacing.m,
    flexGrow: 1,
    textAlignVertical: 'center',
  },
  dropdropTextContainer: {
    position: 'relative',
  },
  showLess: {
    position: 'absolute',
    height: '100%',
  },
});
