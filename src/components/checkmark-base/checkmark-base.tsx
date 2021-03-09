import * as React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Icon} from '@components/shark-icon';

const animationTime = 150;

const hitSlop = {top: 8, bottom: 8, left: 8, right: 8};

type BaseState = 'checked' | 'unchecked' | 'indeterminate';

interface CheckmarkBaseProps {
  size?: number;
  state?: BaseState;
  unselectedIcon: string;
  selectedIcon: string;
  unselectedColor: string;
  indetermindateIcon?: string;
  selectedColor: string;
}

interface CheckmarkBaseState {
  scaleAndOpacityOfCheckbox: null | Animated.Value;
  scaleAndOpacityOfIndeterminate: null | Animated.Value;
}

export class CheckmarkBase extends React.PureComponent<
  CheckmarkBaseProps,
  CheckmarkBaseState
> {
  static defaultProps = {
    size: 18,
    state: 'unchecked',
    // These icons should never actually be used. They're simply here to shut up the warning of invalid icon name
    unselectedIcon: 'menu',
    indetermindateIcon: 'menu',
    selectedIcon: 'menu',
  };

  state = {
    scaleAndOpacityOfCheckbox: null as Animated.Value | null,
    scaleAndOpacityOfIndeterminate: null as Animated.Value | null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      scaleAndOpacityOfCheckbox: new Animated.Value(
        this.props.state === 'checked' ? 1 : 0,
      ),
      scaleAndOpacityOfIndeterminate: new Animated.Value(
        this.props.state === 'indeterminate' ? 1 : 0,
      ),
    });
  }

  componentDidUpdate(prevProps: CheckmarkBaseProps) {
    if (this.props.state !== prevProps.state) {
      switch (this.props.state) {
        case 'checked': {
          Animated.parallel([
            Animated.timing(this.state.scaleAndOpacityOfCheckbox!, {
              toValue: 1,
              duration: animationTime,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAndOpacityOfIndeterminate!, {
              toValue: 0,
              duration: animationTime,
              useNativeDriver: true,
            }),
          ]).start();
          return;
        }
        case 'indeterminate': {
          Animated.parallel([
            Animated.timing(this.state.scaleAndOpacityOfCheckbox!, {
              toValue: 0,
              duration: animationTime,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAndOpacityOfIndeterminate!, {
              toValue: 1,
              duration: animationTime,
              useNativeDriver: true,
            }),
          ]).start();
          return;
        }
        case 'unchecked':
        default: {
          Animated.parallel([
            Animated.timing(this.state.scaleAndOpacityOfCheckbox!, {
              toValue: 0,
              duration: animationTime,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleAndOpacityOfIndeterminate!, {
              toValue: 0,
              duration: animationTime,
              useNativeDriver: true,
            }),
          ]).start();
          return;
        }
      }
    }
  }

  render() {
    const bothStyles = {
      width: this.props.size,
      height: this.props.size,
    };

    const checkedStyles = {
      opacity: this.state.scaleAndOpacityOfCheckbox!,
      scaleX: this.state.scaleAndOpacityOfCheckbox!,
      scaleY: this.state.scaleAndOpacityOfCheckbox!,
      position: 'absolute',
      top: 0,
      left: 0,
    } as any;

    const indeterminateStyles = {
      opacity: this.state.scaleAndOpacityOfIndeterminate!,
      scaleX: this.state.scaleAndOpacityOfIndeterminate!,
      scaleY: this.state.scaleAndOpacityOfIndeterminate!,
      position: 'absolute',
      top: 0,
      left: 0,
    } as any;

    return (
      <View hitSlop={hitSlop}>
        <View style={[styles.parentWrapper]}>
          <View
            shouldRasterizeIOS={true}
            style={[bothStyles, styles.commonWrapperStyles]}>
            <Icon
              name={this.props.unselectedIcon}
              color={this.props.unselectedColor}
              size={this.props.size}
              style={{
                height: this.props.size,
                width: this.props.size,
                fontSize: this.props.size,
              }}
              importantForAccessibility={'no'}
              accessibilityElementsHidden={true}
            />
          </View>
          <Animated.View
            shouldRasterizeIOS={true}
            style={[
              indeterminateStyles,
              bothStyles,
              styles.commonWrapperStyles,
            ]}>
            <Icon
              name={this.props.indetermindateIcon || ''}
              color={this.props.selectedColor}
              size={this.props.size}
              style={{
                height: this.props.size,
                width: this.props.size,
                fontSize: this.props.size,
              }}
              importantForAccessibility={'no'}
              accessibilityElementsHidden={true}
            />
          </Animated.View>
          <Animated.View
            shouldRasterizeIOS={true}
            style={[checkedStyles, bothStyles, styles.commonWrapperStyles]}>
            <Icon
              name={this.props.selectedIcon}
              color={this.props.selectedColor}
              size={this.props.size}
              style={{
                height: this.props.size,
                width: this.props.size,
                fontSize: this.props.size,
              }}
              importantForAccessibility={'no'}
              accessibilityElementsHidden={true}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
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
