import StaticLineGraph from "../components/StaticLineGraph";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import Svg, { Path, Circle } from "react-native-svg";

/* =====================================================
   Animated Graph Component
===================================================== */

// const AnimatedPath = Animated.createAnimatedComponent(Path);



/* =====================================================
   Info Card Component
===================================================== */

type InfoCardProps = {
  title: string;
  value: string;
  sub: string;
  level: number; // 0 to 1
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  sub,
  level,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSub}>{sub}</Text>

      <View style={styles.sliderWrapper}>
        <View style={styles.sliderTrack} />
        <View
          style={[
            styles.sliderThumb,
            { left: `${Math.min(Math.max(level * 100, 0), 100)}%` },
          ]}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Low</Text>
          <Text style={styles.sliderLabel}>High</Text>
        </View>
      </View>
    </View>
  );
};

/* =====================================================
   Small Card Component
===================================================== */

type SmallCardProps = {
  title: string;
  desc: string;
};

const SmallCard: React.FC<SmallCardProps> = ({ title, desc }) => {
  return (
    <View style={styles.smallCard}>
      <Text style={styles.smallTitle}>{title}</Text>
      <Text style={styles.smallDesc}>{desc}</Text>
    </View>
  );
};

/* =====================================================
   Main Screen
===================================================== */
  const sampleData = [20, 45, 28, 80, 99, 43, 50];

const HormoneDashboard: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* GRAPH CARD */}
      <View style={styles.graphCard}>
        <Text style={styles.dayTitle}>Day 22 • Luteal Phase</Text>
        <Text style={styles.subtitle}>
          Progesterone dominant • Emotional sensitivity may increase.
        </Text>

     <StaticLineGraph data={sampleData} />
      </View>

      {/* GRID */}
      <View style={styles.grid}>
        <InfoCard
          title="Energy ✨"
          value="Moderate"
          sub="Progesterone dominant"
          level={0.5}
        />

        <InfoCard
          title="Mood"
          value="Sensitive"
          sub="Late luteal phase detected"
          level={0.8}
        />

        <InfoCard
          title="Anxiety"
          value="Slightly Elevated"
          sub="Common before period"
          level={0.7}
        />

        <InfoCard
          title="Social ✨"
          value="Low Drive"
          sub="Plan lighter conversations"
          level={0.3}
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logText}>＋ Log Your Symptoms</Text>
      </TouchableOpacity>

      {/* BOTTOM CARDS */}
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
          desc="Reflective time 3 days before period."
        />
      </View>
    </ScrollView>
  );
};

export default HormoneDashboard;

/* =====================================================
   Styles
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3edf7",
    padding: 16,
  },

  graphCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    elevation: 8,
  },

  dayTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5e4b8b",
  },

  subtitle: {
    fontSize: 12,
    color: "#777",
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    elevation: 6,
  },

  cardTitle: {
    fontSize: 12,
    color: "#999",
  },

  cardValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
    color: "#444",
  },

  cardSub: {
    fontSize: 11,
    marginTop: 4,
    color: "#888",
  },

  sliderWrapper: {
    marginTop: 12,
  },

  sliderTrack: {
    height: 4,
    backgroundColor: "#e0cbe8",
    borderRadius: 4,
  },

  sliderThumb: {
    position: "absolute",
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#b39ddb",
  },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  sliderLabel: {
    fontSize: 10,
    color: "#888",
  },

  logButton: {
    backgroundColor: "#c27ba0",
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
    marginVertical: 24,
  },

  logText: {
    color: "#fff",
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "32%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    elevation: 4,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },

  smallDesc: {
    fontSize: 10,
    color: "#777",
  },
});
