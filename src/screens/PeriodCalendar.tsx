import React, { useMemo, useState,useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { format, subDays, eachDayOfInterval } from "date-fns";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PeriodCalendar() {

  const navigation = useNavigation<any>();
  const [calenderData, setcalenderData] = useState<any>(null);
useEffect(() => {
  getcalenderData();
}, []);
const getcalenderData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      "https://her-solace-api.vercel.app/api/journey/cycle-details",
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
      setcalenderData(result);
      console.log("Home Data:", result);
    } else {
      console.log("API Error");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

  // const [lastPeriod] = useState(new Date("2026-03-04"));
  // const [cycleLength] = useState(28);
  const [lastPeriod, setLastPeriod] = useState<Date | any>(null);
const [cycleLength, setCycleLength] = useState<number>(28);
 setLastPeriod(new Date(calenderData.lastPeriodDate));
  setCycleLength(calenderData.cycleLength);
  const [periodLength] = useState(5);

  const today = new Date();

  const diffTime = today.getTime() - lastPeriod.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const currentCycleDay = (diffDays % cycleLength) + 1;

  const getDate = (date: Date) => date.toISOString().split("T")[0];

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const marked: any = {};

  /* ---------- 5 MONTH PREDICTION ---------- */

  for (let cycle = 0; cycle < 5; cycle++) {

    const cycleStart = addDays(lastPeriod, cycle * cycleLength);

    // PERIOD
    for (let i = 0; i < periodLength; i++) {
      const d = addDays(cycleStart, i);

      marked[getDate(d)] = {
        customStyles: {
          container: {
            backgroundColor: "#ff6b6b",
            borderRadius: 20
          },
          text: { color: "white" }
        }
      };
    }

    // OVULATION
    const ovulation = addDays(cycleStart, cycleLength - 14);

    marked[getDate(ovulation)] = {
      customStyles: {
        container: {
          backgroundColor: "#4dabf7",
          borderRadius: 20
        },
        text: { color: "white" }
      }
    };

    // FERTILE WINDOW
    for (let i = -4; i <= 1; i++) {
      const d = addDays(ovulation, i);

      if (!marked[getDate(d)]) {
        marked[getDate(d)] = {
          customStyles: {
            container: {
              backgroundColor: "#f6c343",
              borderRadius: 20
            },
            text: { color: "white" }
          }
        };
      }
    }

    // PMS WINDOW
    const nextPeriod = addDays(cycleStart, cycleLength);

    for (let i = -4; i < 0; i++) {
      const d = addDays(nextPeriod, i);

      if (!marked[getDate(d)]) {
        marked[getDate(d)] = {
          customStyles: {
            container: {
              backgroundColor: "#b197fc",
              borderRadius: 20
            },
            text: { color: "white" }
          }
        };
      }
    }
  }

  /* ---------- Cycle Data ---------- */

  const cycleData = useMemo(() => {

    const ovulation = addDays(lastPeriod, cycleLength - 14);
    const fertileStart = subDays(ovulation, 4);
    const fertileEnd = addDays(ovulation, 1);

    const nextPeriod = addDays(lastPeriod, cycleLength);

    const pmsStart = subDays(nextPeriod, 5);
    const pmsEnd = subDays(nextPeriod, 1);

    const periodDays = eachDayOfInterval({
      start: lastPeriod,
      end: addDays(lastPeriod, periodLength - 1)
    });

    return {
      ovulation,
      fertileStart,
      fertileEnd,
      nextPeriod,
      pmsStart,
      pmsEnd,
      periodDays
    };

  }, [lastPeriod, cycleLength, periodLength]);

  return (

    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 90 }}
      >

        <Text style={styles.logBtn}>🩸 Log Period</Text>

        <Calendar
          markingType={"custom"}
          markedDates={marked}
          enableSwipeMonths={true}
          renderArrow={(direction) => (
            <Text style={{ fontSize: 22 }}>
              {direction === "left" ? "‹" : "›"}
            </Text>
          )}
          theme={{
            todayTextColor: "#339af0",
            selectedDayBackgroundColor: "#ff6b6b",
            arrowColor: "#333"
          }}
        />

        {/* ---------- Legend ---------- */}

        <View style={styles.legend}>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#ff6b6b" }]} />
            <Text>Period</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#4dabf7" }]} />
            <Text>Ovulation</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#f6c343" }]} />
            <Text>Fertile Window</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#b197fc" }]} />
            <Text>PMS</Text>
          </View>

        </View>

        {/* ---------- Cycle Trends Card ---------- */}

        <View style={styles.trendCard}>

          <Text style={styles.trendTitle}>Cycle Trends</Text>

          <View style={styles.trendRow}>
            <Text style={styles.trendLabel}>Next Period</Text>
            <View style={styles.trendBadge}>
              <Text style={styles.trendBadgeText}>
                {format(cycleData.nextPeriod, "MMM d")}
              </Text>
            </View>
          </View>

          <View style={styles.trendRow}>
            <Text style={styles.trendLabel}>Ovulation Window</Text>
            <View style={styles.trendBadge}>
              <Text style={styles.trendBadgeText}>
                {format(cycleData.fertileStart, "MMM d")} - {format(cycleData.fertileEnd, "MMM d")}
              </Text>
            </View>
          </View>

          <View style={styles.trendRow}>
            <Text style={styles.trendLabel}>Cycle Regularity</Text>
            <View style={styles.trendBadge}>
              <Text style={styles.trendBadgeText}>92% • Consistent</Text>
            </View>
          </View>

          <View style={styles.trendRow}>
            <Text style={styles.trendLabel}>Predicted Mood</Text>
            <View style={styles.trendBadge}>
              <Text style={styles.trendBadgeText}>Stable</Text>
            </View>
          </View>

          <View style={styles.trendRow}>
            <Text style={styles.trendLabel}>PMS Alert</Text>
            <View style={styles.trendBadge}>
              <Text style={styles.trendBadgeText}>
                {format(cycleData.pmsStart, "MMM d")} - {format(cycleData.pmsEnd, "MMM d")}
              </Text>
            </View>
          </View>

        </View>

      </ScrollView>

      <BottomNav
        active="PeriodCalendar"
        onChange={(route) => navigation.navigate(route)}
      />

    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20
  },

  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center"
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6
  },

  logBtn: {
    alignSelf: "center",
    backgroundColor: "#ff6b81",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    color: "white",
    fontWeight: "600",
    marginBottom: 15
  },

  /* Cycle Trends */

  trendCard: {
    marginTop: 25
  },

  trendTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14
  },

  trendRow: {
    backgroundColor: "#E9E3EC",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },

  trendLabel: {
    fontSize: 14,
    color: "#222"
  },

  trendBadge: {
    backgroundColor: "#D3A7AF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15
  },

  trendBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600"
  }

});