// src/screens/auth/profile/ReadyScreen.tsx

import DebugButton from "@/src/components/DebugButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReadyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text>ReadyScreen</Text>

      <DebugButton
        index={0}
        label="Go to Main"
        onPress={() => router.replace("/(main)/search-meetings")}
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
