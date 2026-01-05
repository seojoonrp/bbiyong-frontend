// src/components/common/SearchBar.tsx

import SearchIcon from "@/assets/images/icons/common/search.svg";
import colors from "@/src/constants/colors";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  containerStyles?: object;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <View style={[styles.container, props.containerStyles]}>
      <SearchIcon width={20} height={20} />
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.utils.grey,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.maroon,
    marginLeft: 4,
  },
  iconButton: {
    marginLeft: 12,
  },
});
