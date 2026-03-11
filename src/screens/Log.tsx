import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';

/* TYPES */

type LogData = {
  cycle: {
    pain: number;
    flow: number;
    bloating: boolean;
    symptoms: string[];
  };
  emotion: {
    mood: number;
    anxiety: number;
    irritability: boolean;
    emotions: string[];
  };
  routine: {
    sleep: number;
    exercise: boolean;
    energy: number;
    routine: string[];
  };
  nutrition: {
    water: number;
    sugar: boolean;
    cravings: number;
    foods: string[];
  };
};

export default function Log() {
  const navigation = useNavigation<any>();

  const [openCard, setOpenCard] = useState<string | null>('cycle');

  const [data, setData] = useState<LogData>({
    cycle: { pain: 3, flow: 2, bloating: false, symptoms: [] },
    emotion: { mood: 3, anxiety: 2, irritability: false, emotions: [] },
    routine: { sleep: 6, exercise: false, energy: 3, routine: [] },
    nutrition: { water: 4, sugar: false, cravings: 2, foods: [] },
  });

  /* SAVE DATA */

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('Saved Log:', data);
      };
    }, [data]),
  );

  /* TOGGLE CARD */

  const toggleCard = (key: string) => {
    setOpenCard(prev => (prev === key ? null : key));
  };

  /* SWITCH */

  const Toggle = ({ value, onChange }: any) => {
    return (
      <TouchableOpacity
        style={[styles.switch, value && styles.switchActive]}
        onPress={() => onChange(!value)}
      >
        <View style={[styles.knob, value && styles.knobActive]} />
      </TouchableOpacity>
    );
  };

  /* SLIDER QUESTION */

  const SliderQuestion = ({
    index,
    label,
    value,
    onChange,
    min = 1,
    max = 5,
  }: any) => {
    return (
      <View style={styles.question}>
        <Text style={styles.qLabel}>
          {index}. {label}
        </Text>

        <Slider
          minimumValue={min}
          maximumValue={max}
          step={1}
          value={value}
          minimumTrackTintColor="#c08497"
          maximumTrackTintColor="#e4dbe7"
          thumbTintColor="#c08497"
          onValueChange={onChange}
        />

        <Text style={styles.sliderValue}>
          {value} / {max}
        </Text>
      </View>
    );
  };

  /* CHIP GROUP */

  const ChipGroup = ({ index, question, options, selected, onChange }: any) => {
    return (
      <View style={styles.question}>
        <Text style={styles.qLabel}>
          {index}. {question}
        </Text>

        <View style={styles.chips}>
          {options.map((item: string) => {
            const active = selected.includes(item);

            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => {
                  let updated;

                  if (active) {
                    updated = selected.filter((x: string) => x !== item);
                  } else {
                    updated = [...selected, item];
                  }

                  onChange(updated);
                }}
              >
                <Text style={active ? styles.chipTextActive : styles.chipText}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  /* CARD */

  const Card = ({ title, icon, keyName, children }: any) => {
    const active = openCard === keyName;

    return (
      <View style={[styles.card, !active && styles.cardCollapsed]}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => toggleCard(keyName)}
        >
          <View style={styles.headerLeft}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
          </View>

          <Text style={styles.arrow}>{active ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {active && <View style={styles.cardBody}>{children}</View>}
      </View>
    );
  };

  /* UI */

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Log Your Symptoms</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* CYCLE */}

          <Card title="Cycle Symptoms" icon="🩸" keyName="cycle">
            <SliderQuestion
              index={1}
              label="How strong are your cramps?"
              value={data.cycle.pain}
              onChange={(v: number) =>
                setData({ ...data, cycle: { ...data.cycle, pain: v } })
              }
            />

            <SliderQuestion
              index={2}
              label="How heavy is your flow?"
              value={data.cycle.flow}
              onChange={(v: number) =>
                setData({ ...data, cycle: { ...data.cycle, flow: v } })
              }
            />

            <View style={styles.question}>
              <Text style={styles.qLabel}>
                3. Are you feeling bloated today?
              </Text>

              <Toggle
                value={data.cycle.bloating}
                onChange={(v: boolean) =>
                  setData({ ...data, cycle: { ...data.cycle, bloating: v } })
                }
              />
            </View>

            <ChipGroup
              index={4}
              question="What symptoms are you experiencing?"
              options={[
                'Cramps',
                'Headache',
                'Fatigue',
                'Back Pain',
                'Breast Pain',
              ]}
              selected={data.cycle.symptoms}
              onChange={(v: any) =>
                setData({ ...data, cycle: { ...data.cycle, symptoms: v } })
              }
            />
          </Card>

          {/* EMOTION */}

          <Card title="Emotional Symptoms" icon="😊" keyName="emotion">
            <SliderQuestion
              index={1}
              label="How is your mood today?"
              value={data.emotion.mood}
              onChange={(v: number) =>
                setData({ ...data, emotion: { ...data.emotion, mood: v } })
              }
            />

            <SliderQuestion
              index={2}
              label="How anxious do you feel?"
              value={data.emotion.anxiety}
              onChange={(v: number) =>
                setData({ ...data, emotion: { ...data.emotion, anxiety: v } })
              }
            />

            <View style={styles.question}>
              <Text style={styles.qLabel}>3. Feeling irritable?</Text>

              <Toggle
                value={data.emotion.irritability}
                onChange={(v: boolean) =>
                  setData({
                    ...data,
                    emotion: { ...data.emotion, irritability: v },
                  })
                }
              />
            </View>

            <ChipGroup
              index={4}
              question="Which emotions best describe you?"
              options={['Sad', 'Overwhelmed', 'Calm', 'Motivated']}
              selected={data.emotion.emotions}
              onChange={(v: any) =>
                setData({ ...data, emotion: { ...data.emotion, emotions: v } })
              }
            />
          </Card>

          {/* ROUTINE */}

          <Card title="Routine Tracking" icon="🏃‍♀️" keyName="routine">
            <SliderQuestion
              index={1}
              label="How many hours did you sleep?"
              value={data.routine.sleep}
              min={0}
              max={12}
              onChange={(v: number) =>
                setData({ ...data, routine: { ...data.routine, sleep: v } })
              }
            />

            <SliderQuestion
              index={2}
              label="How energetic do you feel?"
              value={data.routine.energy}
              onChange={(v: number) =>
                setData({ ...data, routine: { ...data.routine, energy: v } })
              }
            />

            <View style={styles.question}>
              <Text style={styles.qLabel}>3. Did you exercise today?</Text>

              <Toggle
                value={data.routine.exercise}
                onChange={(v: boolean) =>
                  setData({
                    ...data,
                    routine: { ...data.routine, exercise: v },
                  })
                }
              />
            </View>

            <ChipGroup
              index={4}
              question="What activities did you do today?"
              options={['Yoga', 'Walking', 'Gym', 'Stretching']}
              selected={data.routine.routine}
              onChange={(v: any) =>
                setData({ ...data, routine: { ...data.routine, routine: v } })
              }
            />
          </Card>

          {/* NUTRITION */}

          <Card title="Nutrition Intake" icon="🥗" keyName="nutrition">
            <SliderQuestion
              index={1}
              label="How many glasses of water did you drink?"
              value={data.nutrition.water}
              min={0}
              max={12}
              onChange={(v: number) =>
                setData({ ...data, nutrition: { ...data.nutrition, water: v } })
              }
            />

            <SliderQuestion
              index={2}
              label="How strong are your sugar cravings?"
              value={data.nutrition.cravings}
              onChange={(v: number) =>
                setData({
                  ...data,
                  nutrition: { ...data.nutrition, cravings: v },
                })
              }
            />

            <View style={styles.question}>
              <Text style={styles.qLabel}>
                3. Did you eat sugary foods today?
              </Text>

              <Toggle
                value={data.nutrition.sugar}
                onChange={(v: boolean) =>
                  setData({
                    ...data,
                    nutrition: { ...data.nutrition, sugar: v },
                  })
                }
              />
            </View>

            <ChipGroup
              index={4}
              question="What type of foods did you eat?"
              options={['Fruit', 'Protein', 'Fast Food', 'Healthy Meal']}
              selected={data.nutrition.foods}
              onChange={(v: any) =>
                setData({ ...data, nutrition: { ...data.nutrition, foods: v } })
              }
            />
          </Card>
        </ScrollView>
      </View>

      <BottomNav active="Log" onChange={route => navigation.navigate(route)} />
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1fa',
    padding: 16,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5e4b8b',
    marginBottom: 18,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    marginBottom: 18,
    elevation: 5,
  },

  cardCollapsed: {
    backgroundColor: '#efe7f1',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 18,
    marginRight: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  arrow: {
    fontSize: 14,
    color: '#777',
  },

  cardBody: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  question: {
    marginBottom: 24,
  },

  qLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  sliderValue: {
    textAlign: 'center',
    color: '#c08497',
    fontWeight: '600',
    marginTop: 6,
  },

  switch: {
    width: 50,
    height: 26,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    padding: 3,
  },

  switchActive: {
    backgroundColor: '#c08497',
  },

  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  knobActive: {
    alignSelf: 'flex-end',
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    borderWidth: 1,
    borderColor: '#c08497',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  chipActive: {
    backgroundColor: '#c08497',
  },

  chipText: {
    color: '#c08497',
    fontSize: 13,
  },

  chipTextActive: {
    color: '#fff',
    fontSize: 13,
  },
});
