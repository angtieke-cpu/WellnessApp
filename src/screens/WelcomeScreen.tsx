import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} 
       onPress={() => navigation.navigate("StartJourney")}
      >
        <Text style={styles.outlineText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, marginBottom: 40 },
  button: {
    backgroundColor: "#E8A6C9",
    padding: 14,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15
  },
  buttonText: { color: "#fff", fontSize: 16 },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#E8A6C9",
    padding: 14,
    width: 200,
    borderRadius: 10,
    alignItems: "center"
  },
  outlineText: { color: "#E8A6C9" }
});
