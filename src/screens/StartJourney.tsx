import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  // SafeAreaView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function StartJourney() {
  const navigation = useNavigation<any>();
  const flatRef = useRef<FlatList>(null);

  const today = new Date();

  const [index, setIndex] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerField, setPickerField] = useState<"dob" | "lastPeriod">("dob");

  const [data, setData] = useState({
    ageGroup: "",
    dob: today,
    cycleLength: 28,
    lastPeriod: today,
    symptoms: [] as string[]
  });

  const next = () => {
    if (index < 5) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
    }
  };

  const prev = () => {
    if (index > 0) {
      flatRef.current?.scrollToIndex({ index: index - 1 });
    }
  };

  const finish = async () => {
    await AsyncStorage.setItem("onboarding", JSON.stringify(data));
    navigation.navigate("Home");
  };

  const renderProgress = () => (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${(index / 5) * 100}%` }
        ]}
      />
    </View>
  );

  const slides = [
    /* 0 LANDING */
    <View style={styles.card}>
      {renderProgress()}
      <Text style={styles.logo}>🌸</Text>
      <Text style={styles.title}>Her Solace</Text>
      <Text style={styles.sub}>Decode Hormones - Discover You</Text>
      <TouchableOpacity style={styles.primaryBtn} onPress={next}>
        <Text style={styles.btnText}>Start Journey</Text>
      </TouchableOpacity>
    </View>,

    /* 1 AGE GROUP */
    <View style={styles.card}>
      {renderProgress()}
      <Text style={styles.step}>Step 1 of 5</Text>
      <Text style={styles.title}>Select your age group</Text>

      <View style={styles.chips}>
        {["18–24", "25–34", "35–44", "45+"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[
              styles.chip,
              data.ageGroup === g && styles.chipActive
            ]}
            onPress={() => setData({ ...data, ageGroup: g })}
          >
            <Text
              style={
                data.ageGroup === g
                  ? styles.chipTextActive
                  : styles.chipText
              }
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={prev}>
          <Text>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <Text>→</Text>
        </TouchableOpacity>
      </View>
    </View>,

    /* 2 DOB */
    <View style={styles.card}>
      {renderProgress()}
      <Text style={styles.step}>Step 2 of 5</Text>
      <Text style={styles.title}>Date of Birth</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setPickerField("dob");
          setShowPicker(true);
        }}
      >
        <Text>{data.dob.toDateString()}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity onPress={prev}>
          <Text>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <Text>→</Text>
        </TouchableOpacity>
      </View>
    </View>,

    /* 3 CYCLE LENGTH */
    <View style={styles.card}>
      {renderProgress()}
      <Text style={styles.step}>Step 3 of 5</Text>
      <Text style={styles.title}>Cycle Length</Text>

      <Text style={styles.big}>{data.cycleLength} days</Text>

      <Slider
        minimumValue={21}
        maximumValue={35}
        value={data.cycleLength}
        onValueChange={(v) =>
          setData({ ...data, cycleLength: Math.round(v) })
        }
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={prev}>
          <Text>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <Text>→</Text>
        </TouchableOpacity>
      </View>
    </View>,

    /* 4 SYMPTOMS */
    <View style={styles.card}>
      {renderProgress()}
      <Text style={styles.step}>Step 4 of 5</Text>
      <Text style={styles.title}>Select Symptoms</Text>

      <View style={styles.chips}>
        {["Cramps", "Headaches", "Bloating", "Fatigue"].map(
          (s) => {
            const selected = data.symptoms.includes(s);
            return (
              <TouchableOpacity
                key={s}
                style={[
                  styles.chip,
                  selected && styles.chipActive
                ]}
                onPress={() => {
                  const updated = selected
                    ? data.symptoms.filter((x) => x !== s)
                    : [...data.symptoms, s];
                  setData({ ...data, symptoms: updated });
                }}
              >
                <Text
                  style={
                    selected
                      ? styles.chipTextActive
                      : styles.chipText
                  }
                >
                  {s}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={prev}>
          <Text>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <Text>→</Text>
        </TouchableOpacity>
      </View>
    </View>,

    /* 5 LAST PERIOD */
    <View style={styles.card}>
      {renderProgress()}
      <Text style={styles.step}>Step 5 of 5</Text>
      <Text style={styles.title}>Last Period Date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setPickerField("lastPeriod");
          setShowPicker(true);
        }}
      >
        <Text>{data.lastPeriod.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={finish}
      >
        <Text style={styles.btnText}>Finish Setup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={prev}>
        <Text style={{ marginTop: 10 }}>← Back</Text>
      </TouchableOpacity>
    </View>
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setIndex(
            Math.round(
              e.nativeEvent.contentOffset.x / width
            )
          )
        }
        renderItem={({ item }) => (
          <View style={{ width }}>{item}</View>
        )}
      />

      {showPicker && (
        <DateTimePicker
          value={data[pickerField]}
          mode="date"
          onChange={(_, date) => {
            setShowPicker(false);
            if (date)
              setData({ ...data, [pickerField]: date });
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9e3ef" },
  card: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: { fontSize: 50 },
  title: { fontSize: 20, fontWeight: "700", marginTop: 10 },
  sub: { color: "#6B7280", marginBottom: 20 },
  step: { color: "#deb7ba", marginBottom: 6 },
  primaryBtn: {
    marginTop: 20,
    backgroundColor: "#deb7ba",
    padding: 16,
    borderRadius: 20
  },
  btnText: { color: "#fff", fontWeight: "700" },
  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#e6e2eb",
    borderRadius: 6,
    marginBottom: 20
  },
  progressFill: {
    height: 6,
    backgroundColor: "#deb7ba",
    borderRadius: 6
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
    justifyContent: "center"
  },
  chip: {
    borderWidth: 2,
    borderColor: "#deb7ba",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    margin: 6
  },
  chipActive: {
    backgroundColor: "#deb7ba"
  },
  chipText: { color: "#BE185D" },
  chipTextActive: { color: "#fff" },
  big: {
    fontSize: 40,
    fontWeight: "800",
    color: "#deb7ba",
    marginVertical: 20
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#F9A8D4",
    borderRadius: 16,
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30
  }
});
