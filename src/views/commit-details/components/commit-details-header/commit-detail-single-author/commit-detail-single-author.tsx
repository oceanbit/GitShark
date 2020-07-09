import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {opacity, spacing, theme} from '@constants';
import {SharkProfilePic} from '@components/shark-profile-pic';
import {GitLogCommit} from '@services';

const authorImageSize = 40;

const imageContainerWidth = 56;

interface CommitDetailsSingleAuthorProps {
  style?: StyleProp<ViewStyle>;

  committer: GitLogCommit['committer'];
  author?: GitLogCommit['author'];
}

export const CommitDetailsSingleAuthor = ({
  // _IF_ there is an author, the email will be the same, the only diff will be the timestamp potentially
  author,
  committer,
  style,
}: CommitDetailsSingleAuthorProps) => {
  const showAuthoredTimestamp =
    author && author.timestamp !== committer.timestamp;

  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <SharkProfilePic size={authorImageSize} />
      </View>
      <View style={styles.personContainer}>
        <Text style={styles.personName}>Corbin Crutchley</Text>
        <Text style={styles.personEmail}>crutchcorn@gmail.com</Text>
        {showAuthoredTimestamp && (
          <Text style={styles.personDate}>Authored on 12 Feb 2020 12:00</Text>
        )}
        <Text style={styles.personDate}>Committed on 12 Feb 2020 12:00</Text>
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  imageContainer: {
    width: imageContainerWidth,
    marginRight: spacing.xs,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  personName: {
    color: theme.colors.on_surface,
    ...theme.textStyles.caption_01,
  },
  personDate: {
    color: theme.colors.on_surface,
    opacity: opacity.secondary,
    ...theme.textStyles.caption_02,
  },
  personEmail: {
    color: theme.colors.on_surface,
    ...theme.textStyles.caption_02,
  },
});
