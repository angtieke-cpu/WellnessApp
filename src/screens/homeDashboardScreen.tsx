import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const [homeData, setHomeData] = useState<any>(null);
useEffect(() => {
  getHomeData();
}, []);
const getHomeData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      "https://her-solace-api.vercel.app/api/cycle/prediction",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      setHomeData(result.data);
      console.log("Home Data:", result.data);
    } else {
      console.log("API Error");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
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
          Day {homeData?.currentDay}• {homeData?.phase}
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
          value={homeData?.cycleGuide?.energy}
          sub={homeData?.cycleGuide?.physical_state}
        />

        <InfoCard
          title="Mood 😊"
          value={homeData?.cycleGuide?.mood}
          sub={homeData?.cycleGuide?.mental_state}
        />

        <InfoCard
          title="Anxiety 🌿"
          value={homeData?.cycleGuide?.anxiety}
          sub="Common before period"
        />

        <InfoCard
          title="Social 🤝"
          value={homeData?.cycleGuide?.focus}
          sub={homeData?.cycleGuide?.social_drive}
        />
      </View>

      {/* LOG BUTTON */}

      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logText}>
          <Text style={styles.plusSymbol}>＋</Text> Log Your Symptoms
        </Text>
      </TouchableOpacity>

      {/* BOTTOM INSIGHTS */}

      <View style={styles.bottomRow}>
        <SmallCard
          title="Nutrition"
          desc={homeData?.cycleGuide?.nutrients}
        />

        <SmallCard
          title="Movement"
          desc={homeData?.cycleGuide?.physical_state}
        />

        <SmallCard
          title="Mindful Insight"
          desc={homeData?.cycleGuide?.mental_state}
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
  plusSymbol: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#ffffff",
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
