import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {lightPaperTheme, lightNavTheme} from '@constants';
import {Provider as PaperProvider} from 'react-native-paper';
import {View} from 'react-native';

export const StorybookProvider: React.FC = ({children}) => {
  const Stack = createStackNavigator();

  const Comp = () => <>{children}</>;

  return (
    <View style={{height: '100%'}}>
      <SafeAreaProvider>
        <NavigationContainer theme={lightNavTheme}>
          <PaperProvider theme={lightPaperTheme}>
            <Stack.Navigator headerMode={'none'}>
              <Stack.Screen name="Test" component={Comp} />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};
