import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {

  const navigation = useNavigation<NavProp>();

  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {

    if (!contact) {
      Alert.alert("Error", "Please enter phone number");
      return;
    }

    try {

      setLoading(true);

      const response: any = await fetch(
        "https://her-solace-api.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            mobileNumber: Number(contact)
          })
        }
      );

      const data = await response.json();

      if (data?.success) {

        navigation.navigate("OTP", {
          userDetails: { userId: data.userId, contact: contact }
        });

      } else if (data.message === "User not found, please signup") {

        Alert.alert("User not found", "Please create an account");

        navigation.navigate("RegistrationScreen");

      } else {

        Alert.alert("Error", data.message || "Failed to send OTP");

      }

    } catch (error) {

      console.log(error);
      Alert.alert("Error", "Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <LinearGradient colors={["#F9E7F0", "#E8A6C9"]} style={styles.gradient}>

      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>

        <View style={styles.card}>

          <Text style={styles.logo}>🌸</Text>

          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Login using your mobile number
          </Text>

          <TextInput
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
            style={styles.input}
            maxLength={10}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={sendOTP}
            disabled={loading}
          >

            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Text style={styles.registerText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  gradient: {
    flex: 1
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12
  },

  logo: {
    fontSize: 38,
    marginBottom: 10
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#E8A6C9"
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    marginBottom: 26
  },

  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#E8A6C9",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    fontSize: 16,
    marginBottom: 20
  },

  button: {
    width: "100%",
    backgroundColor: "#E8A6C9",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },

  registerLink: {
    marginTop: 18
  },

  registerText: {
    color: "#E8A6C9",
    fontSize: 14,
    fontWeight: "600"
  }

});