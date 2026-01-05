// app/(misc)/_layout.tsx

import { Stack } from "expo-router";

export default function MiscLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-meeting" />
      <Stack.Screen name="saved-meetings" />
      <Stack.Screen name="participant-profile" />
    </Stack>
  );
}
