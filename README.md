# Cine Filmes

Aplicativo acadêmico de catálogo de filmes do Studio Ghibli, desenvolvido em JavaScript com React Native e Expo. O app consulta uma API pública, abre os detalhes de cada filme e permite guardar um filme no dispositivo para consultar depois.

## Funcionalidades

- **Home:** apresenta o Cine Filmes e oferece o botão **Clique aqui** para abrir o catálogo.
- **Filmes:** consulta a API e exibe o título, o ano de lançamento e a miniatura do pôster, quando disponível.
- **Detalhes:** mostra o pôster em tamanho maior, o título e o diretor do filme selecionado. O botão **Salvar filme** grava o registro e abre **Salvos**.
- **Salvos:** mostra o nome centralizado, o pôster abaixo do nome e o diretor. A seta do cabeçalho abre a lista de filmes.
- **Barra inferior:** oferece três ícones, Home, Filmes e Salvos. Ela também fica visível nos detalhes, dentro da aba Filmes.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| JavaScript e React Native | Componentes, estado das telas e renderização da lista com `FlatList`. |
| Expo SDK 58 | Ambiente de desenvolvimento e execução no Expo Go. |
| Expo Router | Rotas baseadas em arquivos, abas inferiores e navegação entre lista e detalhes. |
| React Native Paper | Tema escuro, botões, cartões, textos, divisórias e itens da lista. |
| Ionicons | Ícones da barra inferior. O pacote de ícones usa `expo-font` para carregar a fonte. |
| AsyncStorage | Armazenamento local do filme escolhido. |
| Studio Ghibli API | Fonte dos dados do catálogo. |

## Como executar

### Pré-requisitos

- Node.js em uma versão compatível com o Expo SDK 58, com npm disponível.
- Expo Go compatível com o SDK do projeto para testar em um celular.
- Conexão com a internet para consultar o catálogo e carregar os pôsteres.

### Instalação

Abra o terminal na raiz do projeto, na pasta `primeiro-app-react-native`, onde está o `package.json`. Rode:

```bash
npm install
npx expo start
```

O primeiro comando instala as dependências. O segundo inicia o Metro e mostra um QR Code. Abra o projeto no Expo Go pelo QR Code. Em uma conexão local, mantenha o computador e o celular na mesma rede Wi-Fi. Se a rede local impedir a conexão, pare o servidor com `Ctrl + C` e execute `npx expo start --tunnel`.

O script `npm start` também inicia o Expo. Para reiniciar o Metro com o cache limpo, use `npx expo start --clear`.

## Telas e rotas

O `package.json` usa `expo-router/entry` como ponto de entrada. O Expo Router lê os arquivos em `src/app`.

```text
src/app/
├── _layout.jsx
└── (tabs)/
    ├── _layout.jsx
    ├── index.jsx
    ├── salvo.jsx
    └── filmes/
        ├── _layout.jsx
        ├── index.jsx
        └── detalhes.jsx
```

| Tela | Rota | Arquivo dentro de `src/app` |
| --- | --- | --- |
| Home | `/` | `(tabs)/index.jsx` |
| Lista de filmes | `/filmes` | `(tabs)/filmes/index.jsx` |
| Detalhes do filme | `/filmes/detalhes` | `(tabs)/filmes/detalhes.jsx` |
| Filme salvo | `/salvo` | `(tabs)/salvo.jsx` |

O nome entre parênteses em `(tabs)` agrupa as telas e fica fora da URL. Cada arquivo `index.jsx` representa a entrada da sua pasta.

### Por que há três layouts

| Arquivo | Responsabilidade |
| --- | --- |
| `src/app/_layout.jsx` | Aplica o tema global com `PaperProvider`, configura a barra de status e abre o grupo de abas. |
| `src/app/(tabs)/_layout.jsx` | Configura as três abas e seus ícones, além do cabeçalho de Salvos e sua seta para `/filmes`. |
| `src/app/(tabs)/filmes/_layout.jsx` | Cria a pilha de navegação da lista e dos detalhes. A pilha fica dentro da aba Filmes, então a barra permanece na tela ao abrir os detalhes. |

O toque no filme usa `router.push()` para abrir os detalhes. A lista envia `titulo`, `diretor` e `imagem` por parâmetros de rota, que a tela de detalhes lê com `useLocalSearchParams()`. A opção `popToTopOnBlur` na aba Filmes retorna a pilha à lista quando o usuário muda de aba.

## API e armazenamento

### Busca dos filmes

A tela Filmes usa `fetch` para consultar [GET /films](https://ghibliapi.dev/films). A resposta é lida como JSON e guardada no estado com `setFilmes`. A `FlatList` usa o `id` para identificar cada linha e exibe informações como `title`, `release_date` e `image`. O campo `director` é enviado à tela de detalhes.

### Como o filme é salvo

1. A tela de detalhes reúne `titulo`, `diretor` e `imagem` em um objeto.
2. `JSON.stringify()` converte o objeto em texto para gravar com `AsyncStorage.setItem('filmeSalvo', ...)`.
3. Salvos lê a mesma chave com `AsyncStorage.getItem('filmeSalvo')` e usa `JSON.parse()` para recuperar o objeto.
4. Quando a chave está vazia, a tela exibe **Nenhum filme salvo**.

O app guarda **um filme por vez**. Cada gravação substitui o registro anterior. O título, o diretor e o endereço do pôster ficam armazenados no aparelho. A exibição do pôster usa a URL gravada e depende da disponibilidade da imagem na rede.

## Roteiro de demonstração

1. Abra o app e mostre a Home e os três ícones da barra.
2. Toque em **Clique aqui** e mostre a lista carregada da API.
3. Escolha um filme e mostre o título, o diretor e o pôster grande na tela de detalhes.
4. Toque em **Salvar filme** e confira o filme na aba Salvos.
5. Feche e reabra o projeto no Expo Go. Abra Salvos pelo marcador para confirmar a persistência.
6. Salve outro filme e verifique se ele substituiu o registro anterior.
7. Abra os detalhes de um filme, toque em Home e depois em Filmes. Confira se o app retorna à lista. Na aba Salvos, use a seta do cabeçalho para verificar o retorno a Filmes.

## Solução de problemas

| Mensagem ou sintoma | O que conferir |
| --- | --- |
| `Project root directory not found` | Execute o comando na pasta que contém o `package.json`. |
| `Invalid project root` com caminho terminado em `expo` | Use `npx expo start` ou `npm start`. Evite acrescentar `expo` ao fim de `npm start`. |
| `No route named ... nested children: ["(tabs)"]` | No `Stack` do layout principal, a entrada é `(tabs)`. Configure as telas nos layouts internos correspondentes. |
| Salvos mostra o filme anterior ao retornar à aba | Se a leitura estiver em `useEffect(..., [])`, ela roda na montagem. Para atualizar a cada visita, leia o AsyncStorage ao ganhar foco com `useFocusEffect`. |

## Referências

- [Expo Go e execução local](https://docs.expo.dev/get-started/start-developing/)
- [Expo Router e navegação com pilhas dentro de abas](https://docs.expo.dev/router/basics/common-navigation-patterns/)
- [React Native e FlatList](https://reactnative.dev/docs/flatlist)
- [React Native Paper e temas](https://oss.callstack.com/react-native-paper/docs/guides/theming)
- [AsyncStorage no Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/async-storage/)
- [Expo Router e atualização da tela ao ganhar foco](https://docs.expo.dev/router/reference/focus-handling/)
- [Documentação da Studio Ghibli API](https://ghibliapi.dev/)
