import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Line,
  Circle,
  Text as SvgText,
  Rect,
} from 'react-native-svg';
import * as d3 from 'd3-shape';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = 340;
const height = 140;
const padding = 20;

export default function HormoneGraph() {
  const [cycleLength, setCycleLength] = useState(28);
  const [bleedingDays, setBleedingDays] = useState(5);
  const [ovulationDay, setOvulationDay] = useState(14);
  const [currentDay, setCurrentDay] = useState(1);

  const [estrogen, setEstrogen] = useState<number[]>([]);
  const [progesterone, setProgesterone] = useState<number[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const cycleRes = await fetch(
        'https://her-solace-api.vercel.app/api/cycle/cycle-details',
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const cycle = await cycleRes.json();

      const userRes = await fetch(
        'https://her-solace-api.vercel.app/api/user/user-details',
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const user = await userRes.json();

      const cycleLen = cycle?.cycleLength ?? 28;
      const bleed = user?.data?.bleeding_days ?? 5;
      const ovulation = cycleLen - 14;

      const lastPeriod = new Date(cycle?.lastPeriodDate);
      const today = new Date();

      const diff =
        Math.floor(
          (today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

      const day = ((diff - 1) % cycleLen) + 1;

      setCycleLength(cycleLen);
      setBleedingDays(bleed);
      setOvulationDay(ovulation);
      setCurrentDay(day);

      generateHormones(cycleLen, bleed, ovulation);
    } catch (e) {
      console.log('Graph error:', e);
    }
  };

  const generateHormones = (cycle: number, bleed: number, ov: number) => {
    let e: number[] = [];
    let p: number[] = [];

    for (let day = 1; day <= cycle; day++) {
      let ev = 0;
      let pv = 0;

      if (day <= bleed) {
        ev = 0.2;
        pv = 0.2;
      } else if (day < ov) {
        const progress = (day - bleed) / (ov - bleed);
        ev = 0.2 + progress * 0.8;
        pv = 0.2 + progress * 0.2;
      } else if (day === ov) {
        ev = 1;
        pv = 0.3;
      } else {
        const progress = (day - ov) / (cycle - ov);
        ev = 0.8 - progress * 0.6;
        pv = 0.3 + progress * 0.7;
      }

      e.push(ev);
      p.push(pv);
    }

    setEstrogen(e);
    setProgesterone(p);
  };

  const createLine = (data: number[]) => {
    return (
      d3
        .line<number>()
        .x((_, i) => padding + i * ((width - padding * 2) / (cycleLength - 1)))
        .y(d => height - d * height)
        .curve(d3.curveCatmullRom.alpha(0.5))(data) || ''
    );
  };

  const estrogenPath = createLine(estrogen);
  const progesteronePath = createLine(progesterone);

  const phaseWidth = (width - padding * 2) / 4;
  const phaseHeight = 26;

  return (
    <View>
      <Svg width={width} height={height + 70}>
        {/* PHASE BARS */}

        <Rect
          x={padding}
          y={height + 5}
          width={phaseWidth}
          height={phaseHeight}
          fill="#F8BBD0"
        />
        <Rect
          x={padding + phaseWidth}
          y={height + 5}
          width={phaseWidth}
          height={phaseHeight}
          fill="#C8E6C9"
        />
        <Rect
          x={padding + phaseWidth * 2}
          y={height + 5}
          width={phaseWidth}
          height={phaseHeight}
          fill="#FFF59D"
        />
        <Rect
          x={padding + phaseWidth * 3}
          y={height + 5}
          width={phaseWidth}
          height={phaseHeight}
          fill="#D1C4E9"
        />

        <SvgText
          x={padding + phaseWidth / 2}
          y={height + 22}
          fontSize="11"
          textAnchor="middle"
        >
          Flow
        </SvgText>
        <SvgText
          x={padding + phaseWidth * 1.5}
          y={height + 22}
          fontSize="11"
          textAnchor="middle"
        >
          Seed
        </SvgText>
        <SvgText
          x={padding + phaseWidth * 2.5}
          y={height + 22}
          fontSize="11"
          textAnchor="middle"
        >
          Bloom
        </SvgText>
        <SvgText
          x={padding + phaseWidth * 3.5}
          y={height + 22}
          fontSize="11"
          textAnchor="middle"
        >
          Moon
        </SvgText>

        {/* ESTROGEN LINE (thin) */}

        <Path d={estrogenPath} stroke="#EC407A" strokeWidth={2} fill="none" />

        {/* PROGESTERONE LINE (thin) */}

        <Path
          d={progesteronePath}
          stroke="#7E57C2"
          strokeWidth={2}
          fill="none"
        />

        {/* CURRENT DAY LINE */}

        <Line
          x1={
            padding + (currentDay / (cycleLength - 1)) * (width - padding * 2)
          }
          x2={
            padding + (currentDay / (cycleLength - 1)) * (width - padding * 2)
          }
          y1="0"
          y2={height}
          stroke="#42A5F5"
          strokeDasharray="3"
        />

        <SvgText
          x={padding + (currentDay / (cycleLength - 1)) * (width - padding * 2)}
          y={-2}
          fontSize="11"
          fill="#42A5F5"
          textAnchor="middle"
        >
          Today
        </SvgText>

        {/* OVULATION */}

        <Line
          x1={
            padding + (ovulationDay / (cycleLength - 1)) * (width - padding * 2)
          }
          x2={
            padding + (ovulationDay / (cycleLength - 1)) * (width - padding * 2)
          }
          y1="0"
          y2={height}
          stroke="#FFC107"
          strokeDasharray="4"
        />

        <Circle
          cx={
            padding + (ovulationDay / (cycleLength - 1)) * (width - padding * 2)
          }
          cy={height - (progesterone[ovulationDay] || 0) * height}
          r="5"
          fill="#FFC107"
        />

        {/* X AXIS */}

        {Array.from({ length: cycleLength }).map((_, i) => {
          if (i % 5 !== 0 && i !== cycleLength - 1) return null;

          return (
            <SvgText
              key={i}
              x={padding + (i / (cycleLength - 1)) * (width - padding * 2)}
              y={height + 50}
              fontSize="10"
              fill="#777"
              textAnchor="middle"
            >
              {i + 1}
            </SvgText>
          );
        })}
      </Svg>

      {/* LEGEND */}

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#EC407A' }]} />
          <Text>Estrogen</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#7E57C2' }]} />
          <Text>Progesterone</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#42A5F5' }]} />
          <Text>Today</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
});
