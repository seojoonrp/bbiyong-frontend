// src/screens/auth/profile/ReadyScreen.tsx

import RedButton from "@/src/components/common/RedButton";
import colors from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReadyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>프로필 설정이 완료되었습니다!</Text>
      <Text style={styles.subtitleText}>
        입력한 정보는 [설정] 탭에서 {"\n"}언제든 바꿀 수 있어요.
      </Text>

      <RedButton
        containerStyles={{ marginTop: 32, paddingHorizontal: 20, height: 48 }}
        title="시작하기"
        onPress={() => router.push("/(main)/search-meetings")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.white,
    gap: 24,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.maroon,
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.utils.grey,
    textAlign: "center",
  },
});
