// app/(main)/_layout.tsx

import TabBar from "@/src/components/common/TabBar";
import { Tabs } from "expo-router";

export default function MainScreenLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="search-meetings" options={{ title: "모임 검색" }} />
      <Tabs.Screen name="my-meetings" options={{ title: "내 모임" }} />
      <Tabs.Screen name="my-page" options={{ title: "마이페이지" }} />
    </Tabs>
  );
}
