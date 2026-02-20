import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  // SafeAreaView,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function Profile() {
  const [open, setOpen] = useState<string | null>("mother");
  const [anonymous, setAnonymous] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  const toggleCard = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === key ? null : key);
  };

  const renderProfileCard = (
    key: string,
    title: string,
    subtitle: string,
    details: Record<string, string>
  ) => {
    const active = open === key;

    return (
      <View style={[styles.card, active && styles.cardActive]}>
        <TouchableOpacity
          style={styles.profileRow}
          onPress={() => toggleCard(key)}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{title[0]}</Text>
          </View>

          <View>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <Text style={styles.arrow}>{active ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {active && (
          <View style={styles.detailsBox}>
            {Object.entries(details).map(([k, v]) => (
              <View key={k} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{k}</Text>
                <Text style={styles.detailValue}>{v}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderToggle = (
    label: string,
    value: boolean,
    setter: (v: boolean) => void
  ) => (
    <TouchableOpacity
      style={styles.toggleRow}
      onPress={() => setter(!value)}
    >
      <Text>{label}</Text>
      <View
        style={[
          styles.toggleTrack,
          { backgroundColor: value ? "#C2185B" : "#DDD" }
        ]}
      >
        <View
          style={[
            styles.toggleThumb,
            { transform: [{ translateX: value ? 18 : 0 }] }
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* HEADER */}
        <View style={styles.headerCard}>
          <Image
            source={require("../assets/well_logo.jpeg")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Her Solace</Text>
          <Text style={styles.headerSubtitle}>
            Decode Hormones - Discover You
          </Text>
          <Text style={styles.headerSmall}>
            Hormonal Intelligence for Every Stage
          </Text>
        </View>

        {/* PROFILES */}
        {renderProfileCard("mother", "Sarah", "Self", {
          Age: "32 years",
          "Cycle Length": "28 days",
          "Last Period": "15 days ago",
          "Cycle Status": "Regular"
        })}

        {renderProfileCard("daughter", "Lily", "Daughter • Age 13", {
          Age: "13 years",
          "Cycle Stage": "Menarche",
          Tracking: "Education mode",
          Status: "Monitoring"
        })}

        {/* SETTINGS */}
        <View style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Settings</Text>

          {renderToggle("Anonymous Mode", anonymous, setAnonymous)}
          {renderToggle("Notifications", notifications, setNotifications)}
          {renderToggle("Privacy Mode", privacy, setPrivacy)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  headerCard: {
    backgroundColor: "rgb(225,184,190)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16
  },
  logoImage: {
    height: 60,
    width: 60,
    marginBottom: 8
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 4
  },
  headerSmall: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.85,
    marginTop: 4
  },

  card: {
    backgroundColor: "#e1b8be",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16
  },
  cardActive: {
    elevation: 6
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3C9DC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  avatarText: {
    fontWeight: "700",
    color: "#C2185B"
  },

  name: {
    fontWeight: "700",
    color: "#fff"
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9
  },
  arrow: {
    marginLeft: "auto",
    color: "#fff"
  },

  detailsBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)"
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  detailLabel: {
    fontSize: 13,
    color: "#fff"
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff"
  },

  settingsCard: {
    backgroundColor: "#f4f3f9",
    borderRadius: 20,
    padding: 16
  },
  settingsTitle: {
    fontWeight: "700",
    marginBottom: 12
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12
  },

  toggleTrack: {
    width: 36,
    height: 18,
    borderRadius: 999,
    justifyContent: "center"
  },

  toggleThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff",
    marginLeft: 2
  }
});
