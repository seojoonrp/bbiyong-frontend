import NoIcon from "@/assets/images/icons/auth/confirm-no.svg";
import YesIcon from "@/assets/images/icons/auth/confirm-yes.svg";
import colors from "@/src/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface AuthStatusMessageProps {
  okMessage: string;
  errorMessage: string;
  isOk: boolean;
  visible: boolean;
}

export default function AuthStatusMessage(props: AuthStatusMessageProps) {
  return (
    <View style={styles.container}>
      {props.visible &&
        (props.isOk ? (
          <YesIcon width={12} height={12} />
        ) : (
          <NoIcon width={12} height={12} />
        ))}
      <Text style={styles.messageText}>
        {props.visible
          ? props.isOk
            ? props.okMessage
            : props.errorMessage
          : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 4,
  },
  messageText: {
    marginLeft: 4,
    fontSize: 13,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.maroon,
  },
});
