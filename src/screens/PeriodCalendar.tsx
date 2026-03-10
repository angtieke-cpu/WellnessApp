import React, { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { format, subDays, eachDayOfInterval } from "date-fns";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PeriodCalendar() {

  const navigation = useNavigation<any>();

  const [calenderData, setCalenderData] = useState<any>(null);


  const periodLength = 5;

  const today = new Date();

  useEffect(() => {
    getCalendarData();
  }, []);

  const getCalendarData = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "https://her-solace-api.vercel.app/api/cycle/cycle-details",
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
        setCalenderData(result);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  /* ---------- SAFE DATA ---------- */

  const lastPeriod = useMemo(() => {
    if (!calenderData?.lastPeriodDate) {
      return new Date();
    }
    return new Date(calenderData.lastPeriodDate);
  }, [calenderData]);

  const cycleLength = useMemo(() => {
    return calenderData?.cycleLength ?? 28;
  }, [calenderData]);

  /* ---------- CURRENT CYCLE DAY ---------- */

  const diffTime = today.getTime() - lastPeriod.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const currentCycleDay = (diffDays % cycleLength) + 1;
    const [showLogModal, setShowLogModal] = useState(false);

const [selectedDate, setSelectedDate] = useState<Date>(
  lastPeriod
);

  const getDate = (date: Date) => date.toISOString().split("T")[0];

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  /* ---------- CYCLE DATA ---------- */

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

  /* ---------- LOADING SCREEN ---------- */

  if (!calenderData) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading Calendar...</Text>
      </View>
    );
  }

  /* ---------- CALENDAR MARKS ---------- */

  const marked: Record<string, any> = {};

  for (let cycle = 0; cycle < 5; cycle++) {

    const cycleStart = addDays(lastPeriod, cycle * cycleLength);

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

  const savePeriod = async () => {
  try {

    const token = await AsyncStorage.getItem("token");

    const body = {
      periodDate:
        selectedDate.toISOString().split("T")[0]
    };

    const response = await fetch(
      "https://her-solace-api.vercel.app/api/cycle/period-date",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );

    const result = await response.json();

    if (result.success) {
      setShowLogModal(false);

      // refresh calendar
      getCalendarData();
    }

  } catch (err) {
    console.log("Save error", err);
  }
};



  return (

    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 90 }}
      >

        <Text style={styles.logBtn} onPress={() => setShowLogModal(true)}>🩸 Log Period</Text>

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

        {/* Legend */}

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

        {/* Cycle Trends */}

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
      {showLogModal && (
  <View style={styles.modalOverlay}>
    <View style={styles.modalCard}>

      <Text style={styles.modalTitle}>
        Last Period Date
      </Text>

      <Calendar
        maxDate={new Date().toISOString().split("T")[0]}
        minDate={calenderData?.lastPeriodDate}
        markedDates={{
          [selectedDate.toISOString().split("T")[0]]: {
            selected: true,
            selectedColor: "#c08497"
          }
        }}
        onDayPress={(day) =>
          setSelectedDate(new Date(day.dateString))
        }
        theme={{
          todayTextColor: "#c08497",
          selectedDayBackgroundColor: "#c08497",
          arrowColor: "#c08497"
        }}
      />

      {/* Buttons */}

      <View style={styles.modalBtnRow}>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setShowLogModal(false)}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={savePeriod}
        >
          <Text style={{ color: "#fff" }}>
            Save
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  </View>
)}

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
    marginBottom: 15,
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
  },
  modalOverlay:{
  position:"absolute",
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:"rgba(0,0,0,0.4)",
  justifyContent:"center",
  alignItems:"center"
},

modalCard:{
  width:"90%",
  backgroundColor:"#fff",
  borderRadius:20,
  padding:20
},

modalTitle:{
  fontSize:18,
  fontWeight:"600",
  marginBottom:10,
  textAlign:"center"
},

modalBtnRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:15
},

cancelBtn:{
  padding:10
},

saveBtn:{
  backgroundColor:"#c08497",
  paddingHorizontal:20,
  paddingVertical:10,
  borderRadius:10
}

});