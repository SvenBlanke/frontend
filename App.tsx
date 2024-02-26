import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationBar } from './src/components/NavigationBar';
import { ModesScreen } from './src/screens/ModesScreen';
import { CountriesScreen } from './src/screens/CountriesScreen';
import { GroupsNavigator } from './src/screens/GroupsScreen';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  function GroupsWrapper(props: any) {
    return <GroupsNavigator {...props} />;
  }
  function ModesWrapper() {
    return <ModesScreen />;
  }
  function CountriesWrapper() {
    return <CountriesScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator tabBar={NavigationBar}>
          <Tab.Screen
            name="groups"
            component={GroupsWrapper}
            options={{ title: 'Groups', headerShown: false }}
          />
          <Tab.Screen
            name="modes"
            component={ModesWrapper}
            options={{ title: 'Modes' }}
          />
          <Tab.Screen
            name="countries"
            component={CountriesWrapper}
            options={{ title: 'Countries' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
