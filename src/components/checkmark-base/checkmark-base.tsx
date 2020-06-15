import * as React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Icon} from '@components/shark-icon';

const animationTime = 150;

const hitSlop = {top: 8, bottom: 8, left: 8, right: 8};

interface CheckmarkBaseProps {
  onValueChange?: (val: boolean) => void;
  size?: number;
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
  unselectedIcon: string;
  selectedIcon: string;
  unselectedColor: string;
  selectedColor: string;
}

interface CheckmarkBaseState {
  scaleAndOpacityOfCheckbox: null | Animated.Value;
}

export class CheckmarkBase extends React.PureComponent<
  CheckmarkBaseProps,
  CheckmarkBaseState
> {
  static defaultProps = {
    size: 18,
    checked: false,
    onValueChange: () => {},
    style: {},
    unselectedIcon: '',
    selectedIcon: '',
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
    };

    const checkedStyles = {
      opacity: this.state.scaleAndOpacityOfCheckbox,
      scaleX: this.state.scaleAndOpacityOfCheckbox,
      scaleY: this.state.scaleAndOpacityOfCheckbox,
      position: 'absolute',
      top: 0,
      left: 0,
    };

    return (
      <TouchableWithoutFeedback
        hitSlop={hitSlop}
        onPress={this._onPress}
        style={this.props.style}>
        <View style={[styles.parentWrapper]}>
          <View
            shouldRasterizeIOS={true}
            style={[bothStyles, styles.commonWrapperStyles]}>
            <Icon
              name={this.props.unselectedIcon}
              color={this.props.unselectedColor}
              size={iconSize}
              style={{
                height: iconSize,
                width: iconSize,
                fontSize: iconSize,
              }}
            />
          </View>
          <Animated.View
            shouldRasterizeIOS={true}
            style={[checkedStyles, bothStyles, styles.commonWrapperStyles]}>
            <Icon
              name={this.props.selectedIcon}
              color={this.props.selectedColor}
              size={iconSize}
              style={{
                height: iconSize,
                width: iconSize,
                fontSize: iconSize,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
