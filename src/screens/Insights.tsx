import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

/* ================= MOCK CYCLE PHASE ================= */
const cyclePhase = "Follicular";

/* ================= MEAL SUGGESTIONS ================= */
const MEALS = {
  Breakfast: {
    icon: "🌿",
    suggestion: "Oatmeal with berries & nuts",
    macros: "Carbs: 30g • Protein: 15g • Fat: 10g",
  },
  Lunch: {
    icon: "🥗",
    suggestion: "Baked salmon & veggies",
    macros: "Carbs: 25g • Protein: 30g • Fat: 15g",
  },
  Dinner: {
    icon: "🍗",
    suggestion: "Grilled chicken & greens",
    macros: "Carbs: 20g • Protein: 35g • Fat: 12g",
  },
};

export default function Insights(){
  const [inputs, setInputs] = useState<Record<string, string>>({
    Breakfast: "",
    Lunch: "",
    Dinner: "",
  });

  const [hydration, setHydration] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [currentDate] = useState<Date>(new Date());

  /* ================= SCORE CALC ================= */
  useEffect(() => {
    let base = 40;

    Object.values(inputs).forEach((v) => {
      if (v.length > 3) base += 15;
    });

    base += hydration * 2;
    setScore(Math.min(100, base));
  }, [inputs, hydration]);

  return (
    <ScrollView style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today’s Plan</Text>
          <Text style={styles.muted}>Cycle Phase: {cyclePhase}</Text>
        </View>
        <Text style={styles.date}>{formatDate(currentDate)}</Text>
      </View>

      {/* ================= SCORE ================= */}
      <View style={styles.scoreCard}>
        <Text>XI Diet Score</Text>
        <Text style={styles.scoreText}>{score}% Achieved</Text>

        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${score}%` }]} />
        </View>
      </View>

      {/* ================= MEALS ================= */}
      <Text style={styles.section}>What did you eat today?</Text>

      {Object.entries(MEALS).map(([meal, data]) => (
        <View key={meal} style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealIcon}>{data.icon}</Text>
            <Text style={styles.mealTitle}>{meal}</Text>
          </View>

          <Text style={styles.suggestion}>{data.suggestion}</Text>
          <Text style={styles.macros}>{data.macros}</Text>

          <TextInput
            placeholder={`e.g. ${data.suggestion}`}
            value={inputs[meal]}
            onChangeText={(text) =>
              setInputs({ ...inputs, [meal]: text })
            }
            style={styles.input}
          />
        </View>
      ))}

      {/* ================= HYDRATION ================= */}
      <View style={styles.hydrationCard}>
        <View style={styles.hydrationHeader}>
          <Text style={{ fontSize: 22 }}>💧</Text>
          <View>
            <Text style={styles.mealTitle}>Hydration Tips</Text>
            <Text style={styles.muted}>
              Drink 8 glasses daily. Carry a reusable bottle.
            </Text>
          </View>
        </View>

        <View style={styles.waterRow}>
          {[...Array(8)].map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setHydration(i + 1)}
              style={[
                styles.water,
                {
                  backgroundColor:
                    i < hydration
                      ? "rgb(194, 24, 91)"
                      : "rgb(244, 243, 249)",
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* ================= MONTHLY ================= */}
      <View style={styles.monthly}>
        <Text style={styles.section}>Monthly Nutrition Overview</Text>

        <View style={styles.monthRow}>
          {["W1", "W2", "W3", "W4"].map((w, i) => (
            <View key={w} style={styles.week}>
              <View
                style={[
                  styles.weekBar,
                  { height: `${60 + i * 10}%` },
                ]}
              />
              <Text style={{ fontSize: 11 }}>{w}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ================= CTA ================= */}
      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>Submit & Get Score</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  muted: {
    fontSize: 12,
    opacity: 0.7,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  scoreCard: {
    backgroundColor: "rgb(225, 184, 190)",
    borderRadius: 22,
    padding: 16,
    marginTop: 12,
  },
  scoreText: {
    fontWeight: "bold",
    marginTop: 4,
  },
  bar: {
    height: 10,
    backgroundColor: "rgb(244, 243, 249)",
    borderRadius: 10,
    marginTop: 8,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "rgb(194, 24, 91)",
  },
  section: {
    marginTop: 20,
    fontWeight: "bold",
  },
  mealCard: {
    backgroundColor: "rgb(225, 184, 190)",
    borderRadius: 22,
    padding: 16,
    marginTop: 12,
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  mealTitle: {
    fontWeight: "bold",
  },
  suggestion: {
    fontSize: 13,
    marginTop: 6,
  },
  macros: {
    fontSize: 11,
    opacity: 0.7,
  },
  input: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgb(244, 243, 249)",
  },
  hydrationCard: {
    backgroundColor: "rgb(225, 184, 190)",
    borderRadius: 22,
    padding: 16,
    marginTop: 16,
  },
  hydrationHeader: {
    flexDirection: "row",
    gap: 10,
  },
  waterRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  water: {
    width: 22,
    height: 36,
    borderRadius: 6,
    marginRight: 6,
  },
  monthly: {
    backgroundColor: "rgb(225, 184, 190)",
    borderRadius: 22,
    padding: 16,
    marginTop: 16,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  week: {
    flex: 1,
    alignItems: "center",
  },
  weekBar: {
    width: "100%",
    backgroundColor: "rgb(194, 24, 91)",
    borderRadius: 10,
  },
  cta: {
    marginTop: 20,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgb(194, 24, 91)",
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

/* ================= FORMAT DATE ================= */

function formatDate(date: Date): string {
  return date.toDateString();
}
