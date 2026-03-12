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

  return (
    <View>
      <Svg width={width} height={height + 40}>
        {/* PHASE BACKGROUND */}

        <Rect
          x={padding}
          y={0}
          width={phaseWidth}
          height={height}
          fill="#FCE4EC"
        />
        <Rect
          x={padding + phaseWidth}
          y={0}
          width={phaseWidth}
          height={height}
          fill="#E8F5E9"
        />
        <Rect
          x={padding + phaseWidth * 2}
          y={0}
          width={phaseWidth}
          height={height}
          fill="#FFFDE7"
        />
        <Rect
          x={padding + phaseWidth * 3}
          y={0}
          width={phaseWidth}
          height={height}
          fill="#F3E5F5"
        />

        {/* PHASE LABELS */}

        <SvgText
          x={padding + phaseWidth / 2}
          y={14}
          fontSize="10"
          textAnchor="middle"
        >
          Flow
        </SvgText>

        <SvgText
          x={padding + phaseWidth * 1.5}
          y={14}
          fontSize="10"
          textAnchor="middle"
        >
          Seed
        </SvgText>

        <SvgText
          x={padding + phaseWidth * 2.5}
          y={14}
          fontSize="10"
          textAnchor="middle"
        >
          Bloom
        </SvgText>

        <SvgText
          x={padding + phaseWidth * 3.5}
          y={14}
          fontSize="10"
          textAnchor="middle"
        >
          Moon
        </SvgText>

        {/* ESTROGEN */}

        <Path d={estrogenPath} stroke="#EC407A" strokeWidth={2} fill="none" />

        {/* PROGESTERONE */}

        <Path
          d={progesteronePath}
          stroke="#7B61FF"
          strokeWidth={2}
          fill="none"
        />

        {/* TODAY LINE */}

        <Line
          x1={
            padding + (currentDay / (cycleLength - 1)) * (width - padding * 2)
          }
          x2={
            padding + (currentDay / (cycleLength - 1)) * (width - padding * 2)
          }
          y1={0}
          y2={height}
          stroke="#42A5F5"
          strokeDasharray="3"
        />

        {/* OVULATION */}

        <Line
          x1={
            padding + (ovulationDay / (cycleLength - 1)) * (width - padding * 2)
          }
          x2={
            padding + (ovulationDay / (cycleLength - 1)) * (width - padding * 2)
          }
          y1={0}
          y2={height}
          stroke="#C8A2C8"
          strokeDasharray="4"
        />

        {/* X AXIS */}

        {Array.from({ length: cycleLength }).map((_, i) => {
          if (i % 5 !== 0 && i !== cycleLength - 1) return null;

          return (
            <SvgText
              key={i}
              x={padding + (i / (cycleLength - 1)) * (width - padding * 2)}
              y={height + 18}
              fontSize="10"
              fill="#777"
              textAnchor="middle"
            >
              {i + 1}
            </SvgText>
          );
        })}

        {/* HORMONE LEGEND INSIDE GRAPH */}

        <Rect x={width - 110} y={8} width={10} height={3} fill="#EC407A" />
        <SvgText x={width - 95} y={11} fontSize="9">
          Estrogen
        </SvgText>

        <Rect x={width - 110} y={20} width={10} height={3} fill="#7B61FF" />
        <SvgText x={width - 95} y={23} fontSize="9">
          Progesterone
        </SvgText>
      </Svg>

      {/* LEGEND BELOW */}

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#42A5F5' }]} />
          <Text>Today</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#C8A2C8' }]} />
          <Text>Ovulation</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
});
