import colors from "@/src/constants/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RedButtonProps {
  containerStyles?: object;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function RedButton({
  title,
  onPress,
  containerStyles,
  disabled,
}: RedButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        containerStyles,
        {
          backgroundColor: disabled
            ? colors.utils.disabled_grey
            : colors.main.red,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main.red,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.main.white,
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
  },
});
