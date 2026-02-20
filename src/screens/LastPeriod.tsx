import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LastPeriod"
>;

export default function LastPeriodStep() {
  const navigation = useNavigation<NavigationProp>();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const formattedDate = date.toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>When was your last period?</Text>
        <Text style={styles.subtitle}>
          This helps calculate your cycle
        </Text>

        <Text style={styles.progress}>Step 3 of 5</Text>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>{formattedDate}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}

        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate("CycleLength")}
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
    backgroundColor: "#fdf6f9",
    justifyContent: "center",
    padding: 20
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20
  },
  progress: {
    fontSize: 13,
    color: "#ff5c8a",
    marginBottom: 20
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    marginBottom: 24
  },
  dateText: {
    fontSize: 16
  },
  cta: {
    backgroundColor: "#ff5c8a",
    padding: 16,
    borderRadius: 16,
    alignItems: "center"
  },
  ctaText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
  }
});
