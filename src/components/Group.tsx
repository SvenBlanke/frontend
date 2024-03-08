import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconButton } from './StandardButtons';
import { primaryColors } from '../assets/colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { DownUpIcon } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GroupsStackParamList } from '../navigators/GroupsNavigator';

type groupProps = {
  group: { id: number; name: string; countries: string[] };
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
};

export function Group(props: groupProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<GroupsStackParamList>>();

  const backgroundColor =
    props.selected === props.group.id
      ? primaryColors.lightGrey
      : primaryColors.background;
  return (
    <View style={{ ...styles.container, ...styles.rowCenter }}>
      <Pressable
        onPress={() => {
          const newSelection =
            props.selected === props.group.id ? NaN : props.group.id;
          props.setSelected(newSelection);
        }}
        style={{
          backgroundColor: backgroundColor,
          ...styles.groupContainer,
          ...styles.rowCenter,
        }}
      >
        <DownUpIcon
          direction={props.selected === props.group.id ? 'down' : 'up'}
          color={primaryColors.text}
        />
        <Text style={styles.groupName}>{props.group.name}</Text>
      </Pressable>
      <View style={styles.editButton}>
        <IconButton
          icon="edit"
          colorIcon={primaryColors.text}
          onPress={() => navigation.navigate('editGroup', props.group)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  groupContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 60,
    borderColor: primaryColors.lightGrey,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
  },
  groupName: {
    fontSize: 30,
    color: primaryColors.text,
    marginLeft: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 20,
  },
});
