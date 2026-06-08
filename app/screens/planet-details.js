import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Modal,
  FlatList,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import PlanetPreview from "../components/PlanetPreview";

const planets = [
  { id: "mercury", nome: "Mercúrio", raio: 2439, massa: "3.30 × 10²³ kg", satelites: 0, transito: 0, temperatura: "167°C", distancia: "57.9M km" },
  { id: "venus", nome: "Vênus", raio: 6051, massa: "4.87 × 10²⁴ kg", satelites: 0, transito: 0, temperatura: "464°C", distancia: "108M km" },
  { id: "earth", nome: "Terra", raio: 6371, massa: "5.97 × 10²⁴ kg", satelites: 4, transito: 1, temperatura: "15°C", distancia: "149M km" },
  { id: "mars", nome: "Marte", raio: 3389, massa: "6.39 × 10²³ kg", satelites: 2, transito: 2, temperatura: "-65°C", distancia: "227M km" },
  { id: "jupiter", nome: "Júpiter", raio: 69911, massa: "1.89 × 10²⁷ kg", satelites: 12, transito: 0, temperatura: "-110°C", distancia: "778M km" },
  { id: "saturn", nome: "Saturno", raio: 58232, massa: "5.68 × 10²⁶ kg", satelites: 8, transito: 0, temperatura: "-140°C", distancia: "1.4B km" },
  { id: "uranus", nome: "Urano", raio: 25362, massa: "8.68 × 10²⁵ kg", satelites: 3, transito: 0, temperatura: "-195°C", distancia: "2.9B km" },
  { id: "neptune", nome: "Netuno", raio: 24622, massa: "1.02 × 10²⁶ kg", satelites: 2, transito: 1, temperatura: "-200°C", distancia: "4.5B km" },
];

export default function PlanetDetails() {
  const router = useRouter();
  const { planet } = useLocalSearchParams();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // 🔄 sincroniza com URL
  useEffect(() => {
    const index = planets.findIndex((p) => p.id === planet);
    if (index >= 0) setSelectedIndex(index);
  }, [planet]);

  const selectedPlanet = planets[selectedIndex];

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

        {/* BOTÃO DE ABRIR LISTA */}
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
          <Text style={styles.info}>🛰 Satélites: {selectedPlanet.satelites}</Text>
        </View>
      </ScrollView>

      {/* MODAL DE SELEÇÃO */}
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
                  <Text style={styles.modalText}>
                    {item.nome}
                  </Text>
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