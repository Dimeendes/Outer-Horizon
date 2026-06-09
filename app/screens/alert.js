import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SATELLITES_LIST } from '../../data/SatellitesList';
import { planets } from '../../data/planets';
import { sensorMock } from '../../data/researchData';

const LIMITS = {
  temp: 50,
  pressure: 2000,
  seismic: 7,
};

const FILTERS = ["Todos", "Planetas", "Satélites"];

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [filterModalVisible, setFilterModalVisible] =
    useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState(null);

  function checkAlerts() {
    const alertList = [];

    Object.entries(sensorMock).forEach(([planetId, data]) => {
      const planetName =
        planets.find((p) => p.id === planetId)?.nome ||
        planetId;

      const temp = data.temp?.at(-1);
      const pressure = data.pressure?.at(-1);
      const seismic = data.seismic?.at(-1);

      if (temp >= LIMITS.temp) {
        alertList.push({
          id: `${planetId}-temp`,
          type: "planet",
          title: "Temperatura crítica",
          source: planetName,
          value: `${temp} °C`,
          severity: "ALERTA",
          recommendation: {
            category: "ORBITAL",
            action: "Acelerar em sentido prógrado",
            impact:
              "Aumentar altitude orbital e reduzir exposição térmica",
            priority: "ALTA",
          },
        });
      }

      if (pressure >= LIMITS.pressure) {
        alertList.push({
          id: `${planetId}-pressure`,
          type: "planet",
          title: "Pressão crítica",
          source: planetName,
          value: `${pressure} kPa`,
          severity: "ALERTA",
          recommendation: {
            category: "ORBITAL",
            action: "Acelerar em sentido prógrado",
            impact:
              "Reduzir influência atmosférica sobre o satélite",
            priority: "ALTA",
          },
        });
      }

      if (
        planetId === "earth" &&
        seismic >= LIMITS.seismic
      ) {
        alertList.push({
          id: `${planetId}-seismic`,
          type: "planet",
          title: "Atividade sísmica elevada",
          source: "Terra",
          value: seismic,
          severity: "CRÍTICO",
          recommendation: {
            category: "PESQUISA",
            action: "Priorizar coleta sísmica",
            impact:
              "Aumentar monitoramento geológico",
            priority: "CRÍTICA",
          },
        });
      }
    });

    Object.values(SATELLITES_LIST).forEach(
      (satelliteGroup) => {
        satelliteGroup.forEach((sat) => {
          const signalLow =
            sat.signal?.toLowerCase() === "baixa";

          const telemetryOff =
            sat.telemetry?.toLowerCase() === "inativo";

          if (signalLow) {
            alertList.push({
              id: `${sat.id}-signal`,
              type: "satellite",
              title: "Sinal fraco detectado",
              source: sat.name,
              severity: "ALERTA",
              recommendation: {
                category: "COMUNICAÇÃO",
                action: "Realinhar antena principal",
                impact:
                  "Melhorar estabilidade do enlace",
                priority: "ALTA",
              },
            });
          }

          if (telemetryOff) {
            alertList.push({
              id: `${sat.id}-telemetry`,
              type: "satellite",
              title: "Telemetria desativada",
              source: sat.name,
              severity: "CRÍTICO",
              recommendation: {
                category: "SISTEMA",
                action: "Reiniciar módulo de telemetria",
                impact:
                  "Restabelecer transmissão de dados",
                priority: "CRÍTICA",
              },
            });
          }
        });
      }
    );

    setAlerts(alertList);
  }

  useEffect(() => {
    checkAlerts();

    const interval = setInterval(
      checkAlerts,
      3000
    );

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts =
    filter === "Todos"
      ? alerts
      : alerts.filter((a) =>
          filter === "Planetas"
            ? a.type === "planet"
            : a.type === "satellite"
        );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      <Text style={styles.title}>
        🚨 Centro de Alertas
      </Text>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={styles.filterText}>
          Filtro: {filter}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Alertas Ativos
      </Text>

      {filteredAlerts.length === 0 ? (
        <Text style={styles.empty}>
          Nenhuma anomalia detectada
        </Text>
      ) : (
        filteredAlerts.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              item.severity === "CRÍTICO"
                ? styles.critical
                : styles.warning,
            ]}
          >
            <Text style={styles.source}>
              {item.source}
            </Text>

            <Text style={styles.text}>
              {item.title}
            </Text>

            {item.type === "planet" && (
              <Text style={styles.value}>
                Valor: {item.value}
              </Text>
            )}

            <Text style={styles.severity}>
              {item.severity}
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                setSelectedRecommendation({
                  ...item.recommendation,
                  source: item.source,
                  title: item.title,
                })
              }
            >
              <Text style={styles.actionButtonText}>
                Ações recomendadas
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Modal visible={filterModalVisible} transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modal}>
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={styles.modalItem}
                onPress={() => {
                  setFilter(f);
                  setFilterModalVisible(false);
                }}
              >
                <Text style={{ color: "#FFF" }}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={!!selectedRecommendation}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedRecommendation(null)}
        >
          <View style={styles.recommendationModal}>
            <Text style={styles.recModalTitle}>
              Ações recomendadas
            </Text>

            <Text style={styles.recCategory}>
              {selectedRecommendation?.category}
            </Text>

            <Text style={styles.recSource}>
              {selectedRecommendation?.source}
            </Text>

            <Text style={styles.recAlertTitle}>
              Alerta: {selectedRecommendation?.title}
            </Text>

            <Text style={styles.recAction}>
              ➜ {selectedRecommendation?.action}
            </Text>

            <Text style={styles.recImpact}>
              {selectedRecommendation?.impact}
            </Text>

            <Text style={styles.recPriority}>
              Prioridade: {selectedRecommendation?.priority}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedRecommendation(null)}
            >
              <Text style={styles.closeButtonText}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    padding: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#60A5FA",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  filterButton: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  filterText: {
    color: "#FFF",
    textAlign: "center",
  },

  empty: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 30,
  },

  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  warning: {
    backgroundColor: "rgba(234,179,8,0.12)",
    borderLeftWidth: 4,
    borderLeftColor: "#EAB308",
  },

  critical: {
    backgroundColor: "rgba(239,68,68,0.12)",
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },

  source: {
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 5,
  },

  text: {
    color: "#CBD5E1",
  },

  value: {
    color: "#CBD5E1",
    marginTop: 5,
  },

  severity: {
    color: "#FFF",
    marginTop: 8,
    fontWeight: "bold",
  },

  actionButton: {
    marginTop: 12,
    backgroundColor: "#1D4ED8",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "flex-start",
  },

  actionButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  recCategory: {
    color: "#60A5FA",
    fontWeight: "bold",
  },

  recSource: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 4,
  },

  recAlertTitle: {
    color: "#CBD5E1",
    marginTop: 10,
  },

  recAction: {
    color: "#E2E8F0",
    marginTop: 8,
  },

  recImpact: {
    color: "#94A3B8",
    marginTop: 4,
  },

  recPriority: {
    color: "#FACC15",
    marginTop: 8,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
  },

  modal: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    overflow: "hidden",
  },

  recommendationModal: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },

  recModalTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#1D4ED8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});