// src/components/auth/AuthTextInput.tsx

import EyeCloseIcon from "@/assets/images/icons/auth/eye-closed.svg";
import EyeOpenIcon from "@/assets/images/icons/auth/eye-open.svg";
import colors from "@/src/constants/colors";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface AuthTextInputProps {
  containerStyles?: object;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  secureOptions?: boolean;
}

export default function AuthTextInput(props: AuthTextInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(!props.secureOptions);

  return (
    <View style={[styles.container, props.containerStyles]}>
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        secureTextEntry={!isVisible}
      />
      {props.secureOptions && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeOpenIcon width={20} height={20} />
          ) : (
            <EyeCloseIcon width={20} height={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.main.maroon,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 48,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.maroon,
  },
  iconButton: {
    marginLeft: 12,
  },
});
