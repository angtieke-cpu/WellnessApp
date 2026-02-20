import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  // SafeAreaView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
// import { theme } from "@/theme";
import { theme } from "../theme";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        {/* Logo / Title */}
        <View style={styles.header}>
          <Text style={styles.logo}>🌸</Text>
          <Text style={styles.title}>Hello, Emma</Text>
          <Text style={styles.subtitle}>
            Your personal cycle companion
          </Text>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="you@example.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="••••••••"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.primaryBtn} onPress={onLogin}>
          <Text style={styles.primaryText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.divider}>or</Text>

        {/* Social Buttons */}
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Don’t have an account?{" "}
          <Text style={styles.link}>Sign up</Text>
        </Text>
      </Card>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: "center",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center"
  },
  header: {
    alignItems: "center",
    marginBottom: 24
  },
  logo: {
    fontSize: 40
  },
  title: {
    color: theme.text,
    fontWeight: "600",
    fontSize: 20,
    marginTop: 6
  },
  subtitle: {
    color: theme.muted,
    fontSize: 14,
    marginTop: 4
  },
  inputGroup: {
    marginBottom: 12
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14
  },
  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    backgroundColor: theme.primary,
    alignItems: "center",
    marginBottom: 12
  },
  primaryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600"
  },
  secondaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 8
  },
  divider: {
    textAlign: "center",
    color: theme.muted,
    marginVertical: 12
  },
  footer: {
    marginTop: 12,
    fontSize: 13,
    textAlign: "center",
    color: theme.muted
  },
  link: {
    color: theme.primary,
    fontWeight: "600"
  }
});
