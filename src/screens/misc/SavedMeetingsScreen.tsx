// src/screens/misc/SavedMeetingsScreen.tsx

import MiscHeader from "@/src/components/common/MiscHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedMeetingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <MiscHeader title="저장한 모임" />

      <Text>SavedMeetingsScreen</Text>
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
