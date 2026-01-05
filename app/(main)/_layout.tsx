// app/(main)/_layout.tsx

import MyTabBar from "@/src/components/main/TabBar";
import { Tabs } from "expo-router";

export default function MainScreenLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="search-meetings" options={{ title: "모임 검색" }} />
      <Tabs.Screen name="my-meetings" options={{ title: "내 모임" }} />
      <Tabs.Screen name="my-page" options={{ title: "마이페이지" }} />
    </Tabs>
  );
}
