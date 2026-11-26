import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Text } from 'react-native-paper';

export default function Detalhes() {
  const router = useRouter();
  const { titulo, diretor, imagem } = useLocalSearchParams();
  const [salvando, setSalvando] = useState(false);

  const temPoster = typeof imagem === 'string' && imagem.trim() !== '';

  async function salvarFilme() {
    setSalvando(true);

    try {
      const filme = { titulo, diretor, imagem };
      const filmeEmTexto = JSON.stringify(filme);

      await AsyncStorage.setItem('filmeSalvo', filmeEmTexto);
    } catch {
      Alert.alert('Erro ao salvar', 'Tente novamente.');
      return;
    } finally {
      setSalvando(false);
    }

    router.push('/salvo');
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Card mode="outlined">
        {temPoster && (
          <Image
            source={{ uri: imagem }}
            style={styles.poster}
            resizeMode="contain"
          />
        )}

        <Card.Content style={styles.informacoes}>
          <Text variant="titleLarge">{titulo}</Text>
          <Text variant="bodyMedium">Direção: {diretor}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={salvarFilme}
        loading={salvando}
        disabled={salvando}
      >
        Salvar filme
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    padding: 16,
    gap: 16,
  },
  poster: {
    width: '100%',
    height: 360,
  },
  informacoes: {
    paddingTop: 16,
    gap: 6,
  },
});