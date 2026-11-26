import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch('https://ghibliapi.dev/films')
      .then((resposta) => resposta.json())
      .then((dados) => setFilmes(dados))
      .catch((erro) => console.error(erro));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Filmes</Text>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});