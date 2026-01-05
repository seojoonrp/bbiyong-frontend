// src/components/MyTabBar.tsx

import colors from "@/src/constants/colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HomeIcon from "@/assets/images/icons/bottom-tab/home.svg";
import MyIcon from "@/assets/images/icons/bottom-tab/my.svg";
import SearchIcon from "@/assets/images/icons/bottom-tab/search.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ICON_MAP: Record<string, any> = {
  "search-meetings": SearchIcon,
  "my-meetings": HomeIcon,
  "my-page": MyIcon,
};

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabContainer, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const IconComponent = ICON_MAP[route.name];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.5}
          >
            <IconComponent
              width={24}
              height={24}
              color={isFocused ? colors.main.red : colors.utils.grey}
              strokeWidth={isFocused ? 1.5 : 1}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? colors.main.red : colors.utils.grey,
                  fontFamily: isFocused
                    ? "Pretendard-ExtraBold"
                    : "Pretendard-Regular",
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 16,
    boxShadow: "0 2px 16px 0 rgba(0, 0, 0, 0.1)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    letterSpacing: -0.3,
    marginTop: 4,
  },
});
