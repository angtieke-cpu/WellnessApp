import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { Progress } from "../progress";
// import { Progress } from "@/Progress";
import { Progress } from "../progress";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AgeStep"
>;

export default function AgeStep() {
  const navigation = useNavigation<NavigationProp>();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>When was your last period?</Text>
        <Text style={styles.subtitle}>
          This helps calculate your cycle
        </Text>

        <Progress step={3} total={5} />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPicker(true)}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate("Home")}  // ✅ Navigate here
        >
          <Text style={styles.ctaText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  card: {
    backgroundColor: "#F4F3F9",
    borderRadius: 20,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginTop: 15
  },
  cta: {
    marginTop: 20,
    backgroundColor: "rgb(194, 24, 91)",
    padding: 16,
    borderRadius: 18,
    alignItems: "center"
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700"
  }
});
