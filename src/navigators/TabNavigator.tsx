import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationBar } from '../components/NavigationBar';
import { GroupsNavigator } from './GroupsNavigator';
import { ModesScreen } from '../screens/ModesScreen';
import { CountriesScreen } from '../screens/CountriesScreen';

type TabsParamList = {
  groups: undefined;
  modes: undefined;
  countries: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export function TabNavigator() {
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
  );
}
