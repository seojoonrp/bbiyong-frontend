// src/screens/misc/ParticipantProfileScreen.tsx

import MiscHeader from "@/src/components/common/MiscHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ParticipantProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <MiscHeader title="참가자 프로필" />

      <Text>ParticipantProfileScreen</Text>
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
