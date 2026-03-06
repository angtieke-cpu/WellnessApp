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

export default function RegistrationScreen() {
  const navigation = useNavigation<NavProp>();

  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    try {
      setLoading(true);

      const response: any = await fetch(
        "https://her-solace-api.vercel.app/api/auth/signup",
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
        navigation.navigate("RegisterOTP", {
          userDetails: { userId: data.userId, contact: contact }
        });
      } else if (data.message == "User not found, please signup") {
        Alert.alert("Error", data.message);
      } else {
        Alert.alert("Error", data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP API Error:", error);
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

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Register using your mobile number
          </Text>

          {/* INPUT */}

          <TextInput
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
            style={styles.input}
            maxLength={10}
          />

          {/* BUTTON */}

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

          {/* LOGIN LINK */}

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.loginText}>
              Already have an account? Login
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

  loginLink: {
    marginTop: 18
  },

  loginText: {
    color: "#E8A6C9",
    fontSize: 14,
    fontWeight: "600"
  }
});
