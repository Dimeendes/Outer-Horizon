import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import OrbitingSatellite from "../components/OrbitingSatellite";
import PlanetPreview from "../components/PlanetPreview";
import { SATELLITES_LIST } from "../components/SatellitesList";

const PLANETS = {
  mercury: { id: "mercury", name: "Mercúrio" },
  venus: { id: "venus", name: "Vênus" },
  earth: { id: "earth", name: "Terra" },
  mars: { id: "mars", name: "Marte" },
  jupiter: { id: "jupiter", name: "Júpiter" },
  saturn: { id: "saturn", name: "Saturno" },
  uranus: { id: "uranus", name: "Urano" },
  neptune: { id: "neptune", name: "Netuno" },
};

const PLANET_LIST = Object.values(PLANETS);

export default function Satellites() {
  const { planet } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const [selectedPlanet, setSelectedPlanet] = useState(
    planet || "earth"
  );

  useEffect(() => {
    if (planet) setSelectedPlanet(planet);
  }, [planet]);

  const satellites =
    SATELLITES_LIST[selectedPlanet] || [];

  const orbitSize = Math.min(width * 0.9, 380);
  const center = orbitSize / 2;

  const planetData = PLANETS[selectedPlanet];

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E1B4B"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.title}>
          🛰 Centro Orbital
        </Text>

        {/* SELECTOR */}
        <FlatList
          horizontal
          data={PLANET_LIST}
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedPlanet(item.id)
              }
              style={[
                styles.btn,
                selectedPlanet === item.id &&
                  styles.btnActive,
              ]}
            >
              <Text style={styles.btnText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* 🌌 ORBIT SYSTEM (CENTRO ÚNICO REAL) */}
        <View
          style={[
            styles.orbitArea,
            {
              width: orbitSize,
              height: orbitSize,
            },
          ]}
        >
          {/* ORBITA VISUAL */}
          <View
            style={[
              styles.orbit,
              {
                width: orbitSize * 0.7,
                height: orbitSize * 0.7,
                left: orbitSize * 0.15,
                top: orbitSize * 0.15,
              },
            ]}
          />

          {/* 🪐 PLANETA NO CENTRO REAL */}
          <View style={styles.planetWrapper}>
            <PlanetPreview planet={planetData} />
          </View>

          {/* 🛰 SATÉLITES CORRETOS */}
          {satellites.map((sat, index) => (
            <OrbitingSatellite
              key={sat.id}
              radius={sat.radius}
              duration={sat.duration}
              centerX={center}
              centerY={center}
              size={10}
              initialAngle={
                (index * 360) / satellites.length
              }
            />
          ))}
        </View>

        {/* INFO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🛰 Satélites
          </Text>

          {satellites.map((sat) => (
            <View key={sat.id} style={styles.item}>
              <Text style={styles.name}>
                {sat.name}
              </Text>
              <Text style={styles.info}>
                🎯 {sat.objective}
              </Text>
              <Text style={styles.info}>
                📡 {sat.telemetry}
              </Text>
              <Text style={styles.info}>
                ⏱ {sat.latency}
              </Text>
              <Text style={styles.info}>
                📶 {sat.signal}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  scroll: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 120,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  btn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  btnActive: {
    backgroundColor: "#6366F1",
  },

  btnText: {
    color: "#fff",
  },

  orbitArea: {
    position: "relative",
    marginTop: 10,
  },

  orbit: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
  },

  planetWrapper: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: [
    { translateX: -60 },
    { translateY: -60 },
  ],
  },

  card: {
    width: "90%",
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },

  item: {
    marginBottom: 12,
  },

  name: {
    color: "#fff",
    fontWeight: "bold",
  },

  info: {
    color: "#CBD5E1",
    fontSize: 12,
  },
});