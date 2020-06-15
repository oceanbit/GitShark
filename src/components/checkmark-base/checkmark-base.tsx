import * as React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const animationTime = 150;

const hitSlop = {top: 8, bottom: 8, left: 8, right: 8};

interface CheckmarkBaseProps {
  onValueChange?: (val: boolean) => void;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  borderColor?: string;
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
  borderRadius: number;
}

interface CheckmarkBaseState {
  scaleAndOpacityOfCheckbox: null | Animated.Value;
}

export class CheckmarkBase extends React.PureComponent<
  CheckmarkBaseProps,
  CheckmarkBaseState
> {
  static defaultProps = {
    size: 24,
    backgroundColor: '#007AFF',
    iconColor: 'white',
    borderColor: 'grey',
    checked: false,
    onValueChange: () => {},
    style: {},
  };

  state = {
    scaleAndOpacityOfCheckbox: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      scaleAndOpacityOfCheckbox: new Animated.Value(this.props.checked ? 1 : 0),
    });
  }

  componentDidUpdate(prevProps: CheckmarkBaseProps) {
    if (this.props.checked !== prevProps.checked) {
      if (this.props.checked) {
        Animated.timing(this.state.scaleAndOpacityOfCheckbox!, {
          toValue: 1,
          duration: animationTime,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(this.state.scaleAndOpacityOfCheckbox!, {
          toValue: 0,
          duration: animationTime,
          useNativeDriver: true,
        }).start();
      }
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iconSize = parseInt((this.props.size! * 1.3) as any, 10);

    const bothStyles = {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.borderRadius,
    };

    const checkedStyles = {
      backgroundColor: this.props.backgroundColor,
      borderColor: this.props.backgroundColor,
      opacity: this.state.scaleAndOpacityOfCheckbox,
      scaleX: this.state.scaleAndOpacityOfCheckbox,
      scaleY: this.state.scaleAndOpacityOfCheckbox,
      position: 'absolute',
      top: 0,
      left: 0,
    };

    const uncheckedStyles = {
      backgroundColor: 'transparent',
      borderColor: this.props.borderColor,
    };

    return (
      <TouchableWithoutFeedback
        hitSlop={hitSlop}
        onPress={this._onPress}
        style={this.props.style}>
        <View style={[styles.parentWrapper]}>
          <View
            shouldRasterizeIOS={true}
            style={[uncheckedStyles, bothStyles, styles.commonWrapperStyles]}>
            <Icon
              name={'ios-checkmark'}
              color={'transparent'}
              style={{
                height: iconSize,
                fontSize: iconSize,
                backgroundColor: 'transparent',
              }}
            />
          </View>
          <Animated.View
            shouldRasterizeIOS={true}
            style={[checkedStyles, bothStyles, styles.commonWrapperStyles]}>
            <Icon
              name={'ios-checkmark'}
              color={this.props.iconColor}
              style={{
                height: iconSize,
                fontSize: iconSize,
                backgroundColor: 'transparent',
              }}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _onPress = () => {
    this.props.onValueChange!(!this.props.checked);
  };
}

const styles = StyleSheet.create({
  parentWrapper: {
    position: 'relative',
  },
  commonWrapperStyles: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
