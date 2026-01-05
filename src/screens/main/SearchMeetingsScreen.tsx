// src/screens/main/SearchMeetingsScreen.tsx

import MainIcon from "@/assets/images/icons/main/search/main.svg";
import PlusIcon from "@/assets/images/icons/main/search/plus.svg";
import SearchBar from "@/src/components/common/SearchBar";
import colors from "@/src/constants/colors";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchMeetingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState<string>("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <MainIcon width={36} height={36} />
            <Text style={styles.titleText}>동네 모임 찾기</Text>
          </View>
          <View style={styles.headerButtonRow}>
            <SearchBar
              placeholder="검색어를 입력하세요..."
              value={searchText}
              onChangeText={setSearchText}
              containerStyles={{ height: "100%", flexGrow: 1 }}
            />
            <TouchableOpacity style={styles.newMeetingButton}>
              <PlusIcon width={18} height={18} />
              <Text style={styles.newMeetingButtonText}>새 모임 만들기</Text>
            </TouchableOpacity>
          </View>
          {/* TODO : 드랍다운 */}
        </View>

        {/* <DebugButton
        index={0}
        label="Go to Landing"
        onPress={() => router.replace("/")}
          /> */}
      </View>
    </TouchableWithoutFeedback>
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
  header: {
    width: "100%",
    paddingBottom: 8,
    backgroundColor: colors.main.white,
    gap: 10,
    zIndex: 9999,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 2,
  },
  titleText: {
    fontSize: 30,
    fontFamily: "GumiRomance",
    letterSpacing: -1.2,
    color: colors.main.red,
  },
  headerButtonRow: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  newMeetingButton: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: colors.main.red,
    borderRadius: 16,
  },
  newMeetingButtonText: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
});
