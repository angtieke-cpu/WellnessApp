import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import HormoneGraph from "./graph";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";

/* ================================
   INFO CARD
================================ */

type InfoCardProps = {
  title: string;
  value: string;
  sub: string;
};
  

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  sub,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>

      <Text style={styles.cardValue}>{value}</Text>

      <Text style={styles.cardSub}>{sub}</Text>
    </View>
  );
};

/* ================================
   SMALL CARD
================================ */

type SmallCardProps = {
  title: string;
  desc: string;
};

const SmallCard: React.FC<SmallCardProps> = ({
  title,
  desc,
}) => {
  return (
    <View style={styles.smallCard}>
      <Text style={styles.smallTitle}>{title}</Text>
      <Text style={styles.smallDesc}>{desc}</Text>
    </View>
  );
};

/* ================================
   MAIN SCREEN
================================ */

const HormoneDashboard: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
      <View style={{ flex: 1 }}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 90 }}
      showsVerticalScrollIndicator={false}
    >
      {/* GRAPH CARD */}

      <View style={styles.graphCard}>
        <Text style={styles.dayTitle}>
          Day 22 • Luteal Phase
        </Text>

        <Text style={styles.subtitle}>
          Progesterone dominant • Emotional sensitivity may
          increase.
        </Text>

        <View style={styles.graphWrapper}>
          <HormoneGraph />
        </View>
      </View>

      {/* INFO GRID */}

      <View style={styles.grid}>
        <InfoCard
          title="Energy ✨"
          value="Moderate"
          sub="Progesterone dominant"
        />

        <InfoCard
          title="Mood 😊"
          value="Sensitive"
          sub="Late luteal phase detected"
        />

        <InfoCard
          title="Anxiety 🌿"
          value="Slightly Elevated"
          sub="Common before period"
        />

        <InfoCard
          title="Social 🤝"
          value="Low Drive"
          sub="Plan lighter conversations"
        />
      </View>

      {/* LOG BUTTON */}

      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logText}>
          ＋ Log Your Symptoms
        </Text>
      </TouchableOpacity>

      {/* BOTTOM INSIGHTS */}

      <View style={styles.bottomRow}>
        <SmallCard
          title="Nutrition"
          desc="Magnesium-rich foods may help."
        />

        <SmallCard
          title="Movement"
          desc="Try a gentle walk or stretching."
        />

        <SmallCard
          title="Mindful Insight"
          desc="Reflective time before your cycle."
        />
      </View>
    </ScrollView>
   
    <BottomNav active="HomeDashboard" onChange={(route) => navigation.navigate(route)} />
      </View>
  );
};

export default HormoneDashboard;

/* ================================
   STYLES
================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1fa",
    padding: 16,
  },

  /* GRAPH CARD */

  graphCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 22,
    elevation: 6,
    overflow: "hidden",
  },

  graphWrapper: {
    height: 200,
    justifyContent: "center",
    marginTop: 10,
  },

  dayTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5e4b8b",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    marginBottom: 10,
  },

  /* GRID */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  /* INFO CARD */

  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 12,
    color: "#a79bc8",
    marginBottom: 6,
  },

  cardValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3f3a56",
  },

  cardSub: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
  },

  /* LOG BUTTON */

  logButton: {
    backgroundColor: "#c27ba0",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 24,
    elevation: 4,
  },

  logText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  /* BOTTOM CARDS */

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "32%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    elevation: 3,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    color: "#4b3f72",
  },

  smallDesc: {
    fontSize: 11,
    color: "#777",
  },
});
