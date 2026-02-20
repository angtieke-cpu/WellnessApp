import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, "OTP">;

export default function OTPScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();

  const [otp, setOtp] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setOtp(text);
    }
  };

  const verifyOTP = () => {
    console.log("Verify OTP:", otp);
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Sent to {route.params.contact}</Text>

      {/* OTP BOXES */}
      <Pressable
        style={styles.otpContainer}
        onPress={() => inputRef.current?.focus()}
      >
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.otpBox,
              otp.length === index && styles.activeBox,
            ]}
          >
            <Text style={styles.otpText}>
              {otp[index] ? otp[index] : ""}
            </Text>
          </View>
        ))}
      </Pressable>

      {/* Hidden Input */}
      <TextInput
        ref={inputRef}
        value={otp}
        onChangeText={handleChange}
        maxLength={6}
        keyboardType="number-pad"
        style={styles.hiddenInput}
      />

      <TouchableOpacity
        style={[
          styles.button,
          otp.length !== 6 && { opacity: 0.5 },
        ]}
        disabled={otp.length !== 6}
        onPress={verifyOTP}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginVertical: 10,
    color: "#666",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  otpBox: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  activeBox: {
    borderColor: "#E8A6C9",
  },
  otpText: {
    fontSize: 20,
    fontWeight: "600",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
  },
  button: {
    backgroundColor: "#E8A6C9",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
