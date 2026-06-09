import { Slot } from 'expo-router';

import { MissionProvider } from '../contexts/MissionContext';

export default function RootLayout() {
  return (
    <MissionProvider>
      <Slot />
    </MissionProvider>
  );
}
