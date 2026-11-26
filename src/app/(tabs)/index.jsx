import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

export default function Home() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.marca, { backgroundColor: colors.primary }]} />

      <Text variant="displayMedium" style={styles.titulo}>
        Cine Filmes
      </Text>

      <Text
        variant="bodyLarge"
        style={[styles.descricao, { color: colors.onSurfaceVariant }]}
      >
        Explore os filmes do Studio Ghibli e salve o seu favorito.
      </Text>

      <Button
        mode="contained"
        style={styles.botao}
        contentStyle={styles.conteudoBotao}
        onPress={() => router.push('/filmes')}
      >
        Clique aqui
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    gap: 16,
  },
  marca: {
    width: 48,
    height: 4,
    borderRadius: 2,
  },
  titulo: {
    textAlign: 'center',
    fontWeight: '700',
  },
  descricao: {
    maxWidth: 300,
    textAlign: 'center',
  },
  botao: {
    width: '100%',
    maxWidth: 300,
    marginTop: 12,
  },
  conteudoBotao: {
    minHeight: 52,
  },
});