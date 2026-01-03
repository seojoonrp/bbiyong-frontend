// src/screens/auth/profile/BasicInfoScreen.tsx

import AuthTextInput from "@/src/components/auth/AuthTextInput";
import RedButton from "@/src/components/common/RedButton";
import DebugButton from "@/src/components/DebugButton";
import colors from "@/src/constants/colors";
import { useAuthStore } from "@/src/stores/authStore";
import { Gender } from "@/src/types/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasicInfoScreen() {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [nickname, setNickname] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.Undefined);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  useEffect(() => {
    if (nickname !== "" && gender !== Gender.Undefined) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [nickname, age, gender]);

  const handleNext = () => {
    updateUser({
      nickname: nickname,
      age: Number(age),
      gender: gender,
    });
    router.push("/(auth)/profile/location");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>삐용에 오신 것을 환영합니다!</Text>
        <Text style={styles.subtitleText}>
          시작하기 전 몇 가지 정보를 수집할게요
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitleText}>닉네임</Text>
          <AuthTextInput
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitleText}>나이</Text>
          <AuthTextInput
            placeholder="나이를 입력해주세요"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitleText}>성별</Text>
          <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                {
                  backgroundColor:
                    gender === Gender.Male
                      ? colors.main.maroon
                      : colors.main.white,
                },
              ]}
              onPress={() => setGender(Gender.Male)}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  {
                    color:
                      gender === Gender.Male
                        ? colors.main.white
                        : colors.main.maroon,
                  },
                ]}
              >
                남성
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                {
                  backgroundColor:
                    gender === Gender.Female
                      ? colors.main.maroon
                      : colors.main.white,
                },
              ]}
              onPress={() => setGender(Gender.Female)}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  {
                    color:
                      gender === Gender.Female
                        ? colors.main.white
                        : colors.main.maroon,
                  },
                ]}
              >
                여성
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <RedButton
          containerStyles={{ paddingHorizontal: 20, height: 48, marginTop: 32 }}
          title="다음으로"
          onPress={handleNext}
          disabled={!isComplete}
        />

        <DebugButton
          label="Fill test info"
          index={0}
          onPress={() => {
            setNickname("TestUser");
            setAge("22");
            setGender(Gender.Male);
          }}
        />
        <DebugButton label="Go back" index={1} onPress={router.back} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.white,
    paddingHorizontal: 48,
    gap: 32,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.red,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.utils.grey,
    textAlign: "center",
    marginTop: -20,
  },
  fieldContainer: {
    width: "100%",
    gap: 8,
  },
  fieldTitleText: {
    fontSize: 18,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.maroon,
    marginLeft: 2,
  },
  genderButton: {
    width: "48%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: colors.main.maroon,
    borderWidth: 1,
  },
  genderButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    marginTop: 32,
    gap: 12,
  },
});
