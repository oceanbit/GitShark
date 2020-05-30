import React from 'react';
import {storiesOf} from '@storybook/react';
import {RepositoryListUI} from './repository-list.ui';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {lightPaperTheme} from '@constants';
import {Provider as PaperProvider} from 'react-native-paper';
import {View} from 'react-native';

const RepositoryListDemo = ({...props}: any) => {
  const Stack = createStackNavigator();

  const Comp = () => (
    <RepositoryListUI
      isLoading={false}
      isDBLoaded={false}
      navigateToSettings={() => {}}
      repos={[]}
      findRepos={() => Promise.resolve(false)}
    />
  );

  return (
    <View style={{height: '100%'}}>
      <SafeAreaProvider>
        <NavigationContainer>
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

storiesOf('Screens/Repo List', module).add('default styling', () => (
  <RepositoryListDemo />
));
