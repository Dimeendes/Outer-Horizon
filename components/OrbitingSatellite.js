import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function OrbitingSatellite({
  radius,
  duration,
  size = 12,
  color = "#FFF",
  centerX,
  centerY,
  initialAngle = 0,
}) {
  const angle = useSharedValue(initialAngle);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360 + initialAngle, {
        duration,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rad = (angle.value * Math.PI) / 180;

    return {
      position: "absolute",
      left: centerX + radius * Math.cos(rad) - size / 2,
      top: centerY + radius * Math.sin(rad) - size / 2,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}