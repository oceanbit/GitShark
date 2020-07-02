import * as React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import {CommitPill} from '@components/commit-pill';
import {theme, textStyles, spacing, borders} from '@constants';
import {TouchableRipple} from 'react-native-paper';

interface CommitDetailsMoreInfoProps {
  sha: string;
  parents: string[];
  onNavToPar: (val: string) => void;
}
export const CommitDetailsMoreInfo = ({
  sha,
  parents,
  onNavToPar,
}: CommitDetailsMoreInfoProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const surfaceSecondary = useDynamicValue(theme.colors.on_surface_secondary);

  const [showCopied, setShowCopied] = React.useState(false);

  const orng = useDynamicValue(theme.colors.change_mixed);
  const prpl = useDynamicValue(theme.colors.change_refactored);

  const copyText = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1250);
  };

  const copyTextColor = showCopied
    ? {
        color: surfaceSecondary,
      }
    : {};

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>REF</Text>
        </View>
        {/* We want to support when there are so many tags that they overflow. Keep this a ScrollView */}
        <ScrollView
          horizontal={true}
          style={[styles.sectionBody, styles.tagsContainer]}>
          <CommitPill
            name="origin/master"
            isGitHub={true}
            color={orng}
            style={styles.tag}
          />
          <CommitPill name="master" color={prpl} style={styles.tag} />
        </ScrollView>
      </View>

      <TouchableRipple
        style={[styles.sectionContainer, styles.shaSectionContainer]}
        onPress={copyText}>
        <>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>SHA</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.shaText} ellipsizeMode="tail" numberOfLines={1}>
              {sha}
            </Text>
            <Text style={[styles.copyText, copyTextColor]}>
              {!showCopied ? 'Copy' : 'Copied'}
            </Text>
          </View>
        </>
      </TouchableRipple>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>PAR</Text>
        </View>
        <ScrollView horizontal={true} style={styles.sectionBody}>
          {parents.map(parent => (
            <TouchableRipple
              style={styles.parButton}
              onPress={() => onNavToPar(parent)}
              key={parent}>
              <Text style={styles.parText}>{parent.slice(0, 7)}</Text>
            </TouchableRipple>
          ))}
        </ScrollView>
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
    marginRight: spacing.xs,
  },
  sectionContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.xs,
  },
  shaSectionContainer: {
    paddingVertical: spacing.s,
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
    width: 1,
    flexDirection: 'row',
  },
  shaText: {
    ...textStyles.caption_02,
    color: theme.colors.on_surface_secondary,
    width: 1,
    flexGrow: 1,
  },
  copyText: {
    marginHorizontal: spacing.m,
    ...textStyles.caption_01,
    color: theme.colors.primary,
  },
  parButton: {
    marginRight: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderWidth: borders.normal,
    borderColor: theme.colors.tint_on_surface_16,
    borderRadius: theme.lessRoundness,
  },
  parText: {
    color: theme.colors.primary,
    ...textStyles.caption_01,
  },
});
