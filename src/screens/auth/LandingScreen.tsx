import client from "@/src/api/client";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LandingScreen() {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const checkPing = async () => {
    try {
      const response = await client.get("/ping");
      setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>삐용</Text>
      <Text style={styles.subtitle}>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
});
