// src/screens/misc/CreateMeetingScreen.tsx

import MiscHeader from "@/src/components/common/MiscHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateMeetingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <MiscHeader title="모임 만들기" />

      <Text>CreateMeetingScreen</Text>
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
