import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface Props {
  data: number[];
}

const GRAPH_HEIGHT = 180;
const GRAPH_WIDTH = width - 40;

const StaticLineGraph: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const getX = (index: number) =>
    (index / (data.length - 1)) * GRAPH_WIDTH;

  const getY = (value: number) =>
    GRAPH_HEIGHT - ((value - min) / (max - min || 1)) * GRAPH_HEIGHT;

  const path = data
    .map((value, index) => {
      const x = getX(index);
      const y = getY(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <View style={styles.container}>
      <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
        {/* Horizontal baseline */}
        <Line
          x1="0"
          y1={GRAPH_HEIGHT}
          x2={GRAPH_WIDTH}
          y2={GRAPH_HEIGHT}
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* Line Graph */}
        <Path
          d={path}
          fill="none"
          stroke="#6C63FF"
          strokeWidth="3"
        />

        {/* Data Points */}
        {data.map((value, index) => (
          <Circle
            key={index}
            cx={getX(index)}
            cy={getY(value)}
            r="4"
            fill="#6C63FF"
          />
        ))}
      </Svg>
    </View>
  );
};

export default StaticLineGraph;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
  },
});
