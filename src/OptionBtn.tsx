import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function OptionBtn({
  label,
  selected,
  onPress
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        selected && styles.selectedButton
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<{
  button: ViewStyle;
  selectedButton: ViewStyle;
  text: TextStyle;
  selectedText: TextStyle;
}>({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2DCE6",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "#ddb4ba",
    backgroundColor: "#ddb4ba"
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#3A2D40"
  },
  selectedText: {
    color: "#3A2D40"
  }
});
