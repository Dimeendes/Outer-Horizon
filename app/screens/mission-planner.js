import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function MissionPlanner() {
  const [mission, setMission] = useState({
    nome: "",
    objetivo: "",
    destino: "",
    tripulada: false,
    lancamento: "",
    chegada: "",
    cargaUtil: "",
    satelites: "",
  });

  const [missions, setMissions] = useState([]);

  function handleCreateMission() {
    if (
      !mission.nome ||
      !mission.objetivo ||
      !mission.destino
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, objetivo e destino."
      );
      return;
    }

    const novaMissao = {
      id: `MIS-${Date.now()}`,
      ...mission,
      status: "Agendada",
    };

    setMissions((prev) => [...prev, novaMissao]);

    setMission({
      nome: "",
      objetivo: "",
      destino: "",
      tripulada: false,
      lancamento: "",
      chegada: "",
      cargaUtil: "",
      satelites: "",
    });

    Alert.alert(
      "Missão criada",
      "A missão foi cadastrada com sucesso."
    );
  }

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E1B4B"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.title}>
          🚀 Planejador de Missões
        </Text>

        <Text style={styles.subtitle}>
          Centro de Controle Outer Horizon
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Nome da Missão
          </Text>

          <TextInput
            style={styles.input}
            value={mission.nome}
            onChangeText={(text) =>
              setMission({
                ...mission,
                nome: text,
              })
            }
            placeholder="Ex: Europa Survey"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>
            Objetivo
          </Text>

          <TextInput
            style={styles.input}
            value={mission.objetivo}
            onChangeText={(text) =>
              setMission({
                ...mission,
                objetivo: text,
              })
            }
            placeholder="Mapeamento, Pesquisa..."
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>
            Destino
          </Text>

          <TextInput
            style={styles.input}
            value={mission.destino}
            onChangeText={(text) =>
              setMission({
                ...mission,
                destino: text,
              })
            }
            placeholder="Marte, Europa..."
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>
            Data de Lançamento
          </Text>

          <TextInput
            style={styles.input}
            value={mission.lancamento}
            onChangeText={(text) =>
              setMission({
                ...mission,
                lancamento: text,
              })
            }
            placeholder="2030-05-12"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>
            Data de Chegada
          </Text>

          <TextInput
            style={styles.input}
            value={mission.chegada}
            onChangeText={(text) =>
              setMission({
                ...mission,
                chegada: text,
              })
            }
            placeholder="2031-08-25"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>
            Carga Útil (kg)
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mission.cargaUtil}
            onChangeText={(text) =>
              setMission({
                ...mission,
                cargaUtil: text,
              })
            }
            placeholder="5000"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>
            Quantidade de Satélites
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mission.satelites}
            onChangeText={(text) =>
              setMission({
                ...mission,
                satelites: text,
              })
            }
            placeholder="3"
            placeholderTextColor="#94A3B8"
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>
              Missão Tripulada
            </Text>

            <Switch
              value={mission.tripulada}
              onValueChange={(value) =>
                setMission({
                  ...mission,
                  tripulada: value,
                })
              }
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateMission}
          >
            <Text style={styles.buttonText}>
              Criar Missão
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          📋 Missões Cadastradas
        </Text>

        {missions.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhuma missão cadastrada.
          </Text>
        ) : (
          missions.map((item) => (
            <View
              key={item.id}
              style={styles.missionCard}
            >
              <Text style={styles.missionTitle}>
                {item.nome}
              </Text>

              <Text style={styles.missionText}>
                Destino: {item.destino}
              </Text>

              <Text style={styles.missionText}>
                Status: {item.status}
              </Text>

              <Text style={styles.missionText}>
                Tripulada:{" "}
                {item.tripulada
                  ? "Sim"
                  : "Não"}
              </Text>

              <Text style={styles.missionText}>
                Satélites: {item.satelites}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  label: {
    color: "#FFF",
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 14,
    color: "#FFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  emptyText: {
    color: "#94A3B8",
  },

  missionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  missionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  missionText: {
    color: "#CBD5E1",
    marginBottom: 4,
  },
});