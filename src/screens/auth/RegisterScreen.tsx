// src/screens/auth/RegisterScreen.tsx

import AuthStatusMessage from "@/src/components/auth/AuthStatusMessage";
import AuthTextInput from "@/src/components/auth/AuthTextInput";
import RedButton from "@/src/components/common/RedButton";
import colors from "@/src/constants/colors";
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

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [usernameCondition, setUsernameCondition] = useState<boolean>(false);
  const [usernameAvailability, setUsernameAvailability] =
    useState<boolean>(false);
  const [passwordCondition, setPasswordCondition] = useState<boolean>(false);
  const [confirmPasswordCondition, setConfirmPasswordCondition] =
    useState<boolean>(false);

  const [usernameChecked, setUsernameChecked] = useState<boolean>(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  useEffect(() => {
    setIsComplete(
      usernameCondition &&
        usernameAvailability &&
        passwordCondition &&
        confirmPasswordCondition
    );
  }, [
    usernameCondition,
    usernameAvailability,
    passwordCondition,
    confirmPasswordCondition,
  ]);

  useEffect(() => {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    setUsernameCondition(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    setPasswordCondition(passwordRegex.test(password));
  }, [password]);

  useEffect(() => {
    setConfirmPasswordCondition(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        <View>
          <AuthTextInput
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={setUsername}
          />
          <AuthStatusMessage
            okMessage="3자 이상 15자 이하 영문, 숫자"
            errorMessage="3자 이상 15자 이하 영문, 숫자"
            isOk={usernameCondition}
            visible={true}
          />
          <AuthStatusMessage
            okMessage="사용 가능한 아이디입니다."
            errorMessage="중복되는 아이디입니다."
            isOk={usernameAvailability}
            visible={true}
          />

          <AuthTextInput
            containerStyles={{ marginTop: 24 }}
            placeholder="비밀번호를 입력해주세요"
            secureOptions={true}
            value={password}
            onChangeText={setPassword}
          />
          <AuthStatusMessage
            okMessage="영문, 숫자, 특수기호 포함 8자 이상"
            errorMessage="영문, 숫자, 특수기호 포함 8자 이상"
            isOk={passwordCondition}
            visible={true}
          />

          <AuthTextInput
            containerStyles={{ marginTop: 8 }}
            placeholder="비밀번호를 다시 입력해주세요"
            secureOptions={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <AuthStatusMessage
            okMessage="비밀번호가 일치합니다."
            errorMessage="비밀번호가 일치하지 않습니다."
            isOk={confirmPasswordCondition}
            visible={confirmPassword.length > 0}
          />
        </View>

        <RedButton
          title="다음"
          containerStyles={{ width: "100%", height: 48 }}
          disabled={!isComplete}
        />

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.loginButtonText}>
            이미 계정이 있나요?&nbsp;
            <Text style={{ textDecorationLine: "underline" }}>로그인</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: "30%",
    gap: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: "PartialSansKR-Regular",
    color: colors.main.maroon,
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.utils.grey,
  },
});
