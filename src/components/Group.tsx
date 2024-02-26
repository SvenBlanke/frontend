import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconButton } from './StandardButtons';
import { primaryColors } from '../assets/colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { DownUpIcon } from '../assets/icons';

type groupProps = {
  name: string;
  id: number;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  navigation: any;
};

export function Group(props: groupProps) {
  const backgroundColor =
    props.selected === props.id
      ? primaryColors.lightGrey
      : primaryColors.background;
  return (
    <View style={{ ...styles.container, ...styles.rowCenter }}>
      <Pressable
        onPress={() => {
          const newSelection = props.selected === props.id ? NaN : props.id;
          props.setSelected(newSelection);
        }}
        style={{
          backgroundColor: backgroundColor,
          ...styles.groupContainer,
          ...styles.rowCenter,
        }}
      >
        <DownUpIcon
          direction={props.selected === props.id ? 'down' : 'up'}
          color={primaryColors.text}
        />
        <Text style={styles.groupName}>{props.name}</Text>
      </Pressable>
      <View style={styles.editButton}>
        <IconButton
          icon="edit"
          colorIcon={primaryColors.text}
          onPress={() =>
            props.navigation.navigate('Edit Group', {
              name: props.name,
              id: props.id,
            })
          }
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
