import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function StartJourney() {
  const navigation = useNavigation<any>();
  const flatRef = useRef<FlatList<number>>(null);

  const TOTAL_STEPS = 9;
  const today = new Date();

  const [index, setIndex] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerField, setPickerField] =
    useState<"dob" | "lastPeriod">("dob");

  const [data, setData] = useState({
    ageGroup: "",
    dob: today,
    cycleLength: 28,
    lastPeriod: today,
    symptoms: [] as string[],
    goals: [] as string[],
    conditions: [] as string[],
    advancedSymptoms: [] as string[]
  });

  const next = () => {
      if (index === 1 && !data.ageGroup) {
    Alert.alert("Please select your age group");
    return;
  }

  if (index === 2 && !data.dob) {
    Alert.alert("Please select your date of birth");
    return;
  }

  if (index === 3 && !data.cycleLength) {
    Alert.alert("Please select cycle length");
    return;
  }

  if (index === 4 && data.symptoms.length === 0) {
    Alert.alert("Please select at least one symptom");
    return;
  }

  if (index === 5 && data.goals.length === 0) {
    Alert.alert("Please select at least one wellness goal");
    return;
  }

  if (index === 6 && data.conditions.length === 0) {
    Alert.alert("Please select condition or None");
    return;
  }

  if (index === 7 && data.advancedSymptoms.length === 0) {
    Alert.alert("Please select symptoms to track");
    return;
  }
    if (index < TOTAL_STEPS - 1) {
      flatRef.current?.scrollToIndex({
        index: index + 1,
        animated: true
      });
    }
  };

  const prev = () => {
    if (index > 0) {
      flatRef.current?.scrollToIndex({
        index: index - 1,
        animated: true
      });
    }
  };

  // const finish = async () => {
  //   try {
  //     console.log("USER ONBOARDING DATA =>", data);

  //     await AsyncStorage.setItem(
  //       "onboarding",
  //       JSON.stringify(data)
  //     );

  //     // navigation.navigate("Home");
  //     navigation.navigate("HomeDashboard");
  //   } catch (error) {
  //     console.log("Error saving onboarding:", error);
  //   }
  // };


  const finish = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const body = {
      ageGroup: data.ageGroup,
      dateOfBirth: data.dob.toISOString().split("T")[0],
      cycleLengthDays: data.cycleLength,
      symptoms: data.symptoms,
      lastPeriodDate: data.lastPeriod.toISOString().split("T")[0],
      healthGoals: data.goals,
      diagnosedConditions: data.conditions,
      trackingSymptoms: data.advancedSymptoms
    };

    const response = await fetch(
      "https://her-solace-api.vercel.app/api/journey/details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );

    const result = await response.json();

    if (result.success) {
      // await AsyncStorage.setItem("onboarding", JSON.stringify(data));

      navigation.navigate("HomeDashboard");
    } else {
      Alert.alert("Error", result.message || "Something went wrong");
    }

  } catch (error) {
    console.log("API ERROR", error);
    Alert.alert("Network error");
  }
};
  const renderProgress = () => (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${(index / (TOTAL_STEPS - 1)) * 100}%` }
        ]}
      />
    </View>
  );

  const NavButtons = ({ isLast = false }: any) => (
    <View style={styles.navRow}>
      {index > 0 && (
        <TouchableOpacity
          style={styles.navBtn}
          onPress={prev}
        >
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
      )}

      {!isLast ? (
        <TouchableOpacity
          style={styles.navBtn}
          onPress={next}
        >
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.navBtn, styles.finishBtn]}
          onPress={finish}
        >
          <Text style={[styles.navText, { color: "#fff" }]}>
            ✓
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const ChipGroup = ({
    options,
    selected,
    field,
    limit
  }: any) => (
    <View style={styles.chips}>
      {options.map((item: string) => {
        const active = selected.includes(item);
        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              active && styles.chipActive
            ]}
            onPress={() => {
              let updated;

              if (active) {
                updated = selected.filter(
                  (x: string) => x !== item
                );
              } else {
                if (limit && selected.length >= limit)
                  return;
                updated = [...selected, item];
              }

              setData({ ...data, [field]: updated });
            }}
          >
            <Text
              style={
                active
                  ? styles.chipTextActive
                  : styles.chipText
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderSlide = ({ item }: { item: number }) => {
    switch (item) {
      case 0:
        return (
          <View style={[styles.card , { width }]} >
            {renderProgress()}
            <Text style={styles.logo}>🌸</Text>
            <Text style={styles.title}>Her Solace</Text>
            <Text style={styles.sub}>
              Decode Hormones - Discover You
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={next}
            >
              <Text style={styles.btnText}>
                Start Journey
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 1:
        return (
          <View style={[styles.card , { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Step 1 of 8
            </Text>
            <Text style={styles.title}>
              Select your age group
            </Text>

            <View style={styles.chips}>
              {["18–24", "25–34", "35–44", "45+"].map(
                (g) => {
                  const active =
                    data.ageGroup === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.chip,
                        active &&
                          styles.chipActive
                      ]}
                      onPress={() =>
                        setData({
                          ...data,
                          ageGroup: g
                        })
                      }
                    >
                      <Text
                        style={
                          active
                            ? styles.chipTextActive
                            : styles.chipText
                        }
                      >
                        {g}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>

            <NavButtons />
          </View>
        );

      case 2:
        return (
          <View style={[styles.card , { width }]} >
            {renderProgress()}
            <Text style={styles.step}>
              Step 2 of 8
            </Text>
            <Text style={styles.title}>
              Date of Birth
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setPickerField("dob");
                setShowPicker(true);
              }}
            >
              <Text>
                {data.dob.toDateString()}
              </Text>
            </TouchableOpacity>
            <NavButtons />
          </View>
        );

      case 3:
        return (
          <View style={[styles.card , { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Step 3 of 8
            </Text>
            <Text style={styles.title}>
              Cycle Length
            </Text>

            <Text style={styles.big}>
              {data.cycleLength}{" "}
              <Text style={{ fontSize: 18 }}>
                days
              </Text>
            </Text>

            <Slider
              style={{ width: "100%" }}
              minimumValue={21}
              maximumValue={35}
              step={1}
              value={data.cycleLength}
              minimumTrackTintColor="#c08497"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#c08497"
              onValueChange={(v) =>
                setData({
                  ...data,
                  cycleLength: v
                })
              }
            />

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent:
                  "space-between"
              }}
            >
              <Text>21</Text>
              <Text>35</Text>
            </View>

            <NavButtons />
          </View>
        );

      case 4:
        return (
          <View style={[styles.card , { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Step 4 of 8
            </Text>
            <Text style={styles.title}>
              Select Symptoms
            </Text>

            <ChipGroup
              options={[
                "Cramps",
                "Headaches",
                "Bloating",
                "Fatigue"
              ]}
              selected={data.symptoms}
              field="symptoms"
            />

            <NavButtons />
          </View>
        );

      case 5:
        return (
          <View style={[styles.card , { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Step 5 of 8
            </Text>
            <Text style={styles.title}>
              Top 3 Wellness Goals
            </Text>

            <ChipGroup
              options={[
                "Better Sleep",
                "Stress Management",
                "Balanced Energy",
                "Fertility Tracking",
                "Bone Health"
              ]}
              selected={data.goals}
              field="goals"
              limit={3}
            />

            <NavButtons />
          </View>
        );

      case 6:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Step 6 of 8
            </Text>
            <Text style={styles.title}>
              Diagnosed Conditions
            </Text>

            <ChipGroup
              options={[
                "PCOS",
                "Endometriosis",
                "Thyroid Issues",
                "Chronic Fatigue",
                "Diabetes",
                "None"
              ]}
              selected={data.conditions}
              field="conditions"
            />

            <NavButtons />
          </View>
        );

            case 7:
        return (
          <View style={[styles.card, { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Step 7 of 8
            </Text>
            <Text style={styles.title}>
              What symptoms do you want guidance on?
            </Text>

            <ChipGroup
              options={[
                  "Mood Swings",
          "Hot Flashes",
          "Joint Pain",
          "Low Energy",
          "Brain Fog",
          "Sleep Issues"
              ]}
              selected={data.advancedSymptoms}
              field="advancedSymptoms"
            />

            <NavButtons />
          </View>
        );

      case 8:
        return (
          <View style={[styles.card , { width }]}>
            {renderProgress()}
            <Text style={styles.step}>
              Final Step
            </Text>
            <Text style={styles.title}>
              Last Period Date
            </Text>

            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setPickerField(
                  "lastPeriod"
                );
                setShowPicker(true);
              }}
            >
              <Text>
                {data.lastPeriod.toDateString()}
              </Text>
            </TouchableOpacity>

            <NavButtons isLast />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
   <FlatList
  ref={flatRef}
  data={[0,1,2,3,4,5,6,7,8]}
  horizontal
  pagingEnabled
  scrollEnabled={false}
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.toString()}
  getItemLayout={(_, index) => ({
    length: width,
    offset: width * index,
    index
  })}
  onMomentumScrollEnd={(e) => {
    const newIndex = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setIndex(newIndex);
  }}
  renderItem={({ item }) => (
    <View style={{ width }}>
      {renderSlide({ item })}
    </View>
  )}
/>


      {showPicker && (
        <DateTimePicker
          value={data[pickerField]}
          mode="date"
          onChange={(_, date) => {
            setShowPicker(false);
            if (date) {
              setData({
                ...data,
                [pickerField]: date
              });
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#efe8f4" },

  card: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  logo: { fontSize: 60 },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center"
  },

  sub: {
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center"
  },

  step: {
    color: "#c08497",
    marginBottom: 6
  },

  primaryBtn: {
    marginTop: 30,
    backgroundColor: "#c08497",
    padding: 18,
    borderRadius: 30,
    width: "80%",
    alignItems: "center"
  },

  btnText: { color: "#fff", fontWeight: "700" },

  progressTrack: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5dce9",
    borderRadius: 20,
    marginBottom: 30
  },

  progressFill: {
    height: 8,
    backgroundColor: "#c08497",
    borderRadius: 20
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20
  },

  chip: {
    borderWidth: 1.5,
    borderColor: "#c08497",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    margin: 6
  },

  chipActive: {
    backgroundColor: "#c08497"
  },

  chipText: { color: "#c08497" },

  chipTextActive: { color: "#fff" },

  big: {
    fontSize: 42,
    fontWeight: "800",
    color: "#c08497",
    marginVertical: 20
  },

  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#c08497",
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 40
  },

  navBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6
  },

  navText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#c08497"
  },

  finishBtn: {
    backgroundColor: "#c08497"
  }
});


