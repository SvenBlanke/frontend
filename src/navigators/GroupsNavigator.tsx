import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditGroupScreen } from '../screens/EditGroupScreen';
import { GroupsScreen } from '../screens/GroupsScreen';

export type GroupsStackParamList = {
  groupsScreen: undefined;
  editGroup: { id: number; name: string; countries: string[] };
};

const Stack = createNativeStackNavigator<GroupsStackParamList>();

export function GroupsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="groupsScreen" component={GroupsScreen} />
      <Stack.Screen name="editGroup" component={EditGroupScreen} />
    </Stack.Navigator>
  );
}
