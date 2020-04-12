import * as React from 'react';
import {Image, ImagePropsBase, ImageStyle, StyleProp} from 'react-native';
import {theme} from '../../constants';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

const defaultProfPic = require('../../../assets/images/default-profile-pic.png');

interface SharkProfilePicProps {
  source?: ImagePropsBase['source'];
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export const SharkProfilePic = ({
  source,
  size = 40,
  style = {},
}: SharkProfilePicProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const sizeStyle = {
    height: size,
    width: size,
  };
  return (
    <Image
      source={source || defaultProfPic}
      defaultSource={defaultProfPic}
      style={[sizeStyle, styles.profPic, style]}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  profPic: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
});
