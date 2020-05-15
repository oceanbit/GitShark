import * as React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {textStyles, theme} from '../../constants';
import {SharkButton} from '../shark-button';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {FileActionsBarToggleButton} from './file-actions-bar-toggle-button';
import {GrowWidthContent} from '../grow-width-content';

interface FileActionsBarProps {
  style?: StyleProp<ViewStyle>;
}

export const FileActionsBar = ({style = {}}: FileActionsBarProps) => {
  const [showMore, setShowMore] = React.useState(false);

  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={[styles.subheaderContainer, style]}>
      <Text style={styles.subheaderText}>Unstaged</Text>
      <View style={styles.showMoreView}>
        <SharkButton
          onPress={() => {}}
          text={'Stage'}
          style={styles.calloutButton}
        />
        <GrowWidthContent expanded={showMore}>
          <View style={styles.moreViewButtons}>
            <SharkButton
              onPress={() => {}}
              text={'Discard'}
              style={styles.calloutButton}
              // This prevents text breaking from animating incorrectly
              textProps={{numberOfLines: 1}}
            />
            <SharkButton
              onPress={() => {}}
              text={'Ignore'}
              style={styles.calloutButton}
              textProps={{numberOfLines: 1}}
            />
          </View>
        </GrowWidthContent>
        <FileActionsBarToggleButton
          showMore={showMore}
          setShowMore={setShowMore}
        />
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  subheaderContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    padding: 16,
    alignItems: 'center',
  },
  moreViewButtons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  subheaderText: {
    ...textStyles.callout,
    flexGrow: 1,
    color: theme.colors.on_surface,
  },
  calloutButton: {
    marginLeft: 16,
    borderWidth: 0,
  },
  showMoreView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderWidth: 2,
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  iconButton: {},
  dotsIcon: {},
});
