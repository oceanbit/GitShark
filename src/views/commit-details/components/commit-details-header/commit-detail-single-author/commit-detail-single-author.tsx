import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {theme} from '@constants';
import {SharkProfilePic} from '@components/shark-profile-pic';
import {GitLogCommit} from '@services';
import dayjs from 'dayjs';

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

  const styles = useDynamicValue(dynamicStyles);

  const commitedTimestamp = dayjs.unix(committer?.timestamp || 0);
  const commitTimeStr = commitedTimestamp.format('D MMM YYYY H:mm');

  const authoredTimestamp = dayjs.unix(author?.timestamp || 0);
  const authorTimeStr = authoredTimestamp.format('D MMM YYYY H:mm');

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <SharkProfilePic size={authorImageSize} />
      </View>
      <View style={styles.personContainer}>
        <Text style={styles.personName}>{author?.name}</Text>
        <Text style={styles.personEmail}>{author?.email}</Text>
        {showAuthoredTimestamp && (
          <Text style={styles.personDate}>Authored on {authorTimeStr}</Text>
        )}
        <Text style={styles.personDate}>Committed on {commitTimeStr}</Text>
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
    marginRight: theme.spacing.xs,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  personName: {
    color: theme.colors.label_high_emphasis,
    ...theme.textStyles.caption_01,
  },
  personDate: {
    color: theme.colors.label_high_emphasis,
    opacity: theme.opacity.secondary,
    ...theme.textStyles.caption_02,
  },
  personEmail: {
    color: theme.colors.label_high_emphasis,
    ...theme.textStyles.caption_02,
  },
});
