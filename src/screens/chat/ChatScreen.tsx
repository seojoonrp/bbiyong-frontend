// src/screens/chat/ChatScreen.tsx

import DebugButton from "@/src/components/DebugButton";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text>ChatScreen</Text>

      <DebugButton
        index={0}
        label="Go to Landing"
        onPress={() => router.replace("/")}
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
