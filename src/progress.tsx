import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  step: number;
  total: number;
};

export function Progress({ step, total }: Props) {
  const progressPercent = (step / total) * 100;

  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${progressPercent}%` }
          ]}
        />
      </View>

      <Text style={styles.label}>
        Step {step} of {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16
  },
  track: {
    height: 4,
    backgroundColor: "#E5E1EA",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8
  },
  fill: {
    height: "100%",
    backgroundColor: "#ddb4ba"
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    color: "#7C6B78"
  }
});
