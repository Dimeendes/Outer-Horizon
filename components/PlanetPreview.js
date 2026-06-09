import { View, StyleSheet } from "react-native";

export default function PlanetPreview({ planet }) {
  switch (planet.id) {
    case "mercury":
      return (
        <View
          style={[
            styles.planet,
            {
              backgroundColor: "#B0BEC5",
            },
          ]}
        />
      );

    case "venus":
      return (
        <View
          style={[
            styles.planet,
            {
              backgroundColor: "#FFD54F",
            },
          ]}
        />
      );

    case "earth":
      return (
        <View style={styles.planet}>
          <View style={styles.earth} />
          <View style={styles.continent1} />
          <View style={styles.continent2} />
        </View>
      );

    case "mars":
      return (
        <View
          style={[
            styles.planet,
            {
              backgroundColor: "#FF7043",
            },
          ]}
        />
      );

    case "jupiter":
      return (
        <View style={styles.jupiter}>
          <View style={styles.band} />
          <View style={styles.band2} />
          <View style={styles.band3} />
        </View>
      );

    case "saturn":
      return (
        <View style={styles.saturnContainer}>
          <View style={styles.ringFront} />
          <View style={styles.saturn} />
          <View style={styles.ringBack} />
        </View>
      );

    case "uranus":
      return (
        <View
          style={[
            styles.planet,
            {
              backgroundColor: "#90CAF9",
            },
          ]}
        />
      );

    case "neptune":
      return (
        <View
          style={[
            styles.planet,
            {
              backgroundColor: "#1565C0",
            },
          ]}
        />
      );

    default:
      return <View style={styles.planet} />;
  }
}

const styles = StyleSheet.create({
  planet: {
    width: 120,
    height: 120,
    borderRadius: 60,

    alignSelf: "center",

    shadowColor: "#FFF",
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },

  earth: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#42A5F5",
  },

  continent1: {
    position: "absolute",
    width: 30,
    height: 18,
    backgroundColor: "#4CAF50",
    top: 35,
    left: 25,
    borderRadius: 20,
  },

  continent2: {
    position: "absolute",
    width: 40,
    height: 20,
    backgroundColor: "#4CAF50",
    bottom: 30,
    right: 20,
    borderRadius: 20,
  },

  jupiter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "#D4A373",
    alignSelf: "center",
  },

  band: {
    height: 20,
    backgroundColor: "#C68B59",
    marginTop: 15,
  },

  band2: {
    height: 15,
    backgroundColor: "#B57A4A",
    marginTop: 10,
  },

  band3: {
    height: 18,
    backgroundColor: "#C68B59",
    marginTop: 12,
  },

  saturnContainer: {
    alignSelf: "center",
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },

  saturn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E9C46A",
    zIndex: 2,
  },

  ringFront: {
    position: "absolute",
    width: 140,
    height: 40,
    borderRadius: 999,
    borderTopWidth: 5,
    borderColor: "#594314",
    transform: [{ rotate: "-20deg" }],
    zIndex: 3,
  },
  ringBack: {
    position: "absolute",
    width: 140,
    height: 40,
    borderRadius: 999,
    borderWidth: 5,
    borderColor: "#594314",
    transform: [{ rotate: "-20deg" }],
    zIndex: 1
  },
});