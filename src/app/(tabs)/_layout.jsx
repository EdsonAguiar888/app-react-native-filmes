import { Tabs, useRouter } from 'expo-router';
import { HeaderBackButton } from 'expo-router/react-navigation';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useTheme } from 'react-native-paper';

export default function LayoutAbas() {
  const { colors } = useTheme();
  const router = useRouter();


  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: { backgroundColor: colors.surface },
        sceneStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.onSurface,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarAccessibilityLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="filmes"
        options={{
          headerShown: false,
          popToTopOnBlur: true,
          tabBarAccessibilityLabel: 'Filmes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />

    <Tabs.Screen
        name="salvo"
        options={{
          title: 'Filme salvo',
          headerShown: true,
          tabBarAccessibilityLabel: 'Salvos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <HeaderBackButton
              tintColor={colors.onSurface}
              displayMode="minimal"
              onPress={() => router.navigate('/filmes')}
            />
          ),
        }}
/>
    </Tabs>
  );
}