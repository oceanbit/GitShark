import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {Portal} from 'react-native-paper';

class NavigationAwarePortal extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    open: false,
  };

  componentDidMount() {
    (this as any)._willFocusListener = (this
      .props as any).navigation.addListener('willFocus', this._show);
    (this as any)._willBlurListener = (this
      .props as any).navigation.addListener('willBlur', this._hide);

    if ((this.props as any).navigation.isFocused()) {
      this._show();
    }
  }

  componentWillUnmount() {
    (this as any)._willFocusListener.remove();
    (this as any)._willBlurListener.remove();
  }

  _show = () => {
    console.log('Focused');

    this.setState({open: true});

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  _hide = () => {
    console.log('Blurred');

    this.setState({open: false});

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <Portal>
        <Animated.View
          pointerEvents={this.state.open ? 'box-none' : 'none'}
          style={[styles.container, {opacity: this.state.opacity}]}>
          {this.props.children}
        </Animated.View>
      </Portal>
    );
  }
}

export default withNavigation(NavigationAwarePortal as any);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
