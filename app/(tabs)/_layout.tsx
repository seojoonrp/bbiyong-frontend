import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="search-meetings" options={{ title: "모임 검색" }} />
      <Tabs.Screen name="my-meetings" options={{ title: "내 모임" }} />
      <Tabs.Screen name="menu" options={{ title: "메뉴" }} />
    </Tabs>
  );
}
