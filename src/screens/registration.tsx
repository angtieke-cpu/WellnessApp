import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegistrationScreen() {
  const navigation = useNavigation<NavProp>();
  const [contact, setContact] = useState("");

  const sendOTP = () => {
    // TODO: call OTP API here
    console.log("Trigger OTP API with:", contact);

    navigation.navigate("RegisterOTP", { contact });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register With Your Mail/Phone</Text>

      <TextInput
        placeholder="Email or Phone"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={sendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#E8A6C9",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 16 }
});
