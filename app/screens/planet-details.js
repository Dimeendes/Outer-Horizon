import { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import PlanetPreview from '../../components/PlanetPreview';
import { SATELLITES_LIST } from '../../data/SatellitesList';
import { planets } from '../../data/planets';

export default function PlanetDetails() {
  const router = useRouter();
  const { planet } = useLocalSearchParams();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const index = planets.findIndex((p) => p.id === planet);
    if (index >= 0) setSelectedIndex(index);
  }, [planet]);

  const selectedPlanet = planets[selectedIndex];

  const satelliteCount =
    SATELLITES_LIST?.[selectedPlanet.id]?.length ?? 0;

  const selectPlanet = (item) => {
    const index = planets.findIndex((p) => p.id === item.id);

    setSelectedIndex(index);
    setModalVisible(false);

    router.setParams({
      planet: item.id,
    });
  };

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E1B4B"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🌍 Centro Planetário</Text>

        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectorText}>
            Selecionar planeta: {selectedPlanet.nome}
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <PlanetPreview planet={selectedPlanet} />

          <Text style={styles.name}>{selectedPlanet.nome}</Text>

          <Text style={styles.info}>🌐 Raio: {selectedPlanet.raio} km</Text>
          <Text style={styles.info}>⚖ Massa: {selectedPlanet.massa}</Text>
          <Text style={styles.info}>🌡 Temperatura: {selectedPlanet.temperatura}</Text>
          <Text style={styles.info}>☀ Distância: {selectedPlanet.distancia}</Text>

          <Text style={styles.info}>
            🛰 Satélites: {satelliteCount}
          </Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Escolha um planeta</Text>

            <FlatList
              data={planets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectPlanet(item)}
                >
                  <Text style={styles.modalText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  scroll: {
    padding: 20,
    paddingBottom: 120,
  },

  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  selectorButton: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  selectorText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  name: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },

  info: {
    color: "#CBD5E1",
    fontSize: 16,
    marginBottom: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#0F172A",
    borderRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },

  modalTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },

  modalText: {
    color: "#FFF",
    fontSize: 16,
  },

  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#334155",
    borderRadius: 10,
    alignItems: "center",
  },
});