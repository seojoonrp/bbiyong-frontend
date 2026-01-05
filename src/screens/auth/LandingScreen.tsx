// src/screens/auth/LandingScreen.tsx

import AppLogo from "@/assets/images/common/logo.svg";
import AppleIcon from "@/assets/images/icons/auth/apple.svg";
import GoogleIcon from "@/assets/images/icons/auth/google.svg";
import KakaoIcon from "@/assets/images/icons/auth/kakao.svg";
import client from "@/src/api/client";
import AuthTextInput from "@/src/components/auth/AuthTextInput";
import RedButton from "@/src/components/auth/RedButton";
import DebugButton from "@/src/components/DebugButton";
import colors from "@/src/constants/colors";
import { authService } from "@/src/services/authService";
import { Provider } from "@/src/types/authType";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { login as kakaoLogin } from "@react-native-seoul/kakao-login";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (username == "" || password == "") return;

    try {
      setLoading(true);

      const response = await authService.login({ username, password });

      if (!response?.user.isProfileSet) {
        router.replace("/(auth)/profile/basic");
      } else {
        router.replace("/(main)/search-meetings");
      }
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      if (data?.idToken) {
        await handleSocialLoginResponse(Provider.Google, data.idToken);
      }
    } catch (error) {
      console.log("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setLoading(true);
      const token = await kakaoLogin();
      if (token?.accessToken) {
        await handleSocialLoginResponse(Provider.Kakao, token.accessToken);
      }
    } catch (error) {
      console.log("Kakao Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        await handleSocialLoginResponse(
          Provider.Apple,
          credential.identityToken
        );
      }
    } catch (error) {
      console.log("Apple Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLoginResponse = async (
    provider: Provider,
    token: string
  ) => {
    const response = await authService.socialLogin(provider, token);

    if (!response?.user.isProfileSet) {
      router.replace("/(auth)/profile/basic");
    } else {
      router.replace("/(main)/search-meetings");
    }
  };

  const [isOnline, setIsOnline] = useState<boolean>(false);
  const checkPing = async () => {
    try {
      const response = await client.get("/ping");
      console.log("Ping response:", response.data);
      setIsOnline(true);
    } catch (error) {
      console.log("Ping error:", error);
      setIsOnline(false);
    }
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <AppLogo width={110} height={136} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {"<"}삐용{">"}
          </Text>
          <Text style={styles.subtitle}>잃어버린 동심 되찾기 프로젝트</Text>
        </View>

        <View style={{ width: "100%", gap: 10 }}>
          <AuthTextInput
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={setUsername}
          />
          <AuthTextInput
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChangeText={setPassword}
            secureOptions={true}
          />

          <RedButton
            title="로그인"
            containerStyles={{ width: "100%", height: 48 }}
            disabled={username === "" || password === ""}
            onPress={handleLogin}
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.registerButtonText}>
            계정이 없으신가요?&nbsp;
            <Text
              style={{
                color: colors.main.red,
                fontFamily: "Pretendard-ExtraBold",
              }}
            >
              회원가입하기
            </Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colors.social.google },
            ]}
            onPress={handleGoogleLogin}
          >
            <GoogleIcon width={22} height={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colors.social.kakao },
            ]}
            onPress={handleKakaoLogin}
          >
            <KakaoIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colors.social.apple },
            ]}
            onPress={handleAppleLogin}
          >
            <AppleIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        <DebugButton index={0} label="Check Ping" onPress={checkPing} />
        <DebugButton
          index={1}
          label="Go to Main"
          onPress={() => router.push("/(main)/search-meetings")}
        />
        <DebugButton
          index={2}
          label="Go to Profile Setup"
          onPress={() => router.push("/(auth)/profile/basic")}
        />
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
    paddingHorizontal: 32,
    gap: 24,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontFamily: "PartialSansKR-Regular",
    color: colors.main.maroon,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.utils.grey,
  },
  registerButtonText: {
    padding: 8,
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.4,
    color: colors.main.maroon,
  },
  socialLoginContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.social.stroke,
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.07)",
    alignItems: "center",
    justifyContent: "center",
  },
});
