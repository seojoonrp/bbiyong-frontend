// src/screens/misc/SavedMeetingsScreen.tsx

import DebugButton from "@/src/components/DebugButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedMeetingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text>SavedMeetingsScreen</Text>

      <DebugButton index={0} label="Go back" onPress={() => router.back()} />
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
