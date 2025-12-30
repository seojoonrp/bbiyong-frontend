// src/components/DebugButton.tsx

import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface DebugButtonProps {
  label: string;
  onPress: () => void;
  index?: number;
}

export default function DebugButton({
  label,
  onPress,
  index = 0,
}: DebugButtonProps) {
  const topPosition = 80 + index * 50;

  return (
    <TouchableOpacity
      style={[styles.button, { top: topPosition }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 9999,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
