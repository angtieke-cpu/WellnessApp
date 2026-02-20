import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import OptionBtn from "../OptionBtn";
// import { Progress } from "@/Progress";
import { Progress } from "../progress";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import OptionBtn from "../OptionBtn";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CycleLength"
>;

export default function CycleLength() {
  const navigation = useNavigation<NavigationProp>();
  const [length, setLength] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your cycle length?</Text>
        <Text style={styles.subtitle}>Average number of days</Text>

        <Progress step={4} total={5} />

        <View style={styles.grid}>
          {["21–25", "26–30", "31–35", "35+"].map((val) => (
            <OptionBtn
              key={val}
              label={val}
              selected={length === val}
              onPress={() => setLength(val)}  
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !length && styles.disabled]}
          disabled={!length}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F8F9FB"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  button: {
    marginTop: 24,
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center"
  },
  disabled: {
    opacity: 0.5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
