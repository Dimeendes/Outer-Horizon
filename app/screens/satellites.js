import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import OrbitingSatellite from '../../components/OrbitingSatellite';
import PlanetPreview from '../../components/PlanetPreview';
import { useMission } from '../../contexts/MissionContext';
import { SATELLITES_LIST } from '../../data/SatellitesList';
import { planets } from '../../data/planets';

const PLANET_LIST = planets;

export default function Satellites() {
  const { planet } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const { missions } = useMission();

  const [selectedPlanet, setSelectedPlanet] = useState(planet || "earth");
  const [modalVisible, setModalVisible] = useState(false);

  // sincroniza URL
  useEffect(() => {
    if (planet) setSelectedPlanet(planet);
  }, [planet]);

  const planetData =
    PLANET_LIST.find((p) => p.id === selectedPlanet) ||
    PLANET_LIST[0];

  const fixedSatellites = (SATELLITES_LIST?.[selectedPlanet] ?? []).map(
    (sat) => ({
      ...sat,
      apoastro: sat.apoastro || sat.apoapsis || "N/A",
      periastro: sat.periastro || sat.periapsis || "N/A",
    })
  );

  const userSatellites = (missions ?? [])
    .filter((m) => m?.planetId === selectedPlanet)
    .map((m, index) => ({
      id: m?.id || `mission-${index}`,
      name: m?.name || "Satélite desconhecido",
      objective: m?.objective || "N/A",
      apoastro: "N/A",
      periastro: "N/A",
      status: m?.status || "Missão planejada",
      energy: m?.energy || "Desconhecido",
      radius: 100,
      duration: 8000,
      isUserCreated: true,
    }));

  const satellites = [
    ...fixedSatellites,
    ...userSatellites,
  ].filter(Boolean); // evita undefined quebrando render

  const orbitSize = Math.min(width * 0.9, 380);
  const center = orbitSize / 2;

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E1B4B"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🛰 Centro Orbital</Text>

        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectorText}>
            {planetData?.nome ?? "Planeta"}
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.orbitArea,
            { width: orbitSize, height: orbitSize },
          ]}
        >
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

          <View style={styles.planetWrapper}>
            <PlanetPreview planet={planetData} />
          </View>

          {satellites.map((sat, index) => (
            <OrbitingSatellite
              key={sat.id}
              radius={sat.radius || 80}
              duration={sat.duration || 8000}
              centerX={center}
              centerY={center}
              size={10}
              initialAngle={(index * 360) / satellites.length}
            />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🛰 Satélites</Text>

          {satellites.map((sat) => (
            <View key={sat.id} style={styles.item}>
              <Text style={styles.name}>{sat.name}</Text>

              {sat.isUserCreated && (
                <Text style={styles.missionStatus}>
                  📡 {sat.status}
                </Text>
              )}

              <Text style={styles.info}>
                ⚡ Energia: {sat.energy}
              </Text>

              <Text style={styles.info}>
                🪐 Apoastro: {sat.apoastro}
              </Text>

              <Text style={styles.info}>
                🪐 Periastro: {sat.periastro}
              </Text>

              <Text style={styles.info}>
                🎯 {sat.objective}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            {PLANET_LIST.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedPlanet(p.id);
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff" }}>
                  {p.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  },

  selectorButton: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },

  selectorText: {
    color: "#fff",
    fontWeight: "bold",
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
    transform: [{ translateX: -60 }, { translateY: -60 }],
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
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    paddingBottom: 10,
  },

  name: {
    color: "#fff",
    fontWeight: "bold",
  },

  info: {
    color: "#CBD5E1",
    fontSize: 12,
  },

  missionStatus: {
    color: "#FACC15",
    fontSize: 12,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 20,
  },

  modalItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});