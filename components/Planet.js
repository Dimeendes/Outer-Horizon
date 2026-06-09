import { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const CENTER_X = width / 2;
const CENTER_Y = height / 2;

export default function Planet({
  centerX,
  centerY,
  radius,
  size,
  color,
  duration,
  name,
}) {
  const angle = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, {
        duration,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rad = (angle.value * Math.PI) / 180;

    return {
      transform: [
        {
          translateX:
            radius * Math.cos(rad),
        },
        {
          translateY:
            radius * Math.sin(rad),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.planetContainer,
        {
          left: centerX - size / 2 ,
          top: centerY - size / 2,
        },
        animatedStyle,
      ]}
    >
      <View
        style={[
          styles.planet,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  planetContainer: {
    position: "absolute",
  },

  planet: {
    shadowColor: "#FFF",
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
});