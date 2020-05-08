import * as React from 'react';
import {View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {CommitDetailsDualAuthor} from './commit-detail-dual-author';

interface CommitDetailsHeaderProps {
  expanded: boolean;
  commitDescriptionExpanded?: boolean;
}
export const CommitDetailsHeader = ({expanded}: CommitDetailsHeaderProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      <CommitDetailsDualAuthor expanded={expanded} />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    padding: 16,
  },
});
