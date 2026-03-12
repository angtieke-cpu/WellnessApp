import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from "react-native";
import PageWrapper from "../pageWrapper";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

/* ================= INSIGHT DATA ================= */

// const insights = [
//   {
//     icon: "🏋️‍♀️",
//     title: "Exercise Optimization",
//     text:
//       "Your estrogen is rising during this follicular phase. Perfect time for strength training and HIIT workouts.",
//     tag: "High Intensity Recommended",
//     progress: 80,
//     tagColor: "#2E7D32"
//   },
//   {
//     icon: "🥗",
//     title: "Nutrition Guidance",
//     text:
//       "Increase protein and iron-rich foods. Focus on leafy greens, lean meats, and complex carbs.",
//     tag: "Protein Focus",
//     progress: 70,
//     tagColor: "#1565C0"
//   },
//   {
//     icon: "😴",
//     title: "Sleep Pattern",
//     text:
//       "Your body benefits from 7-8 hours of sleep during this phase. Try consistent bedtime routines.",
//     tag: "Restorative Sleep",
//     progress: 65,
//     tagColor: "#6A1B9A"
//   },
//   {
//     icon: "💡",
//     title: "Symptom Forecast",
//     text:
//       "Low symptom burden expected for the next 7 days. Mild bloating possible around ovulation.",
//     tag: "Minimal Symptoms",
//     progress: 50,
//     tagColor: "#EF6C00"
//   }
// ];

/* ================= AI SCREEN ================= */

const AI: React.FC = () => {
  const [insightData, setInsightData] = useState<any>(null);
  const flatListRef = useRef<FlatList>(null);
  const [openChat, setOpenChat] = useState(false);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<any>();

  /* ---------- AUTO SLIDER ---------- */

 
   const getData = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "https://her-solace-api.vercel.app/api/ai/cycle-insights",
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

        // let jsonString = result.aiInsights;

        // jsonString = jsonString
        //   .replace(/```json/g, "")
        //   .replace(/```/g, "")
        //   .trim();
        // const result = await response.json();

        // const parsed = JSON.parse(jsonString);

        setInsightData(result.aiInsights);

      } else {
        console.log("API Error");
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    getData();
  }, []);

  /* ================= AUTO SLIDER ================= */

  useEffect(() => {

    if (!insightData) return;

    const interval = setInterval(() => {

      const next = (index + 1) % 4;

      flatListRef.current?.scrollToIndex({
        index: next,
        animated: true
      });

      setIndex(next);

    }, 4000);

    return () => clearInterval(interval);

  }, [index, insightData]);

  /* ================= LOADING SCREEN ================= */

  if (!insightData) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading AI Insights...</Text>
      </View>
    );
  }

  /* ================= CARD DATA ================= */

  const insights = [
    {
      icon: "🏋️‍♀️",
      title: "Exercise Optimization",
      text: insightData.exerciseOptimization,
      tag: "Workout Advice",
      progress: 80,
      tagColor: "#2E7D32"
    },
    {
      icon: "🥗",
      title: "Nutrition Guidance",
      text: insightData.nutritionGuidance,
      tag: "Nutrition",
      progress: 70,
      tagColor: "#1565C0"
    },
    {
      icon: "😴",
      title: "Sleep Pattern",
      text: insightData.sleepPattern,
      tag: "Sleep Health",
      progress: 65,
      tagColor: "#6A1B9A"
    },
    {
      icon: "💡",
      title: "Symptom Forecast",
      text: insightData.symptomsForecast,
      tag: "Prediction",
      progress: 50,
      tagColor: "#EF6C00"
    }
  ];


  return (
    <PageWrapper active="active">

      {/* ================= HEADER ================= */}
       <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Digital Twin</Text>

        <View style={styles.avatar}>
          <Image
            source={require("../assets/well_logo.jpeg")}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text style={styles.brand}>Her Solace</Text>

        <Text style={styles.subtitle}>
          Decode Hormones - Discover You
        </Text>

        <View style={styles.statusPill}>
          <Text style={styles.statusText}>
            ✓ Synced & Active
          </Text>
        </View>

        <Text style={styles.aiText}>
          AI model processing your unique hormonal patterns
        </Text>
      </View>

      {/* ================= SLIDER ================= */}

 {/* ================= INSIGHT CARDS ================= */}

<View style={styles.cardGrid}>

  {insights.map((item, i) => (
    <View key={i} style={styles.aiCard}>

      <View style={styles.aiHeader}>
        <Text style={styles.aiIcon}>{item.icon}</Text>
        <Text style={styles.aiTitle}>{item.title}</Text>
      </View>

      <Text style={styles.aiTextCard}>
        {item.text}
      </Text>

      <View style={[styles.aiTag,{borderColor:item.tagColor}]}>
        <Text style={{color:item.tagColor,fontSize:12}}>
          {item.tag}
        </Text>
      </View>

    </View>
  ))}

</View>

      {/* ================= DOTS ================= */}

      {/* <View style={styles.dots}>
        {insights.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && styles.activeDot
            ]}
          />
        ))}
      </View> */}

      {/* ================= CHAT BUTTON ================= */}

      <TouchableOpacity
        style={styles.chatFab}
        onPress={() => setOpenChat(true)}
      >
        <Text style={{ fontSize: 24 }}>💬</Text>
      </TouchableOpacity>

      {/* ================= CHAT WINDOW ================= */}

      {openChat && (
        <View style={styles.chatSheet}>

          <View style={styles.chatHeader}>
            <Text style={{ fontWeight: "600" }}>
              AI Assistant
            </Text>

            <TouchableOpacity onPress={() => setOpenChat(false)}>
              <Text>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatBody}>
            <ChatBubble
              from="ai"
              text="Hi 👋 Ask me anything about your cycle."
            />
          </View>

          <View style={styles.chatInputRow}>
            <TextInput
              placeholder="Ask your question…"
              style={styles.chatInput}
            />

            <TouchableOpacity style={styles.sendBtn}>
              <Text style={{ color: "#fff" }}>➤</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}

      {/* ================= NAV ================= */}

    
</ScrollView>
  <BottomNav
        active="AI"
        onChange={(route) => navigation.navigate(route)}
      />
    </PageWrapper>
  );
};

export default AI;

/* ================= CHAT BUBBLE ================= */

const ChatBubble = ({
  from,
  text
}: {
  from: "ai" | "user";
  text: string;
}) => (
  <View
    style={[
      styles.bubble,
      {
        alignSelf: from === "ai" ? "flex-start" : "flex-end",
        backgroundColor:
          from === "ai" ? "#f4f3f9" : "#debabc"
      }
    ]}
  >
    <Text>{text}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  header: {
    backgroundColor: "#E1B8BE",
    padding: 18,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 20
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12
  },

  brand: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700"
  },

  subtitle: {
    color: "#fff",
    marginTop: 6
  },

  aiText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center"
  },

  statusPill: {
    backgroundColor: "#debabc",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10
  },

  statusText: {
    color: "#fff",
    fontSize: 12
  },

  slide: {
    width: width - 32,
    backgroundColor: "#E1B8BE",
    padding: 20,
    borderRadius: 22,
    marginHorizontal: 16
  },

  // icon: {
  //   fontSize: 26
  // },

  slideTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 6
  },

  slideText: {
    fontSize: 13,
    color: "#333"
  },

  badge: {
    marginTop: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start"
  },

  // progressTrack: {
  //   height: 6,
  //   backgroundColor: "#eee",
  //   borderRadius: 6,
  //   marginTop: 14
  // },

  // progressFill: {
  //   height: 6,
  //   backgroundColor: "#debabc",
  //   borderRadius: 6
  // },
  slideWrapper:{
  width:width,
  paddingHorizontal:18,
  paddingTop:10
},

card:{
  backgroundColor:"#ffffff",
  borderRadius:24,
  padding:18,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:12,
  elevation:4
},

cardHeader:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:8
},

icon:{
  fontSize:24,
  marginRight:8
},

cardTitle:{
  fontSize:16,
  fontWeight:"700",
  color:"#111"
},

cardText:{
  fontSize:13,
  color:"#555",
  lineHeight:18,
  marginBottom:12
},

tag:{
  alignSelf:"flex-start",
  borderWidth:1,
  paddingHorizontal:12,
  paddingVertical:6,
  borderRadius:20,
  backgroundColor:"#FFF7F8",
  marginBottom:12
},

progressTrack:{
  height:6,
  backgroundColor:"#f1f1f1",
  borderRadius:10
},

progressFill:{
  height:6,
  backgroundColor:"#E1B8BE",
  borderRadius:10
},

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4
  },

  activeDot: {
    backgroundColor: "#debabc"
  },

  chatFab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#debabc",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6
  },

  chatSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "#f4f3f9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },

  chatHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  chatBody: {
    flex: 1,
    padding: 16
  },

  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 14,
    marginBottom: 10
  },

  chatInputRow: {
    flexDirection: "row",
    padding: 12
  },

  chatInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10
  },

  sendBtn: {
    backgroundColor: "#debabc",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 14,
    marginLeft: 8
  },
  cardGrid:{
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between",
  marginTop:10
},

aiCard:{
  width:"48%",
  backgroundColor:"#ffffff",
  borderRadius:22,
  padding:16,
  marginBottom:16,
  elevation:5,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:8
},

aiHeader:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:8
},

aiIcon:{
  fontSize:22,
  marginRight:6
},

aiTitle:{
  fontSize:14,
  fontWeight:"700",
  color:"#333"
},

aiTextCard:{
  fontSize:12,
  color:"#555",
  lineHeight:18,
  marginBottom:12
},

aiTag:{
  borderWidth:1,
  paddingHorizontal:10,
  paddingVertical:4,
  borderRadius:20,
  alignSelf:"flex-start",
  backgroundColor:"#FFF7F8"
}

});