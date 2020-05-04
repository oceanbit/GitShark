/**
 * Keep in mind that despite being a "View", this is embedded inside of
 * "repository-history" as it's part of the dropdown component there
 */
import * as React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {SharkSubheader} from '../../components/shark-subheader';
import {SharkDivider} from '../../components/shark-divider';
import {BranchListItem} from '../../components/branch-list-item';
import {RemoteBranchListItem} from '../../components/remote-branch-list-item';
import {DropdownContent} from '../../components/dropdown-content';
import {AnimatedDropdownArrow} from '../../components/animated-dropdown-arrow';
import {SharkIconButton} from '../../components/shark-icon-button';
import {textStyles, theme} from '../../constants';
import {TouchableRipple} from 'react-native-paper';

export const Branches = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [expanded, setExpanded] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <SharkSubheader calloutText="Local" buttonText="Add new" />
      <BranchListItem
        isFavorite={false}
        selected={false}
        branch={{
          name: 'develop',
          up: 4,
          down: 0,
        }}
      />
      <BranchListItem
        isFavorite={false}
        selected={true}
        branch={{
          name: 'master',
          up: 2,
          down: 2,
        }}
      />
      <SharkDivider style={styles.remoteDivider} />
      <SharkSubheader calloutText="Remotes" buttonText="Add new" />
      <TouchableRipple
        style={styles.dropDownHeader}
        onPress={() => setExpanded(v => !v)}>
        <>
          <AnimatedDropdownArrow
            setExpanded={setExpanded}
            expanded={expanded}
          />
          {/* This is a mock, we'll need to replace it with the list of real remotes soon */}
          <Text style={styles.remoteHeader}>origin</Text>
          <SharkIconButton iconName="dots-horizontal" onPress={() => {}} />
        </>
      </TouchableRipple>
      <DropdownContent expanded={expanded}>
        <RemoteBranchListItem
          branch={{
            name: 'develop',
          }}
          style={styles.remoteBranch}
        />
        <RemoteBranchListItem
          branch={{
            name: 'master',
          }}
          style={styles.remoteBranch}
        />
      </DropdownContent>
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: '100%',
  },
  remoteBranch: {
    paddingLeft: 56,
  },
  remoteDivider: {
    marginTop: 16,
  },
  dropDownHeader: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  remoteHeader: {
    marginHorizontal: 8,
    color: theme.colors.on_surface,
    width: 1,
    flexGrow: 1,
    ...textStyles.callout,
  },
});
