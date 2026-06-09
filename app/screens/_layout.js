import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
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
          marginBottom: 20, // 👈 AUMENTADO (evita sobreposição)
          borderRadius: 20,

          paddingBottom: 10,
          paddingTop: 10,

          elevation: 0,

          left: 0,
          right: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="solar-system"
        options={{
          title: "Sistema Solar",
          tabBarIcon: ({ color }) => (
            <Ionicons name="sunny-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="research"
        options={{
          title: "Pesquisa",
          tabBarIcon: ({ color }) => (
            <Ionicons name="flask-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mission-planner"
        options={{
          title: "Controle de missão",
          tabBarIcon: ({ color }) => (
            <Ionicons name="laptop-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="planet-details"
        options={{
          title: "Planetas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="planet-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="satellites"
        options={{
          title: "Satélites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="telescope-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="alert"
        options={{
          title: "Alertas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Sair",
          tabBarIcon: ({ color }) => (
            <Ionicons name="close-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}