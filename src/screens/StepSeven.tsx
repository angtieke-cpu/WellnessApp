import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Progress } from "../progress";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StepSeven"
>;

const OPTIONS = [
"PCOS",
  "Endometriosis",
  "Thyroid Issues",
  "Chronic Fatigue",
  "Diabetes",
  "Irregular Cycles",
  "Perimenopause",
  "None"
];

export default function StepSix() {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else if (selected.length < 3) {
      setSelected([...selected, item]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your Top 3 Wellness Goals</Text>
        <Text style={styles.subtitle}>
          Choose up to 3 goals you want to focus on
        </Text>

        <Progress step={7} total={8} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {OPTIONS.map(option => {
              const isSelected = selected.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected
                  ]}
                  onPress={() => toggleSelect(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StepEight")}
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
    backgroundColor: "#a995ae",
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#F7F4F8",
    borderRadius: 20,
    padding: 24,
    elevation: 5
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 6,
    color: "#2B2B2B"
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 16
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E2DCE6",
    backgroundColor: "#ffffff",
    margin: 6
  },
  optionSelected: {
    backgroundColor: "rgb(219, 188, 191)",
    borderColor: "rgb(219, 188, 191)"
  },
  optionText: {
    fontSize: 14,
    color: "#444"
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "500"
  },
  button: {
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "rgb(219, 188, 191)",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  }
});
