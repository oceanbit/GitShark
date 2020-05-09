import * as React from 'react';
import {View, Text} from 'react-native';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {CommitPill} from '../../commit-pill';
import {theme, textStyles} from '../../../constants';

interface CommitDetailsMoreInfoProps {}
export const CommitDetailsMoreInfo = ({}: CommitDetailsMoreInfoProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const orng = useDynamicValue(theme.colors.change_mixed);
  const prpl = useDynamicValue(theme.colors.change_refactored);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>REF</Text>
        </View>
        <View style={[styles.sectionBody, styles.tagsContainer]}>
          <CommitPill
            name="origin/master"
            isGitHub={true}
            color={orng}
            style={styles.tag}
          />
          <CommitPill name="master" color={prpl} style={styles.tag} />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>PAR</Text>
        </View>
        <View style={[styles.sectionBody, styles.tagsContainer]}>
          <CommitPill
            name="origin/master"
            isGitHub={true}
            color={orng}
            style={styles.tag}
          />
          <CommitPill name="master" color={prpl} style={styles.tag} />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>SHA</Text>
        </View>
        <View style={[styles.sectionBody, styles.tagsContainer]}>
          <CommitPill
            name="origin/master"
            isGitHub={true}
            color={orng}
            style={styles.tag}
          />
          <CommitPill name="master" color={prpl} style={styles.tag} />
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flexDirection: 'column',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    marginRight: 8,
  },
  sectionContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  sectionTitle: {
    width: 72,
    display: 'flex',
    justifyContent: 'center',
  },
  sectionTitleText: {
    ...textStyles.caption_01,
    textAlign: 'center',
  },
  sectionBody: {
    flexGrow: 1,
  },
});
