import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {theme} from '../../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import {textStyles} from '../../../constants/text-styles';
import {CommitCardPushPull} from './commit-card-push-pull';
import dayjs from 'dayjs';
import {Commit} from '../mock-data';
const defaultProfPic = require('../../../../assets/images/default-profile-pic.png');

interface CommitCardProps {
  commit: Commit;
}
export const CommitCard = ({commit}: CommitCardProps) => {

  const {dateStr, timeStr} = React.useMemo(() => {
    const dayjsTimestampe = dayjs(commit.timestamp);
    return {
      dateStr: dayjsTimestampe.format('D MMM YYYY'),
      timeStr: dayjsTimestampe.format('h:mm A'),
    };
  }, [commit.timestamp]);

  const blueStyle = commit.needsPushing ? styles.accentText : {};

  return (
    <TouchableRipple
      style={styles.commitContainer}
      onPress={() => {}      }
      rippleColor={theme.colors.outlineColor}>
      <View>
        <View style={styles.commitHeading}>
          <Image source={defaultProfPic} style={styles.defaultPic} />
          <Text style={[styles.developerName, blueStyle]}>
            {commit.authorName}
          </Text>
          <CommitCardPushPull
            needsPulling={commit.needsPulling}
            needsPushing={commit.needsPushing}
          />
          <View style={{flexGrow: 1}} />
          <Text style={styles.timeStr}>
            {dateStr} • {timeStr}
          </Text>
        </View>
        <Text style={[styles.commitHeaderTxt, blueStyle]}>{commit.title}</Text>
        {commit.body && <Text style={styles.commitBody}>{commit.body}</Text>}
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
    opacity: 0.6,
    color: theme.colors.on_surface_light,
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
    opacity: 0.6,
    color: theme.colors.on_surface_light,
    ...textStyles.body_02,
  },
});
