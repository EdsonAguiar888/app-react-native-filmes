import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Divider, List } from 'react-native-paper';

export default function Filmes() {
  const router = useRouter();
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch('https://ghibliapi.dev/films')
      .then((resposta) => resposta.json())
      .then((dados) => setFilmes(dados))
      .catch((erro) => console.error(erro));
  }, []);

  function abrirDetalhes(filme) {
    router.push({
      pathname: '/filmes/detalhes',
      params: {
        titulo: filme.title,
        diretor: filme.director,
        imagem: filme.image ?? '',
      },
    });
  }

  function renderizarFilme({ item: filme }) {
    const temPoster =
      typeof filme.image === 'string' && filme.image.trim() !== '';

    return (
      <List.Item
        title={filme.title}
        titleNumberOfLines={2}
        description={filme.release_date}
        accessibilityRole="button"
        style={styles.linha}
        onPress={() => abrirDetalhes(filme)}
        left={
          temPoster
            ? () => (
                <Image
                  source={{ uri: filme.image }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              )
            : undefined
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        style={styles.botaoSalvo}
        onPress={() => router.push('/salvo')}
      >
        Ver filme salvo
      </Button>

      <FlatList
        data={filmes}
        keyExtractor={(filme) => filme.id}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={renderizarFilme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  botaoSalvo: {
    marginVertical: 12,
  },
  lista: {
    paddingBottom: 24,
  },
  linha: {
    paddingVertical: 10,
  },
  poster: {
    width: 48,
    height: 70,
    borderRadius: 6,
  },
});