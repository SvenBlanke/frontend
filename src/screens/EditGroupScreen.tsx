import { SafeAreaView, Text } from 'react-native';

export function EditGroupScreen({ navigation, route }: any) {
  return (
    <SafeAreaView>
      <Text>{route.params.id}</Text>
    </SafeAreaView>
  );
}
