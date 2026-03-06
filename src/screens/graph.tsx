import React from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from 'react-native-svg';
import * as d3 from 'd3-shape';

const width = 350;
const height = 180;

const estrogenData = [0.3, 0.45, 0.8, 0.9, 0.6, 0.3, 0.25];
const progesteroneData = [0.2, 0.25, 0.35, 0.6, 0.85, 0.9, 0.5];

const createLine = (data: number[]) => {
  const lineGenerator = d3
    .line<number>()
    .x((_, i) => (i / (data.length - 1)) * width)
    .y((d) => height - d * height)
    .curve(d3.curveCatmullRom.alpha(0.5));

  return lineGenerator(data) ?? '';
};

const createArea = (data: number[]) => {
  const areaGenerator = d3
    .area<number>()
    .x((_, i) => (i / (data.length - 1)) * width)
    .y0(height)
    .y1((d) => height - d * height)
    .curve(d3.curveCatmullRom.alpha(0.5));

  return areaGenerator(data) ?? '';
};

const HormoneGraph: React.FC = () => {
  const estrogenLine = createLine(estrogenData);
  const progesteroneLine = createLine(progesteroneData);
  const estrogenArea = createArea(estrogenData);
  const progesteroneArea = createArea(progesteroneData);

  return (
    <View>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="estrogenGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#F48FB1" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#F48FB1" stopOpacity="0.05" />
          </LinearGradient>

          <LinearGradient id="progGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#9575CD" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#9575CD" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

        {/* Estrogen Area */}
        <Path d={estrogenArea} fill="url(#estrogenGrad)" />

        {/* Progesterone Area */}
        <Path d={progesteroneArea} fill="url(#progGrad)" />

        {/* Lines */}
        <Path
          d={estrogenLine}
          stroke="#EC407A"
          strokeWidth={3}
          fill="none"
        />

        <Path
          d={progesteroneLine}
          stroke="#7E57C2"
          strokeWidth={3}
          fill="none"
        />

        {/* Glow Highlight on Progesterone Peak */}
        <Circle
          cx={(4 / (progesteroneData.length - 1)) * width}
          cy={height - progesteroneData[4] * height}
          r={8}
          fill="#FFD54F"
          opacity={0.8}
        />
      </Svg>
    </View>
  );
};

export default HormoneGraph;