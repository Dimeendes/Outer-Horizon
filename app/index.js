import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Star from "./components/animatedStar";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [textRM, setTextRM] = useState('');
  const [textSenha, setTextSenha] = useState('');
  const [stars] = useState(
  Array.from({ length: 80 }, () => ({
    size: Math.random() * 3 + 1,
    top: Math.random() * height,
    left: Math.random() * width,
  }))
);

  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#1E1B4B']}
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
              source={require('../assets/OuterHorizon.png')}
              style={{ width: 250, height: 250,alignSelf: 'center' }}
            />

        <Text style={styles.paragrafo}>ID da Missão</Text>

        <TextInput
          style={styles.caixaTexto}
          onChangeText={setTextRM}
          value={textRM}
          placeholder="Digite o ID da missão desejada"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.paragrafo}>Senha de Acesso</Text>

        <TextInput
          style={styles.caixaTexto}
          onChangeText={setTextSenha}
          value={textSenha}
          secureTextEntry
          placeholder="Digite sua senha"
          placeholderTextColor="#94A3B8"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push('screens/solar-system')}
        >
          <Text style={styles.botaoTexto}>
            Iniciar Missão
          </Text>
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
    justifyContent: 'center',
    padding: 25,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 25,
  },

  paragrafo: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 5,
    marginTop: 8,
  },

  caixaTexto: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: '#FFF',
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 12,
  },
});