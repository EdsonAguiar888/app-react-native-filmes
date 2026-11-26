import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

const tema = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#F5C469',
    onPrimary: '#241600',
    background: '#0C111B',
    surface: '#151E2C',
    onSurface: '#F4F6FA',
    onSurfaceVariant: '#B8C4D4',
    outline: '#566477',
    outlineVariant: '#293548',
  },
};

export default function LayoutPrincipal() {
  return (
    <PaperProvider theme={tema}>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: tema.colors.background },
          headerStyle: { backgroundColor: tema.colors.surface },
          headerTintColor: tema.colors.onSurface,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}