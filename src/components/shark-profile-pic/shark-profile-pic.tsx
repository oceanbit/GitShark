import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImagePropsBase,
} from 'react-native';
import {theme} from '../../constants/theme';
const defaultProfPic = require('../../../assets/images/default-profile-pic.png');

interface SharkProfilePicProps {
  source?: ImagePropsBase['source'];
  size?: number;
  style?: StyleProp<ViewStyle>;
}
export const SharkProfilePic = ({
  source,
  size = 40,
  style = {},
}: SharkProfilePicProps) => {
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

const styles = StyleSheet.create({
  profPic: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.outlineColor,
  },
});
