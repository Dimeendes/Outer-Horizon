import { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useMission } from '../../contexts/MissionContext';

const PLANETS = [
  { id: "earth", name: "Terra", time: "Instantâneo" },
  { id: "venus", name: "Vênus", time: "4-6 meses" },
  { id: "mars", name: "Marte", time: "6-9 meses" },
  { id: "mercury", name: "Mercúrio", time: "6-7 anos" },
  { id: "jupiter", name: "Júpiter", time: "1-6 anos" },
  { id: "saturn", name: "Saturno", time: "3-7 anos" },
  { id: "uranus", name: "Urano", time: "8-12 anos" },
  { id: "neptune", name: "Netuno", time: "12 anos" },
];

const OBJECTIVES = [
  "Pesquisa científica",
  "Escaneamento de terreno",
  "Exploração atmosférica",
  "Coleta gravitacional",
];

const DIRECTIONS = ["Equatorial", "Polar"];

const ENERGY_TYPES = [
  "Solar",
  "Nuclear",
  "Híbrida",
  "Bateria interna",
];

function formatDate(value) {
  const cleaned = value.replace(/\D/g, "").slice(0, 8);

  const parts = [];
  if (cleaned.length > 0) parts.push(cleaned.slice(0, 2));
  if (cleaned.length > 2) parts.push(cleaned.slice(2, 4));
  if (cleaned.length > 4) parts.push(cleaned.slice(4, 8));

  return parts.join("/");
}

function isValidDate(str) {
  return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(str);
}

export default function MissionControl() {
  const {
    missions,
    currentUser,
    addMission: createMission,
    cancelMission,
  } = useMission();

  const [name, setName] = useState("");
  const [planetId, setPlanetId] = useState(null);
  const [objective, setObjective] = useState(null);
  const [direction, setDirection] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [startDate, setStartDate] = useState("");

  const [createModal, setCreateModal] = useState(false);
  const [planetModal, setPlanetModal] = useState(false);
  const [objectiveModal, setObjectiveModal] = useState(false);
  const [directionModal, setDirectionModal] = useState(false);
  const [energyModal, setEnergyModal] = useState(false);
  const [errors, setErrors] = useState({});

  function clearError(field) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function calculateArrival(id) {
    const p = PLANETS.find((pl) => pl.id === id);
    return p ? p.time : "Desconhecido";
  }

  async function handleAddMission() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Campo obrigatório";
    if (!planetId) newErrors.planetId = "Campo obrigatório";
    if (!objective) newErrors.objective = "Campo obrigatório";
    if (!direction) newErrors.direction = "Campo obrigatório";
    if (!energy) newErrors.energy = "Campo obrigatório";
    if (!startDate.trim()) newErrors.startDate = "Campo obrigatório";
    else if (!isValidDate(startDate)) newErrors.startDate = "Data inválida (DD/MM/AAAA)";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    await createMission({
      name,
      planetId,
      objective,
      direction,
      energy,
      startDate,
      status: "planned",
      arrival: calculateArrival(planetId),
    });

    setName("");
    setPlanetId(null);
    setObjective(null);
    setDirection(null);
    setEnergy(null);
    setStartDate("");
    setCreateModal(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛰 Controle de missão</Text>
      <Text style={styles.loggedUser}>
        Usuário atual: {currentUser || "não identificado"}
      </Text>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setCreateModal(true)}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + Criar nova missão
        </Text>
      </TouchableOpacity>

      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const planet = PLANETS.find(p => p.id === item.planetId);

          return (
            <View style={styles.card}>
              <Text style={styles.missionTitle}>🛰 {item.name}</Text>

              <Text style={styles.text}>🌍 Destino: {planet?.name}</Text>
              <Text style={styles.text}>🔬 Objetivo: {item.objective}</Text>
              <Text style={styles.text}>⚡ Energia: {item.energy}</Text>
              <Text style={styles.text}>🧭 Direção: {item.direction}</Text>
              <Text style={styles.text}>📅 Início: {item.startDate}</Text>
              <Text style={styles.text}>
                👤 Criada por: {item.createdBy || "Usuário desconhecido"}
              </Text>

              <Text style={styles.arrival}>
                ⏱ Tempo estimado: {item.arrival}
              </Text>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelMission(item.id)}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Cancelar missão
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <Modal visible={createModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Criar missão</Text>

            <View style={styles.fieldContainer}>
              <TextInput
                placeholder="Nome do satélite"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  clearError("name");
                }}
                style={styles.input}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.fieldContainer}>
              <TouchableOpacity style={styles.selector} onPress={() => setPlanetModal(true)}>
                <Text style={styles.selectorText}>
                  {planetId || "Selecionar planeta"}
                </Text>
              </TouchableOpacity>
              {errors.planetId ? <Text style={styles.errorText}>{errors.planetId}</Text> : null}
            </View>

            <View style={styles.fieldContainer}>
              <TouchableOpacity style={styles.selector} onPress={() => setObjectiveModal(true)}>
                <Text style={styles.selectorText}>
                  {objective || "Selecionar objetivo"}
                </Text>
              </TouchableOpacity>
              {errors.objective ? <Text style={styles.errorText}>{errors.objective}</Text> : null}
            </View>

            <View style={styles.fieldContainer}>
              <TouchableOpacity style={styles.selector} onPress={() => setDirectionModal(true)}>
                <Text style={styles.selectorText}>
                  {direction || "Selecionar direção"}
                </Text>
              </TouchableOpacity>
              {errors.direction ? <Text style={styles.errorText}>{errors.direction}</Text> : null}
            </View>

            <View style={styles.fieldContainer}>
              <TouchableOpacity style={styles.selector} onPress={() => setEnergyModal(true)}>
                <Text style={styles.selectorText}>
                  {energy || "Selecionar energia"}
                </Text>
              </TouchableOpacity>
              {errors.energy ? <Text style={styles.errorText}>{errors.energy}</Text> : null}
            </View>

            <View style={styles.fieldContainer}>
              <TextInput
                placeholder="DD/MM/AAAA"
                value={startDate}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(t) => {
                  setStartDate(formatDate(t));
                  clearError("startDate");
                }}
                style={styles.input}
              />
              {errors.startDate ? <Text style={styles.errorText}>{errors.startDate}</Text> : null}
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMission}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Criar missão
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setCreateModal(false);
                setErrors({});
              }}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={energyModal} transparent>
        <View style={styles.modal}>
          {ENERGY_TYPES.map((e) => (
            <TouchableOpacity
              key={e}
              style={styles.modalItem}
              onPress={() => {
                setEnergy(e);
                setEnergyModal(false);
                clearError("energy");
              }}
            >
              <Text style={{ color: "#fff" }}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal visible={planetModal} transparent>
        <View style={styles.modal}>
          {PLANETS.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.modalItem}
              onPress={() => {
                setPlanetId(p.id);
                setPlanetModal(false);
                clearError("planetId");
              }}
            >
              <Text style={{ color: "#fff" }}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal visible={objectiveModal} transparent>
        <View style={styles.modal}>
          {OBJECTIVES.map((o) => (
            <TouchableOpacity
              key={o}
              style={styles.modalItem}
              onPress={() => {
                setObjective(o);
                setObjectiveModal(false);
                clearError("objective");
              }}
            >
              <Text style={{ color: "#fff" }}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal visible={directionModal} transparent>
        <View style={styles.modal}>
          {DIRECTIONS.map((d) => (
            <TouchableOpacity
              key={d}
              style={styles.modalItem}
              onPress={() => {
                setDirection(d);
                setDirectionModal(false);
                clearError("direction");
              }}
            >
              <Text style={{ color: "#fff" }}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050816", padding: 20 },

  title: { color: "#fff", fontSize: 26, fontWeight: "bold" },

  loggedUser: {
    color: "#94A3B8",
    marginTop: 6,
    marginBottom: 10,
  },

  openButton: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 50,
  },

  missionTitle: { color: "#fff", fontWeight: "bold" },
  text: { color: "#CBD5E1", fontSize: 12 },

  arrival: { color: "#60A5FA", marginTop: 5, fontWeight: "bold" },

  cancelButton: {
    marginTop: 10,
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#0F172A",
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: { color: "#fff", fontSize: 18, marginBottom: 10 },

  fieldContainer: {
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#111827",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },

  selector: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 8,
  },

  errorText: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 3,
    marginLeft: 2,
  },

  selectorText: { color: "#fff", textAlign: "center" },

  addButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  closeButton: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});