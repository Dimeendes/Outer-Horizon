import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MISSIONS_KEY = "@shared_missions_storage";
const LEGACY_MISSIONS_KEY = "@missions_storage";
const CURRENT_USER_KEY = "@current_user";

const MissionContext = createContext(null);

export function MissionProvider({ children }) {
  const [missions, setMissions] = useState([]);
  const [currentUser, setCurrentUserState] = useState("");

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const [storedMissions, legacyMissions, storedUser] =
        await Promise.all([
        AsyncStorage.getItem(MISSIONS_KEY),
        AsyncStorage.getItem(LEGACY_MISSIONS_KEY),
        AsyncStorage.getItem(CURRENT_USER_KEY),
      ]);

      if (storedMissions) {
        setMissions(JSON.parse(storedMissions));
      } else if (legacyMissions) {
        const parsedLegacyMissions = JSON.parse(legacyMissions);
        const safeMissions = Array.isArray(parsedLegacyMissions)
          ? parsedLegacyMissions
          : [];

        setMissions(safeMissions);
        await AsyncStorage.setItem(
          MISSIONS_KEY,
          JSON.stringify(safeMissions)
        );
        await AsyncStorage.removeItem(LEGACY_MISSIONS_KEY);
      } else {
        setMissions([]);
      }

      if (storedMissions && legacyMissions) {
        await AsyncStorage.removeItem(LEGACY_MISSIONS_KEY);
      }

      if (storedUser) {
        setCurrentUserState(storedUser);
      }
    } catch (err) {
      console.log("Erro ao carregar contexto de missão:", err);
    }
  }

  async function persistMissions(updatedMissions) {
    setMissions(updatedMissions);
    await AsyncStorage.setItem(
      MISSIONS_KEY,
      JSON.stringify(updatedMissions)
    );
  }

  async function addMission(missionData) {
    const newMission = {
      id: Date.now().toString(),
      ...missionData,
      createdBy: currentUser || "Usuário desconhecido",
    };

    const updatedMissions = [newMission, ...missions];
    await persistMissions(updatedMissions);

    return newMission;
  }

  async function cancelMission(missionId) {
    const updatedMissions = missions.filter(
      (mission) => mission.id !== missionId
    );

    await persistMissions(updatedMissions);
  }

  async function setCurrentUser(userName) {
    setCurrentUserState(userName);
    await AsyncStorage.setItem(CURRENT_USER_KEY, userName);
  }

  async function clearCurrentUser() {
    setCurrentUserState("");
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  }

  const value = useMemo(
    () => ({
      missions,
      currentUser,
      addMission,
      cancelMission,
      setCurrentUser,
      clearCurrentUser,
    }),
    [missions, currentUser]
  );

  return (
    <MissionContext.Provider value={value}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error(
      "useMission deve ser usado dentro de MissionProvider"
    );
  }

  return context;
}
