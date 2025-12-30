// src/screens/auth/LandingScreen.tsx

import client from "@/src/api/client";
import DebugButton from "@/src/components/DebugButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();

  const [isOnline, setIsOnline] = useState<boolean>(false);
  const checkPing = async () => {
    try {
      const response = await client.get("/ping");
      console.log("Ping response:", response.data);
      setIsOnline(true);
    } catch (error) {
      console.error("Ping error:", error);
      setIsOnline(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>LandingScreen</Text>

      <DebugButton index={0} label="Check Ping" onPress={checkPing} />
      <DebugButton
        index={1}
        label="Go to Register"
        onPress={() => router.push("/register")}
      />
      <DebugButton
        index={2}
        label="Go to Main"
        onPress={() => router.push("/(main)/search-meetings")}
      />
      <DebugButton
        index={3}
        label="Go to Profile Setup"
        onPress={() => router.push("/(auth)/profile/basic")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
