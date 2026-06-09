import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useMission } from '../../contexts/MissionContext';

export default function Logout() {
  const router = useRouter();
  const { clearCurrentUser } = useMission();

  async function handleLogout() {
    try {
      await clearCurrentUser();
      router.replace("/"); // volta para index
    } catch (err) {
      console.log("Erro ao fazer logout:", err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Você tem certeza que deseja fazer logout?
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});