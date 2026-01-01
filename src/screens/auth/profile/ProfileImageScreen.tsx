// src/screens/auth/profile/ProfileImageScreen.tsx

import RedButton from "@/src/components/common/RedButton";
import colors from "@/src/constants/colors";
import { useAuthStore } from "@/src/stores/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileImageScreen() {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [profileImageURI, setProfileImageURI] = useState<string>("DEFAULT");

  const handleNext = () => {
    updateUser({ profileURI: profileImageURI });
    router.push("/(auth)/profile/ready");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>프로필 이미지를 설정해보세요!</Text>

      <View style={styles.bottomButtonsContainer}>
        <RedButton
          containerStyles={{
            paddingHorizontal: 20,
            height: 48,
            backgroundColor: colors.utils.disabled_grey,
          }}
          title="이전으로"
          onPress={() => router.back()}
        />
        <RedButton
          containerStyles={{ paddingHorizontal: 20, height: 48 }}
          title={profileImageURI === "DEFAULT" ? "건너뛰기" : "다음으로"}
          onPress={handleNext}
        />
      </View>
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
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.maroon,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    marginTop: 32,
    gap: 12,
  },
});
