import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();
  const [contact, setContact] = useState("");
  // const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!contact) {
      Alert.alert("Error", "Please enter email or phone");
      return;
    }

    try {
      setLoading(true);
      let num:any={
          mobileNumber: Number(contact),
        }
       console.log(num)
      const response:any = await fetch("https://her-solace-api.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: 
        JSON.stringify({
          mobileNumber: Number(contact),
        }),
      });
   

      const data = await response.json();
      

      if (data?.success) {
        console.log("OTP sent:", data);
        navigation.navigate("OTP", { contact });
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

  //  const verifyOTP = async () => {
  //   if (!otp) {
  //     Alert.alert("Error", "Please enter OTP");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     //  console.log(num)
  //     const response:any = await fetch("https://her-solace-api.vercel.app/api/auth/verify_otp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: 
  //       JSON.stringify({
  //         mobileNumber: Number(contact),
  //         purpose:'Login'
  //       }),
  //     });
   

  //     const data = await response.json();
      

  //     if (data?.success) {
  //       console.log("OTP sent:", data);
  //       navigation.navigate("OTP", { contact });
  //     } else {
  //       Alert.alert("Error", data.message || "Failed to send OTP");
  //     }

  //   } catch (error) {
  //     console.error("OTP API Error:", error);
  //     Alert.alert("Error", "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email or Phone"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={sendOTP}>
       {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
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
