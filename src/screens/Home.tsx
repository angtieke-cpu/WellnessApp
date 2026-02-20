import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

export default function Home() {
  const cycleLength = 28;
  const cycleDay = 8;
  // const ovulationDay = 14;

  const [open, setOpen] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO CARD */}
      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <Text style={styles.heroTitle}>Follicular Phase</Text>

          <TouchableOpacity
            style={styles.logButton}
            onPress={() => setOpen(true)}
          >
            <Text style={{ color: "#fff" }}>Log</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heroSub}>
          Day {cycleDay} of {cycleLength} • Energy rising • Focus & strength peak
        </Text>

        <View style={styles.phaseRow}>
          <Phase label="Flow" />
          <Phase label="Seed" active />
          <Phase label="Bloom" />
          <Phase label="Moon" />
        </View>
      </View>

      {/* TODAY SECTION */}
      <Text style={styles.section}>Today</Text>

      <View style={styles.metricGrid}>
        <Metric label="Energy" value="High • 85%" />
        <Metric label="Mood" value="😊 Energized" />
        <Metric label="Sleep" value="7.5 hrs" />
        <Metric label="Hydration" value="2.1 L" />
      </View>

      {/* HEALTH SLIDER */}
      <Text style={styles.section}>Health Signals</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <MiniMetric label="Heart Rate" value="62 bpm" />
        <MiniMetric label="Body Temp" value="36.4°C" />
        <MiniMetric label="Stress" value="Low" />
        <MiniMetric label="Recovery" value="Optimal" />
        <MiniMetric label="Focus" value="High" />
        <MiniMetric label="Libido" value="Moderate ↑" />
      </ScrollView>

      {/* WHAT'S NEXT */}
      <Text style={styles.section}>What’s Next</Text>

      <NextCard icon="🌸" title="Ovulation Window" subtitle="In 6 days" />
      <NextCard icon="💪" title="Best Workouts" subtitle="HIIT & Strength" />
      <NextCard icon="🥗" title="Nutrition Focus" subtitle="Protein & Iron" />

      {/* MODAL */}
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Log Cycle
            </Text>

            <TouchableOpacity
              style={[styles.logButton, { marginTop: 20 }]}
              onPress={() => setOpen(false)}
            >
              <Text style={{ color: "#fff" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ label, value }: any) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={{ fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

function MiniMetric({ label, value }: any) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={{ fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

function Phase({ label, active }: any) {
  return (
    <View
      style={[
        styles.phase,
        {
          backgroundColor: active ? "#fff" : "rgba(255,255,255,0.3)",
        },
      ]}
    >
      <Text style={{ color: active ? "#8f6aa8" : "#fff" }}>
        {label}
      </Text>
    </View>
  );
}

function NextCard({ icon, title, subtitle }: any) {
  return (
    <View style={styles.nextCard}>
      <View style={styles.nextIcon}>
        <Text>{icon}</Text>
      </View>
      <View>
        <Text style={{ fontWeight: "700" }}>{title}</Text>
        <Text style={{ fontSize: 12, opacity: 0.7 }}>{subtitle}</Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  heroCard: {
    backgroundColor: "rgb(225, 184, 190)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },

  heroSub: {
    fontSize: 13,
    marginTop: 6,
    color: "#fff",
  },

  phaseRow: {
    flexDirection: "row",
    marginTop: 14,
  },

  phase: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },

  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  metricCard: {
    width: "48%",
    backgroundColor: "rgb(225, 184, 190)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },

  metricLabel: {
    fontSize: 12,
    color: "#555",
  },

  miniCard: {
    width: 140,
    backgroundColor: "#f4f3f9",
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
  },

  nextCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(225, 184, 190)",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },

  nextIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e5d8ec",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  logButton: {
    backgroundColor: "#8f6aa8",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#fff5f7",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
});