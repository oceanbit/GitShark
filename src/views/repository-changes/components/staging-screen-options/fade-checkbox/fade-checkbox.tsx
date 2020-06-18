import * as React from 'react';
import {Animated} from 'react-native';
import {SharkCheckbox} from '@components/shark-checkbox';
import {ChangesArrayItem} from '@services';

const animDuration = 150;

interface FadeCheckboxProps {
  changes: ChangesArrayItem[];
  selectedChanges: ChangesArrayItem[];
  setChanges: (val: ChangesArrayItem[]) => void;
}
export const FadeCheckbox = ({
  changes,
  selectedChanges,
  setChanges,
}: FadeCheckboxProps) => {
  const [checkboxOpacity] = React.useState(new Animated.Value(0));

  const isVisible = !!changes.length;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(checkboxOpacity, {
        toValue: 1,
        duration: animDuration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(checkboxOpacity, {
        toValue: 0,
        duration: animDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, checkboxOpacity]);

  return (
    <Animated.View style={{opacity: checkboxOpacity}}>
      <SharkCheckbox
        checked={changes.length === selectedChanges.length && !!changes.length}
        indeterminate={!!selectedChanges.length}
        onValueChange={selectAll => {
          setChanges(selectAll ? changes : []);
        }}
      />
    </Animated.View>
  );
};
