// app/(auth)/_layout.tsx

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="profile/basic" />
      <Stack.Screen name="profile/location" />
      <Stack.Screen name="profile/image" />
      <Stack.Screen name="profile/ready" />
    </Stack>
  );
}
