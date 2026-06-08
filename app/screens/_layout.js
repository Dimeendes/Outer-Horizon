import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs  screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
          position: "absolute",

          backgroundColor: "rgba(255,255,255,0.06)",

          borderTopWidth: 1,
          borderTopColor: "rgba(255,255,255,0.1)",

          height: 70,

          marginHorizontal: 15,
          marginBottom: 15,

          borderRadius: 20,

          paddingBottom: 10,
          paddingTop: 10,

          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}>
      <Tabs.Screen
        name="solar-system"
        options={{
          title: 'Sistema Solar',
          tabBarIcon: ({ color }) => <Ionicons name="sunny-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mission-details"
        options={{
          title: 'Detalhes de missões',
          tabBarIcon: ({ color }) => <Ionicons name="laptop-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mission-planner"
        options={{
          title: 'Cadastro de missão',
          tabBarIcon: ({ color }) => <Ionicons name="add-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="planet-details"
        options={{
          title: 'Planetas',
          tabBarIcon: ({ color }) => <Ionicons name="planet-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="satellites"
        options={{
          title: 'Satélites',
          tabBarIcon: ({ color }) => <Ionicons name="telescope-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );

  const styles = StyleSheet.create({
    card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 25,
  }
});
}