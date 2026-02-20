import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Progress } from "../progress";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
// import { Progress } from "@/Progress";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DOBStep"
>;

export default function DOBStep() {
  const navigation = useNavigation<NavigationProp>();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your date of birth</Text>
        <Text style={styles.subtitle}>
          We use this to personalize your cycle insights
        </Text>

        <Progress step={2} total={5} />

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShow(true)}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={onChange}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LastPeriod")}
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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5 // Android shadow
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 6,
    color: "#2B2B2B"
  },

  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 20
  },

  dateInput: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2DCE6",
    backgroundColor: "#ffffff"
  },

  button: {
    marginTop: 30,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "rgb(219, 188, 191)",
    alignItems: "center"
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500"
  }
});
