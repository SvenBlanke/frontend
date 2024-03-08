import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../components/StandardButtons';
import { primaryColors } from '../assets/colors';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState } from 'react';
import { Group } from '../components/Group';

export function GroupsScreen() {
  const groups = [
    { id: 0, name: 'Baby', countries: ['Germany', 'Italy'] },
    { id: 1, name: 'Baby', countries: ['France', 'Spain'] },
  ];
  const [selected, setSelected] = useState(NaN);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="add"
        colorIcon={primaryColors.text}
        sizeIcon={100}
        styleIcon={{ width: 100, height: 100 }}
        styleButton={styles.addButton}
        onPress={() => {}}
      />
      <SwipeListView
        data={groups}
        leftOpenValue={60}
        rightOpenValue={-60}
        renderItem={group => (
          <Group
            key={group.item.id}
            group={group.item}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        renderHiddenItem={() => (
          <View style={styles.deleteButtons}>
            <IconButton
              icon="delete"
              colorIcon={primaryColors.delete}
              onPress={() => console.log('delete')}
            />
            <IconButton
              icon="delete"
              colorIcon={primaryColors.delete}
              onPress={() => console.log('delete')}
            />
          </View>
        )}
        keyExtractor={item => item.id!.toString()}
        ListEmptyComponent={<Text>List Empty</Text>}
        style={styles.list}
        refreshing={refreshing}
        onRefresh={() => console.log('refresh')}
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
    gap: 10,
  },
  list: {
    width: '100%',
    minHeight: 70,
  },
  addButton: {
    backgroundColor: primaryColors.button,
    borderRadius: 50,
    position: 'absolute',
    bottom: 25,
    right: 25,
    zIndex: 1,
    width: 100,
    height: 100,
  },
  deleteButtons: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
