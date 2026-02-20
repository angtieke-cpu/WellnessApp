import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import type { NavigationProp } from "@react-navigation/native";

type TabItem = {
  label: string;
  route: string;
  icon: string;
};

type BottomNavProps = {
  active: string;
  onChange: (route: string) => void;
};

const tabs: TabItem[] = [
  { label: "Home", route: "Home", icon: "home-outline" },
  { label: "Hormone Pattern", route: "Fertility", icon: "flower-outline" },
  { label: "AI Insights", route: "AI", icon: "sparkles-outline" },
  { label: "Diet Chart", route: "Insights", icon: "nutrition-outline" },
  { label: "Profile", route: "Profile", icon: "person-outline" }
];

// const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <View style={styles.nav}>
      {tabs.map((tab) => {
        const isActive = active === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            onPress={() => onChange(tab.route)}
            style={styles.item}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={isActive ? "#E8A6C9" : "#7C6B78"}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? "#E8A6C9" : "#7C6B78" }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;


const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#EADCE4",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 64,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
  },
});
