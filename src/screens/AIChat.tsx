// import PageWrapper from "@/pageWrapper";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import PageWrapper from "../pageWrapper";

const { width } = Dimensions.get("window");

/* ================= DATA ================= */

const insights = [
  {
    icon: "🏋️",
    title: "Exercise Optimization",
    text:
      "Your estrogen is rising during this follicular phase. Perfect time for strength training and HIIT workouts.",
    tag: "High Intensity Recommended",
    progress: 75,
    tagColor: "#2E7D32"
  },
  {
    icon: "🥗",
    title: "Nutrition Guidance",
    text:
      "Increase protein and iron-rich foods. Focus on lean meats, leafy greens, and complex carbs.",
    tag: "Protein Focus",
    progress: 65,
    tagColor: "#1565C0"
  }
];

/* ================= AI PAGE ================= */

const AI: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [openChat, setOpenChat] = useState(false);
  const [index, setIndex] = useState(0);

  /* ---------- auto slide ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % insights.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
      setIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <PageWrapper active="active">

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Digital Twin</Text>

        <View style={styles.avatar}>
          <Image
            source={require("../assets/well_logo.jpeg")}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text style={styles.brand}>Her Solace</Text>
        <Text style={{ color: "#fff" }}>
          Decode Hormones - Discover You
        </Text>

        <View style={styles.statusPill}>
          <Text style={{ color: "#fff", fontSize: 12 }}>
            ✓ Synced & Active
          </Text>
        </View>
      </View>

      {/* ================= INSIGHT SLIDER ================= */}
      <FlatList
        ref={flatListRef}
        data={insights}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={{ fontSize: 22 }}>{item.icon}</Text>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideText}>{item.text}</Text>

            <View
              style={[
                styles.tag,
                { borderColor: item.tagColor }
              ]}
            >
              <Text style={{ color: item.tagColor, fontSize: 12 }}>
                {item.tag}
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.progress}%` }
                ]}
              />
            </View>
          </View>
        )}
      />

      {/* ================= CHAT FAB ================= */}
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
            <Text style={{ fontWeight: "600" }}>AI Assistant</Text>
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
    </PageWrapper>
  );
};

export default AI;

/* ================= Chat Bubble ================= */

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
    backgroundColor: "rgb(225,184,190)",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8
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
    fontSize: 20,
    marginTop: 8
  },
  statusPill: {
    backgroundColor: "#debabc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8
  },
  slide: {
    width: width - 32,
    backgroundColor: "rgb(225,184,190)",
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 16
  },
  slideTitle: {
    fontWeight: "600",
    marginVertical: 6
  },
  slideText: {
    fontSize: 13
  },
  tag: {
    marginTop: 8,
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start"
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginTop: 12
  },
  progressFill: {
    height: 6,
    backgroundColor: "rgb(225,184,190)",
    borderRadius: 6
  },
  chatFab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgb(225,184,190)",
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
  }
});
