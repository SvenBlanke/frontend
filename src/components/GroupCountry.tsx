import Animated, {
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { primaryColors } from '../assets/colors';
import { StyleSheet, Text, View } from 'react-native';

interface groupCountry {
  country: string;
  offset: number;
}

export function GroupCountry(props: groupCountry) {
  const animatedStyles = useAnimatedStyle(() => {
    const value = Math.max(255 - Math.round(Math.abs(props.offset) / 2), 0);
    const color = value > 9 ? value.toString(16) : '0' + value.toString(16);
    return {
      backgroundColor:
        Math.abs(props.offset) > 40
          ? `#ff${color}${color}`
          : primaryColors.background,
    };
  });

  return (
    <Animated.View
      style={[styles.outerContainer, animatedStyles]}
      entering={FadeInUp}
      exiting={FadeOutUp}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{props.country}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
  },
  innerContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    marginLeft: 0,
    fontSize: 30,
  },
});
