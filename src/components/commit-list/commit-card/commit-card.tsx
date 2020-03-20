import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {theme} from '../../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import {textStyles} from '../../../constants/text-styles';
import {CommitCardPushPull} from './commit-card-push-pull';
import dayjs from 'dayjs';
import {GitLogCommit} from '../../../services/git/gitLog';
import {getCommitHeaderBody} from '../../../services/git/getCommitHeaderBody';
const defaultProfPic = require('../../../../assets/images/default-profile-pic.png');

interface CommitCardProps {
  commit: GitLogCommit;
}
export const CommitCard = ({commit}: CommitCardProps) => {
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
      onPress={() => {}}
      rippleColor={theme.colors.outlineColor}>
      <View>
        <View style={styles.commitHeading}>
          <Image source={defaultProfPic} style={styles.defaultPic} />
          <Text style={[styles.developerName, blueStyle]}>
            {commit.author.name}
          </Text>
          <CommitCardPushPull
            needsPulling={needsPulling}
            needsPushing={needsPushing}
          />
          <View style={{flexGrow: 1}} />
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

const styles = StyleSheet.create({
  commitContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  commitHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  defaultPic: {
    borderRadius: 50,
    height: 22,
    width: 22,
    borderWidth: 1,
    borderColor: theme.colors.outlineColor,
  },
  developerName: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.colors.outlineColor,
    borderRadius: theme.lessRoundness,
    marginHorizontal: 8,
    color: theme.colors.on_surface_light,
    ...textStyles.caption_01,
  },
  timeStr: {
    color: theme.colors.on_surface_secondary_light,
    ...textStyles.caption_02,
  },
  commitHeaderTxt: {
    color: theme.colors.on_surface_light,
    ...textStyles.callout,
    fontWeight: 'bold',
  },
  accentText: {
    color: theme.colors.accent,
  },
  commitBody: {
    color: theme.colors.on_surface_secondary_light,
    ...textStyles.body_02,
  },
});
