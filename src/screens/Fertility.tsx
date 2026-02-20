import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import Svg, { Rect, Line, Circle, Text as SvgText, G } from "react-native-svg";

export default function Fertility() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      
      {/* ================= DIGITAL TWIN ================= */}
      <View style={styles.card}>
        <Text style={styles.headerTitle}>
          Discover cycle trends
        </Text>

        <CycleTrendChart />
      </View>

      {/* ================= INSIGHTS ================= */}
      <Text style={styles.sectionTitle}>Cycle Trends</Text>

      <InsightRow label="Next Period" value="Feb 8 (20 days)" />
      <InsightRow label="Ovulation Window" value="Jan 26–28" />
      <InsightRow label="Cycle Regularity" value="92% • Consistent" />
      <InsightRow label="Predicted Mood" value="Stable" />
      <InsightRow label="PMS Alert" value="Feb 5–7" />
      <InsightRow label="Confidence Score" value="95%" />

    </ScrollView>
  );
}

/* ================= INSIGHT ROW ================= */

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.insightCard}>
      <Text style={styles.insightLabel}>{label}</Text>
      <View style={styles.valuePill}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
}

/* ================= CYCLE TREND CHART ================= */

function CycleTrendChart() {
  const width = 320;
  const height = 160;

  const bandTop = 72;
  const bandHeight = 40;
  const indicatorY = bandTop - 14;

  const phases = [
    { label: "FLOW", x: 0, w: 80, color: "#E8F5E9" },
    { label: "SEED", x: 80, w: 80, color: "#C8E6C9" },
    { label: "BLOOM", x: 160, w: 80, color: "#FCE4EC" },
    { label: "MOON", x: 240, w: 80, color: "#F8BBD0" }
  ];

  const seed = phases.find(p => p.label === "SEED")!;
  const bloom = phases.find(p => p.label === "BLOOM")!;

  const day8X = seed.x + seed.w / 2;
  const day14X = bloom.x;

  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      
      {/* PHASE BANDS */}
      {phases.map(p => (
        <Rect
          key={p.label}
          x={p.x}
          y={bandTop}
          width={p.w}
          height={bandHeight}
          fill={p.color}
        />
      ))}

      {/* DAY 8 */}
      <Line
        x1={day8X}
        x2={day8X}
        y1={bandTop}
        y2={bandTop + bandHeight}
        stroke="#81C784"
        strokeDasharray="4"
      />
      <Circle cx={day8X} cy={indicatorY} r="10" fill="#81C784" />
      <SvgText
        x={day8X}
        y={indicatorY + 4}
        fontSize="11"
        fontWeight="700"
        fill="#fff"
        textAnchor="middle"
      >
        8
      </SvgText>

      {/* DAY 14 */}
      <Line
        x1={day14X}
        x2={day14X}
        y1={bandTop}
        y2={bandTop + bandHeight}
        stroke="#B39DDB"
        strokeDasharray="4"
      />
      <Circle cx={day14X} cy={indicatorY} r="10" fill="#B39DDB" />
      <SvgText
        x={day14X}
        y={indicatorY + 4}
        fontSize="11"
        fontWeight="700"
        fill="#fff"
        textAnchor="middle"
      >
        14
      </SvgText>

      {/* LABELS */}
      <G fontSize="10" fill="#B0B0B0">
        {phases.map(p => (
          <SvgText
            key={p.label}
            x={p.x + p.w / 2}
            y="145"
            textAnchor="middle"
          >
            {p.label}
          </SvgText>
        ))}
      </G>
    </Svg>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12
  },
  insightCard: {
    backgroundColor: "rgb(244, 243, 249)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  insightLabel: {
    fontSize: 13
  },
  valuePill: {
    backgroundColor: "#debabc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  valueText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff"
  }
});
