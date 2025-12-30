// src/screens/auth/profile/LocationInfoScreen.tsx

import DebugButton from "@/src/components/DebugButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationInfoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text>LocationInfoScreen</Text>

      <DebugButton
        index={0}
        label="Go to Ready"
        onPress={() => router.replace("/(auth)/profile/ready")}
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
