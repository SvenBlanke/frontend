import { Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icons from '../assets/icons';
import { useState } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { icon } from '../assets/icons';
import { primaryColors } from '../assets/colors';

interface standardButtonProps extends ViewProps {
  onPress: () => void;
  magnitude?: number;
}

interface iconButtonProps extends standardButtonProps {
  icon: icon;
  colorIcon: string;
  styleButton?: StyleProp<ViewStyle>;
  sizeIcon?: number;
  styleIcon?: StyleProp<any>;
}

function newShade(hexColor: any, magnitude: number) {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
}

export function StandardButton(props: standardButtonProps) {
  const bgColor =
    (props.style as ViewStyle).backgroundColor || primaryColors.lightGrey;
  const [pressedState, setPressedState] = useState(false);
  const pressed = useSharedValue(false);
  const sharedBgColor = useSharedValue(bgColor);
  const pressedBackgroundColor = useSharedValue(
    newShade(bgColor, props.magnitude || 20),
  );

  const tab = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      runOnJS(setPressedState)(true);
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(setPressedState)(false);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value
      ? pressedBackgroundColor.value
      : sharedBgColor.value,
  }));

  return (
    <GestureDetector gesture={tab}>
      <Animated.View
        style={[props.style, animatedStyles, { paddingHorizontal: 0 }]}
      >
        <Pressable
          style={[props.style, { backgroundColor: undefined }]}
          onPress={props.onPress}
        >
          {props.children}
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

export function IconButton(props: iconButtonProps) {
  const [pressedState, setPressedState] = useState(false);
  const pressed = useSharedValue(false);

  const tab = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      runOnJS(setPressedState)(true);
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(setPressedState)(false);
    });

  const Icon = Icons.get(props.icon);

  return (
    <GestureDetector gesture={tab}>
      <Pressable
        onPress={props.onPress}
        style={[
          {
            borderRadius: 10,
            width: props.sizeIcon,
            height: props.sizeIcon,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0,
          },
          props.styleButton,
        ]}
      >
        {Icon && (
          <Icon
            color={
              pressed.value
                ? newShade(props.colorIcon, props.magnitude || 50)
                : props.colorIcon
            }
            size={props.sizeIcon || 30}
            style={props.styleIcon}
          />
        )}
      </Pressable>
    </GestureDetector>
  );
}
