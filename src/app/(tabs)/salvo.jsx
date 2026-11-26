
import { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Text } from 'react-native-paper';

export default function Salvo() {
  const [filme, setFilme] = useState(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('filmeSalvo')
        .then((texto) => {
          setFilme(texto ? JSON.parse(texto) : null);
        })
        .catch((erro) => console.error(erro));
    }, [])
  );

  return (
    <View style={styles.container}>
      {filme ? (
        <Card mode="outlined">
          <Card.Content>
            <Text variant="headlineMedium" style={styles.titulo}>
              {filme.titulo}
            </Text>

            {filme.imagem ? (
              <Image
                source={{ uri: filme.imagem }}
                style={styles.poster}
                resizeMode="contain"
              />
            ) : null}

            <Text variant="bodyMedium">Direção: {filme.diretor}</Text>
          </Card.Content>
        </Card>
      ) : (
        <Text>Nenhum filme salvo.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    height: 300,
    marginVertical: 12,
  },
});





// import { useEffect, useState } from 'react';
// import { Image, StyleSheet, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActivityIndicator, Card, Text } from 'react-native-paper';

// export default function Salvo() {
//   const [filme, setFilme] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState('');

//   useEffect(() => {
//     async function lerFilme() {
//       try {
//         const filmeEmTexto = await AsyncStorage.getItem('filmeSalvo');
//         setFilme(filmeEmTexto === null ? null : JSON.parse(filmeEmTexto));
//       } catch {
//         setErro('Não foi possível ler o filme salvo.');
//       } finally {
//         setCarregando(false);
//       }
//     }

//     lerFilme();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {carregando && <ActivityIndicator />}

//       {erro && <Text>{erro}</Text>}

//       {!carregando && !erro && !filme && (
//         <Text>Nenhum filme salvo.</Text>
//       )}

//       {filme && (
//         <Card mode="outlined">
//           <Card.Content>
//             <Text variant="headlineMedium" style={styles.titulo}>
//               {filme.titulo}
//             </Text>

//             {filme.imagem && (
//               <Image
//                 source={{ uri: filme.imagem }}
//                 style={styles.poster}
//                 resizeMode="contain"
//               />
//             )}

//             <Text variant="bodyMedium">Direção: {filme.diretor}</Text>
//           </Card.Content>
//         </Card>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   titulo: {
//     textAlign: 'center',
//   },
//   poster: {
//     width: '100%',
//     height: 300,
//     marginVertical: 12,
//   },
// });