import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Star from '../components/animatedStar';
import { useMission } from '../contexts/MissionContext';
import { Logins } from '../data/logins';

const { width, height } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const { setCurrentUser } = useMission();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [stars] = useState(
    Array.from({ length: 80 }, () => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * height,
      left: Math.random() * width,
    }))
  );

  async function validarLogin() {
    const userValido = Logins.find(
      (u) => u.nome === nome && u.senha === senha
    );

    if (!userValido) {
      setErro("Nome ou senha incorretos");
      setNome("");
      setSenha("");
      return;
    }

    setErro("");
    await setCurrentUser(userValido.nome);
    router.push("screens/solar-system");
  }

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E1B4B"]}
      style={styles.container}
    >
      {stars.map((star, index) => (
        <Star
          key={index}
          size={star.size}
          top={star.top}
          left={star.left}
        />
      ))}

      <View style={styles.card}>
        <Image
          source={require("../assets/OuterHorizon.png")}
          style={{ width: 250, height: 250, alignSelf: "center" }}
        />

        <Text style={styles.paragrafo}>Nome</Text>
        <TextInput
          style={styles.caixaTexto}
          onChangeText={setNome}
          value={nome}
          placeholder="Digite seu nome"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.paragrafo}>Senha de Acesso</Text>

        {/* SENHA COM IONICONS */}
        <View style={styles.senhaContainer}>
          <TextInput
            style={styles.caixaTextoSenha}
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={!mostrarSenha}
            placeholder="Digite sua senha"
            placeholderTextColor="#94A3B8"
          />

          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#CBD5E1"
            />
          </TouchableOpacity>
        </View>

        {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

        <TouchableOpacity style={styles.botao} onPress={validarLogin}>
          <Text style={styles.botaoTexto}>Iniciar Missão</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        Dados astronômicos • Planetas • Exploração espacial
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    padding: 25,
  },

  paragrafo: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 5,
    marginTop: 8,
  },

  caixaTexto: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#FFF",
    marginBottom: 20,
  },

  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  caixaTextoSenha: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#FFF",
  },

  eyeButton: {
    marginLeft: 10,
    padding: 8,
  },

  botao: {
    backgroundColor: "#6366F1",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  footer: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 30,
    fontSize: 12,
  },

  erro: {
    color: "#F87171",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
});