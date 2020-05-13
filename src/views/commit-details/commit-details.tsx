import * as React from 'react';
import {View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {CommitDetailsHeader} from '../../components/commit-details-header';
import {AppBar} from '../../components/app-bar';
import {SharkMenu} from '../../components/shark-menu';
import {Menu} from 'react-native-paper';
import {SharkIconButton} from '../../components/shark-icon-button';
import {SharkDivider} from '../../components/shark-divider';

export const CommitDetails = () => {
  const [headerExpanded, setHeaderExpanded] = React.useState(false);
  const [headerMessageExpanded, setHeaderMessageExpanded] = React.useState(
    false,
  );
  const styles = useDynamicStyleSheet(dynamicStyles);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <AppBar
        leftIcon="arrow-left"
        onLeftSelect={() => {}}
        hasBottomBorder={false}
        rightChild={
          <SharkMenu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <SharkIconButton
                iconName="dots-horizontal"
                onPress={() => setIsMenuOpen(true)}
              />
            }>
            <Menu.Item onPress={() => {}} title="Open Folder" />
            <Menu.Item onPress={() => {}} title="Rename" />
          </SharkMenu>
        }
      />

      <View style={styles.container}>
        <CommitDetailsHeader
          expanded={headerExpanded}
          setExpanded={setHeaderExpanded}
          messageExpanded={headerMessageExpanded}
          setMessageExpanded={setHeaderMessageExpanded}
        />
        <SharkDivider />
      </View>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {},
});
