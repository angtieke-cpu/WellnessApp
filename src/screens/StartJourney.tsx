import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function StartJourney() {
  const navigation = useNavigation<any>();
  const flatRef = useRef<FlatList<number>>(null);

  const TOTAL_STEPS = 6;
  const today = new Date();

  const [index, setIndex] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerField, setPickerField] = useState<'dob' | 'lastPeriod'>('dob');

  const maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 13);

  const [data, setData] = useState({
    name: '',
    dob: today,
    lastPeriod: today,
    cycleLength: 28,
    bleedingDays: 5,
  });

  /* ================= AGE GROUP CALCULATION ================= */

  const getAgeGroup = (dob: Date) => {
    const age = new Date().getFullYear() - dob.getFullYear();

    if (age <= 24) return '18–24';
    if (age <= 34) return '25–34';
    if (age <= 44) return '35–44';
    return '45+';
  };

  /* ================= NEXT ================= */

  const next = () => {
    console.log(index)
    console.log(data?.name)
    if (index === 1 && !data.name.trim()) {
      Alert.alert('Please enter your name');
      return;
    }

    if (index === 2 && !data.dob) {
      Alert.alert('Please select your date of birth');
      return;
    }

    if (index === 3 && !data.lastPeriod) {
      Alert.alert('Please select last period date');
      return;
    }

    if (index === 4 && !data.cycleLength) {
      Alert.alert('Please select cycle length');
      return;
    }

    if (index === 5 && !data.bleedingDays) {
      Alert.alert('Please select bleeding days');
      return;
    }

    if (index < TOTAL_STEPS - 1) {
      flatRef.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
      setIndex(index+1)
    }
  };

  /* ================= PREV ================= */

  const prev = () => {
    if (index > 0) {
      flatRef.current?.scrollToIndex({
        index: index - 1,
        animated: true,
      });
       setIndex(index-1)
    }
  };

  /* ================= FINISH ================= */

  const finish = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const ageGroup = getAgeGroup(data.dob);

      const body = {
        name: data.name,
        ageGroup: ageGroup,
        dateOfBirth: data.dob.toISOString().split('T')[0],
        lastPeriodDate: data.lastPeriod.toISOString().split('T')[0],
        cycleLengthDays: data.cycleLength,
        bleedingDays: data.bleedingDays,

        symptoms: '',
        healthGoals: '',
        diagnosedConditions: '',
        trackingSymptoms: '',
      };

      const response = await fetch(
        'https://her-solace-api.vercel.app/api/journey/details',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      const result = await response.json();

      if (result.success) {
        navigation.navigate('HomeDashboard');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Network error');
    }
  };

  /* ================= PROGRESS ================= */

  const renderProgress = () => (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${(index / (TOTAL_STEPS - 1)) * 100}%` },
        ]}
      />
    </View>
  );

  /* ================= NAV BUTTON ================= */

  const NavButtons = ({ isLast = false }: any) => (
    <View style={styles.navRow}>
      {index > 0 && (
        <TouchableOpacity style={styles.navBtn} onPress={prev}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
      )}

      {!isLast ? (
        <TouchableOpacity style={styles.navBtn} onPress={next}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.navBtn, styles.finishBtn]}
          onPress={finish}
        >
          <Text style={[styles.navText, { color: '#fff' }]}>✓</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  /* ================= SLIDES ================= */

  const renderSlide = ({ item }: { item: number }) => {
    switch (item) {
      case 0:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}

            <Text style={styles.logo}>🌸</Text>

            <Text style={styles.title}>Her Solace</Text>

            <Text style={styles.sub}>Decode Hormones - Discover You</Text>

            <TouchableOpacity style={styles.primaryBtn} onPress={next}>
              <Text style={styles.btnText}>Start Journey</Text>
            </TouchableOpacity>
          </View>
        );

      /* NAME */

      case 1:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}

            <Text style={styles.step}>Step 1</Text>

            <Text style={styles.title}>What should we call you?</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={data.name}
             onChangeText={(v) =>
  setData({ ...data, name: v })
}
            />

            <NavButtons />
          </View>
        );

      /* DOB */

      case 2:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}

            <Text style={styles.step}>Step 2</Text>

            <Text style={styles.title}>Date of Birth</Text>

            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setPickerField('dob');
                setShowPicker(true);
              }}
            >
              <Text>{data.dob.toDateString()}</Text>
            </TouchableOpacity>

            <NavButtons />
          </View>
        );

      /* LAST PERIOD */

      case 3:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}

            <Text style={styles.step}>Step 3</Text>

            <Text style={styles.title}>Last Period Date</Text>

            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setPickerField('lastPeriod');
                setShowPicker(true);
              }}
            >
              <Text>{data.lastPeriod.toDateString()}</Text>
            </TouchableOpacity>

            <NavButtons />
          </View>
        );

      /* CYCLE LENGTH */

      case 4:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}

            <Text style={styles.step}>Step 4</Text>

            <Text style={styles.title}>Cycle Length</Text>

            <Text style={styles.big}>
              {data.cycleLength} <Text style={{ fontSize: 18 }}>days</Text>
            </Text>

            <Slider
              minimumValue={21}
              maximumValue={35}
              step={1}
              value={data.cycleLength}
              minimumTrackTintColor="#c08497"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#c08497"
              onValueChange={v => setData({ ...data, cycleLength: v })}
            />

            <NavButtons />
          </View>
        );

      /* BLEEDING DAYS */

      case 5:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}

            <Text style={styles.step}>Final Step</Text>

            <Text style={styles.title}>
              How many days does your bleeding usually last?
            </Text>

            <Text style={styles.big}>
              {data.bleedingDays} <Text style={{ fontSize: 18 }}>days</Text>
            </Text>

            <Slider
              minimumValue={2}
              maximumValue={10}
              step={1}
              value={data.bleedingDays}
              minimumTrackTintColor="#c08497"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#c08497"
              onValueChange={v => setData({ ...data, bleedingDays: v })}
            />

            <NavButtons isLast />
          </View>
        );
    }
  };

  /* ================= RETURN ================= */

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatRef}
        data={[0, 1, 2, 3, 4, 5]}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={i => i.toString()}
        renderItem={({ item }) => (
          <View style={{ width }}>{renderSlide({ item })}</View>
        )}
      />

      {showPicker && (
        <DateTimePicker
          value={data[pickerField]}
          mode="date"
          maximumDate={pickerField === 'dob' ? maxDOB : today}
          onChange={(_, date) => {
            setShowPicker(false);

            if (date) {
              setData({
                ...data,
                [pickerField]: date,
              });
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#efe8f4' },

  card: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: { fontSize: 60 },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },

  sub: {
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },

  step: { color: '#c08497', marginBottom: 6 },

  primaryBtn: {
    marginTop: 30,
    backgroundColor: '#c08497',
    padding: 18,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },

  btnText: { color: '#fff', fontWeight: '700' },

  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5dce9',
    borderRadius: 20,
    marginBottom: 30,
  },

  progressFill: {
    height: 8,
    backgroundColor: '#c08497',
    borderRadius: 20,
  },

  big: {
    fontSize: 42,
    fontWeight: '800',
    color: '#c08497',
    marginVertical: 20,
  },

  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#c08497',
    borderRadius: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },

  navRow: {
     flexDirection: "row",
  justifyContent: "space-between",
  // alignItems: "center",
  width: "60%",
  marginTop: 40,
  },

  navBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  navText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#c08497',
  },

  finishBtn: {
    backgroundColor: '#c08497',
  },
});
