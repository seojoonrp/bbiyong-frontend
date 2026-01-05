// src/components/common/MiscHeader.tsx

import BackIcon from "@/assets/images/icons/common/chevron-left.svg";
import colors from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MiscHeader({ title }: { title: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        paddingTop: insets.top + 8,
        paddingBottom: 8,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{ padding: 8, position: "absolute", left: 2 }}
          onPress={() => router.back()}
          activeOpacity={0.5}
        >
          <BackIcon width={20} height={20} color={colors.main.red} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            fontFamily: "GumiRomance",
            letterSpacing: -1.4,
            color: colors.main.red,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
