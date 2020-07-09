import {Text, View} from 'react-native';
import * as React from 'react';
import {theme} from '@constants';
import {TouchableRipple} from 'react-native-paper';
import {CommitCardPushPull} from './commit-card-push-pull';
import dayjs from 'dayjs';
import {getCommitHeaderBody, GitLogCommit} from '@services';
import {SharkProfilePic} from '../../shark-profile-pic';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';

interface CommitCardProps {
  commit: GitLogCommit;
  onPress: (commit: GitLogCommit) => void;
}

export const CommitCard = ({commit, onPress}: CommitCardProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const rippleColor = useDynamicValue(theme.colors.ripple_surface);

  const {title, message} = getCommitHeaderBody({commit});

  const needsPulling = !!(Math.floor(Math.random() * 10) < 5);
  const needsPushing = !!(Math.floor(Math.random() * 10) < 7);
  const {dateStr, timeStr} = React.useMemo(() => {
    const dayjsTimestampe = dayjs(commit.author.timestamp);
    return {
      dateStr: dayjsTimestampe.format('D MMM YYYY'),
      timeStr: dayjsTimestampe.format('h:mm A'),
    };
  }, [commit.author.timestamp]);

  const blueStyle = needsPushing ? styles.accentText : {};

  return (
    <TouchableRipple
      style={styles.commitContainer}
      onPress={() => {
        onPress(commit);
      }}
      rippleColor={rippleColor}>
      <View>
        <View style={styles.commitHeading}>
          <SharkProfilePic size={22} />
          <Text style={[styles.developerName, blueStyle]}>
            {commit.author.name}
          </Text>
          <CommitCardPushPull
            needsPulling={needsPulling}
            needsPushing={needsPushing}
          />
          <View style={{flexGrow: 1, width: 1}} />
          <Text style={styles.timeStr}>
            {dateStr} • {timeStr}
          </Text>
        </View>
        <Text style={[styles.commitHeaderTxt, blueStyle]}>{title}</Text>
        {!!message && <Text style={styles.commitBody}>{message}</Text>}
      </View>
    </TouchableRipple>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  commitContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
  },
  commitHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  developerName: {
    paddingVertical: theme.spacing.xxs,
    paddingHorizontal: theme.spacing.xs,
    borderWidth: theme.borders.normal,
    borderColor: theme.colors.tint_on_surface_16,
    borderRadius: theme.borderRadius.small,
    marginHorizontal: theme.spacing.xs,
    color: theme.colors.on_surface,
    ...theme.textStyles.caption_01,
  },
  timeStr: {
    color: theme.colors.on_surface,
    ...theme.textStyles.caption_02,
    opacity: theme.opacity.secondary,
  },
  commitHeaderTxt: {
    color: theme.colors.on_surface,
    ...theme.textStyles.callout,
    fontWeight: 'bold',
  },
  accentText: {
    color: theme.colors.primary,
  },
  commitBody: {
    color: theme.colors.on_surface,
    ...theme.textStyles.body_02,
    opacity: theme.opacity.secondary,
  },
});
