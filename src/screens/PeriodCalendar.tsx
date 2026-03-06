import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  // addDays,
  format,
  subDays,
  eachDayOfInterval
} from "date-fns";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
// import { generateCycleMarks } from "../utils/cycleUtils";

export default function PeriodCalendar() {
   const navigation = useNavigation<any>();

//   const lastPeriod = new Date(2024, 2, 4); // March 4
//   const cycleLength = 28;
//   const periodLength = 5;
  const [lastPeriod, setLastPeriod] = useState(new Date("2026-03-04T00:00:00"))
const [cycleLength, setCycleLength] = useState(28)
const [periodLength, setPeriodLength] = useState(5)
const today = new Date();

const diffTime = today.getTime() - lastPeriod.getTime();
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

const currentCycleDay = (diffDays % cycleLength) + 1;
//  const markedDates = useMemo(() => {
//     return generateCycleMarks(lastPeriod, cycleLength, 5, 5);
//   }, [lastPeriod,cycleLength]);



  const getDate = (date: Date) =>
  date.toISOString().split("T")[0];

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const marked: any = {};


// PERIOD DAYS
for (let i = 0; i < periodLength; i++) {
  const d = addDays(lastPeriod, i);

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


// OVULATION DAY
const ovulation = addDays(lastPeriod, cycleLength - 14);

marked[getDate(ovulation)] = {
  customStyles: {
    container: {
      backgroundColor: "#4dabf7",
      borderRadius: 20
    },
    text: { color: "white" }
  }
};


// FERTILE WINDOW (5 days)
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


// NEXT PERIOD
const nextPeriod = addDays(lastPeriod, cycleLength);


// PMS WINDOW (4 days before next period)
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
//   const Legend = ({color,label}:any) => (
//   <View style={styles.legendItem}>
//     <View style={[styles.dot,{backgroundColor:color}]} />
//     <Text style={styles.legendText}>{label}</Text>
//   </View>
// );


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

    const fertileDays = eachDayOfInterval({
      start: fertileStart,
      end: fertileEnd
    });

    const pmsDays = eachDayOfInterval({
      start: pmsStart,
      end: pmsEnd
    });

    const marked: any = {};

    periodDays.forEach(day => {
      marked[format(day, "yyyy-MM-dd")] = {
        customStyles: {
          container: {
            backgroundColor: "#ff6b81"
          },
          text: { color: "white" }
        }
      };
    });

    fertileDays.forEach(day => {
      marked[format(day, "yyyy-MM-dd")] = {
        customStyles: {
          container: {
            backgroundColor: "#ffd166"
          },
          text: { color: "#333" }
        }
      };
    });

    marked[format(ovulation, "yyyy-MM-dd")] = {
      customStyles: {
        container: {
          backgroundColor: "#4dabf7"
        },
        text: { color: "white", fontWeight: "bold" }
      }
    };

    pmsDays.forEach(day => {
      marked[format(day, "yyyy-MM-dd")] = {
        customStyles: {
          container: {
            backgroundColor: "#cdb4db"
          },
          text: { color: "#333" }
        }
      };
    });

    return {
      marked,
      ovulation,
      fertileStart,
      fertileEnd,
      nextPeriod,
      pmsStart,
      pmsEnd
    };

  }, [lastPeriod, cycleLength, periodLength]);

  return (
    
   <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 90 }}>

      <Text style={styles.logBtn}>🩸 Log Period</Text>

      {/* <Calendar
        markingType={"custom"}
        markedDates={cycleData.marked}
        theme={{
          calendarBackground: "#f5f7fb",
          todayTextColor: "#ff6b81",
          arrowColor: "#555",
          textMonthFontSize: 18,
          textMonthFontWeight: "600"
        }}
      /> */}
      <Calendar
        markingType={"custom"}
        markedDates={marked}
        enableSwipeMonths={true}
        renderArrow={(direction) => (
          <Text style={{fontSize:22}}>
            {direction === "left" ? "‹" : "›"}
          </Text>
        )}
        theme={{
          todayTextColor:"#339af0",
          selectedDayBackgroundColor:"#ff6b6b",
          arrowColor:"#333",
        }}
      />

      {/* Legend */}
      {/* <View style={styles.legend}>

        <Legend color="#ff6b6b" label="Period" />

        <Legend color="#4dabf7" label="Ovulation" />

        <Legend color="#f6c343" label="Fertile Window" />

        <Legend color="#b197fc" label="PMS" />

      </View> */}
      <View style={{flexDirection:"row", justifyContent:"space-around"}}>

<View style={styles.legendItem}>
<View style={[styles.dot,{backgroundColor:"#ff6b6b"}]}/>
<Text>Period</Text>
</View>

<View style={styles.legendItem}>
<View style={[styles.dot,{backgroundColor:"#4dabf7"}]}/>
<Text>Ovulation</Text>
</View>

<View style={styles.legendItem}>
<View style={[styles.dot,{backgroundColor:"#f6c343"}]}/>
<Text>Fertile Window</Text>
</View>

<View style={styles.legendItem}>
<View style={[styles.dot,{backgroundColor:"#b197fc"}]}/>
<Text>PMS</Text>
</View>

</View>

      <View style={styles.card}>

        <Text style={styles.dayBadge}>
          Current Cycle Day: {currentCycleDay}
        </Text>

        <Text style={styles.info}>
          🩸 Next Period: {format(cycleData.nextPeriod, "MMM d")}
        </Text>

        <Text style={styles.info}>
          🌸 Ovulation Window:
          {format(cycleData.fertileStart, "MMM d")} -{" "}
          {format(cycleData.fertileEnd, "MMM d")}
        </Text>

        <Text style={styles.info}>
          ⭐ Fertile Window:
          {format(cycleData.fertileStart, "MMM d")} -{" "}
          {format(cycleData.fertileEnd, "MMM d")}
        </Text>

        <Text style={styles.info}>
          🧠 Predicted PMS:
          {format(cycleData.pmsStart, "MMM d")} -{" "}
          {format(cycleData.pmsEnd, "MMM d")}
        </Text>

        <Text style={styles.info}>
          📅 Cycle Length: {cycleLength} Days
        </Text>

      </View>

    </ScrollView>
    <BottomNav active="PeriodCalendar" onChange={(route) => navigation.navigate(route)} />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20
  },
  legend:{
flexDirection:"row",
justifyContent:"space-around",
marginTop:20
},

legendItem:{
flexDirection:"row",
alignItems:"center"
},

dot:{
width:10,
height:10,
borderRadius:5,
marginRight:6
},

legendText:{
fontSize:13,
color:"#555"
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

  card: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4
  },

  dayBadge: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },

  info: {
    fontSize: 14,
    marginVertical: 4,
    color: "#555"
  }

});
