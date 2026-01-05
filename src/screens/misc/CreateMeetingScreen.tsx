// src/screens/misc/CreateMeetingScreen.tsx

import MiscHeader from "@/src/components/common/MiscHeader";
import colors from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function CreateMeetingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MiscHeader title="모임 만들기" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.main.white,
  },
});
