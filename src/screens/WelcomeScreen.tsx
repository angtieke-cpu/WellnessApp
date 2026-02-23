import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <LinearGradient
      colors={["#F9E7F0", "#E8A6C9"]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../assets/well_logo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Her Solace</Text>
          <Text style={styles.subtitle}>
            Decode Hormones — Discover You
          </Text>
          <Text style={styles.smallText}>
            Hormonal Intelligence for Every Stage
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.primaryText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Text style={styles.secondaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  logo: {
    height: 80,
    width: 80,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    // color: "#8f6aa8",
    color: "#E8A6C9",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#444",
    marginTop: 6,
    textAlign: "center",
  },

  smallText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    marginBottom: 30,
    textAlign: "center",
  },

  primaryButton: {
    width: "100%",
    // backgroundColor: "#8f6aa8",
    backgroundColor: "#E8A6C9",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 14,
    elevation: 5,
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 1.5,
    // borderColor: "#8f6aa8",
    borderColor: "#E8A6C9",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  secondaryText: {
    // color: "#8f6aa8",
    color: "#E8A6C9",
    fontSize: 15,
    fontWeight: "600",
  },
});

