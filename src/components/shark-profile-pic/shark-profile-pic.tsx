import * as React from 'react';
import {Image, ImagePropsBase, ImageStyle, StyleProp, View} from 'react-native';
import {theme} from '@constants';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {Icon} from '@components/shark-icon';

// Cannot use `import` as it breaks in storybook
const defaultProfPic = require('../../../assets/images/default-profile-pic.png');

interface SharkProfilePicProps {
  source?: ImagePropsBase['source'] | null;
  size?: number;
  style?: StyleProp<ImageStyle>;
  showGHLogo?: boolean;
  hidden?: boolean;
}

export const SharkProfilePic = ({
  source,
  size = 40,
  style = {},
  showGHLogo,
  hidden,
}: SharkProfilePicProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const label_high_emphasis = useDynamicValue(theme.colors.label_high_emphasis);

  const sizeStyle = {
    height: size,
    width: size,
  };
  return (
    <View
      style={[styles.container, style]}
      importantForAccessibility={hidden ? 'no' : 'yes'}
      accessibilityElementsHidden={!!hidden}>
      <Image
        source={source || defaultProfPic}
        defaultSource={defaultProfPic}
        style={[sizeStyle, styles.profPic]}
      />
      {showGHLogo && (
        <View style={styles.gitHubLogo}>
          <Icon size={16} name={'github'} color={label_high_emphasis} />
        </View>
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    position: 'relative',
  },
  profPic: {
    borderRadius: 50,
    borderWidth: theme.borders.normal,
    borderColor: theme.colors.tint_on_surface_01,
  },
  gitHubLogo: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 50,
    borderWidth: theme.borders.normal,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surface,
    bottom: 0,
    right: 0,
  },
});
