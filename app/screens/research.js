import { useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useMission } from '../../contexts/MissionContext';
import { SATELLITES_LIST } from '../../data/SatellitesList';
import { sensorMock } from '../../data/researchData';

const planets = {
  earth: { id: "earth", name: "Terra" },
  mars: { id: "mars", name: "Marte" },
  venus: { id: "venus", name: "Vênus" },
  jupiter: { id: "jupiter", name: "Júpiter" },
  saturn: { id: "saturn", name: "Saturno" },
  uranus: { id: "uranus", name: "Urano" },
  neptune: { id: "neptune", name: "Netuno" },
};

export default function Research() {
  const width = Dimensions.get("window").width;
  const { missions } = useMission();

  const [selectedPlanet, setSelectedPlanet] = useState("earth");
  const [modalVisible, setModalVisible] = useState(false);

  const data = sensorMock[selectedPlanet] ?? {
    temp: [0],
    pressure: [0],
    seismic: [0],
  };

  const fixedSatellites = SATELLITES_LIST?.[selectedPlanet] ?? [];

  const researchFixed = fixedSatellites.filter((s) =>
    s?.objective?.toLowerCase?.().includes("pesquisa")
  );

  const researchMissions = (missions ?? []).filter(
    (m) =>
      m?.planetId === selectedPlanet &&
      m?.objective?.toLowerCase?.().includes("pesquisa")
  );

  const hasData =
    (data?.temp?.length ?? 0) > 0 ||
    (data?.pressure?.length ?? 0) > 0 ||
    (data?.seismic?.length ?? 0) > 0;

  const chartConfig = {
    backgroundGradientFrom: "#0F172A",
    backgroundGradientTo: "#1E1B4B",
    color: () => "#60A5FA",
    labelColor: () => "#CBD5E1",
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 10,
    },
  };

  const timeLabels = ["0", "2", "4", "6", "8", "10"];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#050816" }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>🔬 Centro de Pesquisa</Text>

      {/* SELECT PLANETA */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {planets[selectedPlanet]?.name}
        </Text>
      </TouchableOpacity>

      {/* SEM DADOS */}
      {!hasData && (
        <Text style={styles.empty}>
          Nenhum dado disponível para este planeta.
        </Text>
      )}

      {/* 🌡 TEMPERATURA (ºC/min) */}
      {hasData && (
        <View style={styles.block}>
          <Text style={styles.section}>🌡 Temperatura (ºC/min)</Text>

          <LineChart
            data={{
              labels: timeLabels,
              datasets: [{ data: data.temp }],
            }}
            width={width * 0.9}
            height={220}
            chartConfig={{
              ...chartConfig,
              yAxisSuffix: "°C",
              formatXLabel: (value) => `${value}m`,
            }}
            bezier
            withDots={false}
            style={{ marginVertical: 10 }}
          />

          {/* 🌪 PRESSÃO (kPa/min)*/}
          <Text style={styles.section}>🌪 Pressão (kPa/min)</Text>

          <LineChart
            data={{
              labels: timeLabels,
              datasets: [{ data: data.pressure }],
            }}
            width={width * 0.9}
            height={220}
            chartConfig={{
              ...chartConfig,
              yAxisSuffix: " kPa",
              formatXLabel: (value) => `${value}m`,
            }}
            bezier
            withDots={false}
            style={{ marginVertical: 10 }}
          />

          {/* 🌍 SÍSMICO (indice/min)*/}
          <Text style={styles.section}>🌍 Atividade sísmica (indice/min)</Text>

          <LineChart
            data={{
              labels: timeLabels,
              datasets: [{ data: data.seismic }],
            }}
            width={width * 0.9}
            height={220}
            chartConfig={{
              ...chartConfig,
              yAxisSuffix: "",
              formatXLabel: (value) => `${value}m`,
            }}
            bezier
            withDots={false}
            style={{ marginVertical: 10 }}
          />
        </View>
      )}

      {/* FONTES */}
      {hasData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🛰 Satélites de pesquisa</Text>

          {researchFixed.map((s) => (
            <View key={s.id} style={{ marginBottom: 14 }}>
              <Text style={styles.item}>• {s.name}</Text>

              <Text style={styles.subItem}>
                Telemetria: {s.telemetry}
              </Text>

              <Text style={styles.subItem}>
                Latência: {s.latency}
              </Text>

              <Text style={styles.subItem}>
                Sinal: {s.signal}
              </Text>
            </View>
          ))}

          {researchMissions.map((m) => (
            <Text key={m.id} style={styles.item}>
              • {m.name}
            </Text>
          ))}
        </View>
      )}

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={{ width: "100%" }}>
            {Object.values(planets).map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedPlanet(p.id);
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff" }}>{p.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 140,
    alignItems: "center",
    backgroundColor: "#050816",
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  selector: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    width: "90%",
  },

  selectorText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  empty: {
    color: "#94A3B8",
    marginTop: 30,
    textAlign: "center",
  },

  block: {
    marginTop: 10,
    alignItems: "center",
  },

  section: {
    color: "#60A5FA",
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },

  card: {
    width: "90%",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  cardTitle: {
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },

  item: {
    color: "#CBD5E1",
    fontSize: 12,
    marginBottom: 5,
  },

  subItem: {
    color: "#94A3B8",
    fontSize: 11,
    marginLeft: 10,
    marginTop: 2,
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },

  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});