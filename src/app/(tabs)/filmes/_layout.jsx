import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function LayoutFilmes() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.onSurface,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Filmes' }} />
      <Stack.Screen name="detalhes" options={{ title: 'Detalhes do filme' }} />
    </Stack>
  );
}