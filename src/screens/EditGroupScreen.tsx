import { RouteProp, useRoute } from '@react-navigation/native';
import { GroupsStackParamList } from '../navigators/GroupsNavigator';
import { GroupCountry } from '../components/GroupCountry';
import { StyleSheet } from 'react-native';
import { primaryColors } from '../assets/colors';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const offsets = new Map<string, number>();

export function EditGroupScreen() {
  const [rerender, setRerender] = useState(true);
  const route = useRoute<RouteProp<GroupsStackParamList, 'editGroup'>>();

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={route.params.countries}
        renderItem={country => {
          const offset = offsets.get(country.item)
            ? offsets.get(country.item)
            : 0;
          return <GroupCountry country={country.item} offset={offset!} />;
        }}
        renderHiddenItem={() => <></>}
        keyExtractor={country => country}
        ListEmptyComponent={() => <></>}
        style={[styles.list, { height: '100%' }]}
        rightActivationValue={-200}
        rightActionValue={-400}
        onRightAction={() => console.log('delete')}
        leftActivationValue={200}
        leftActionValue={400}
        onLeftAction={() => console.log('delete')}
        onSwipeValueChange={offset => {
          offsets.set(offset.key, offset.value);
          setRerender(!rerender);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.background,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  list: {
    width: '100%',
    minHeight: 70,
  },
});
