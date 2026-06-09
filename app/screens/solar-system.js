import React, { useRef } from 'react';
import { Animated, PanResponder, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';

import PlanetPreview from '../../components/PlanetPreview';

export default function SolarSystem() {
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const CENTER_X = width / 2;
  const CENTER_Y = height / 2;

  const SIZE = Math.min(width, height);

  const SUN_SIZE = Math.max(SIZE * 0.22, 120);

  const ORBIT_SCALE = 1.35;

  const PLANETS = [
    { id: "mercury", radius: SIZE * 0.12 * ORBIT_SCALE, offset: 0, size: 10 },
    { id: "venus", radius: SIZE * 0.18 * ORBIT_SCALE, offset: 45, size: 18 },
    { id: "earth", radius: SIZE * 0.25 * ORBIT_SCALE, offset: 90, size: 20 },
    { id: "mars", radius: SIZE * 0.32 * ORBIT_SCALE, offset: 135, size: 14 },
    { id: "jupiter", radius: SIZE * 0.40 * ORBIT_SCALE, offset: 180, size: 55 },
    { id: "saturn", radius: SIZE * 0.48 * ORBIT_SCALE, offset: 225, size: 48 },
    { id: "uranus", radius: SIZE * 0.56 * ORBIT_SCALE, offset: 270, size: 28 },
    { id: "neptune", radius: SIZE * 0.64 * ORBIT_SCALE, offset: 315, size: 28 },
  ];

  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  let lastDistance = null;

  const clampScale = (v) => Math.max(0.6, Math.min(3, v));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 5 || Math.abs(g.dy) > 5,

      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },

      onPanResponderMove: (evt, gesture) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length === 2) {
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (lastDistance) {
            const factor = distance / lastDistance;
            const current = scale.__getValue?.() || 1;

            scale.setValue(clampScale(current * factor));
          }

          lastDistance = distance;
          return;
        }

        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();
        lastDistance = null;
      },
    })
  ).current;

  const handleWheel = (event) => {
    if (Platform.OS !== "web") return;

    const delta = event.nativeEvent.deltaY;
    const current = scale.__getValue?.() || 1;

    scale.setValue(clampScale(current - delta * 0.001));
  };

  const webOnlyProps =
    Platform.OS === "web"
      ? { onWheel: handleWheel }
      : {};

  return (
    <View
      style={styles.container}
      {...panResponder.panHandlers}
      {...webOnlyProps}
    >
      <Animated.View
        style={{
          flex: 1,
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale },
          ],
        }}
      >
        <View
          style={[
            styles.sun,
            {
              width: SUN_SIZE,
              height: SUN_SIZE,
              borderRadius: SUN_SIZE / 2,
              left: CENTER_X - SUN_SIZE / 2,
              top: CENTER_Y - SUN_SIZE / 2,
            },
          ]}
        />

        {PLANETS.map((p) => {
          const angle = (p.offset * Math.PI) / 180;

          const x = CENTER_X + p.radius * Math.cos(angle);
          const y = CENTER_Y + p.radius * Math.sin(angle);

          return (
            <React.Fragment key={p.id}>
              <View
                pointerEvents="none"
                style={[
                  styles.orbit,
                  {
                    width: p.radius * 2,
                    height: p.radius * 2,
                    left: CENTER_X - p.radius,
                    top: CENTER_Y - p.radius,
                  },
                ]}
              />

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/screens/planet-details",
                    params: { planet: p.id },
                  })
                }
                style={{
                  position: "absolute",
                  left: x - p.size / 2,
                  top: y - p.size / 2,
                  width: p.size,
                  height: p.size,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ transform: [{ scale: p.size / 60 }] }}>
                  <PlanetPreview planet={{ id: p.id }} />
                </View>
              </Pressable>
            </React.Fragment>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  sun: {
    position: "absolute",
    backgroundColor: "#FDB813",
    shadowColor: "#FDB813",
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 25,
  },

  orbit: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
  },
});