import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Alert } from "react-native";
import {
  Home,
  Calendar,
  Sparkles,
  ClipboardList,
  User
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LogOut } from "lucide-react-native";


type Props = {
  active: string;
  onChange?: (route: string) => void;
};

const BottomNav: React.FC<Props> = ({ active, onChange }) => {
  const navigation = useNavigation<any>();

const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "No",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace("Welcome"); // change if your login screen name differs
        }
      }
    ]
  );
};

  const tabs = [
    { label: "Home", route: "HomeDashboard", icon: Home },
    // { label: "Home", route: "StartJourney", icon: Home },
    { label: "Calendar", route: "PeriodCalendar", icon: Calendar },
    { label: "AI", route: "AI", icon: Sparkles },
    { label: "Log", route: "Log", icon: ClipboardList },
    { label: "Profile", route: "Profile", icon: User },
    { label: "Logout", route: "Logout", icon: LogOut }
  ];

  return (
    <View style={styles.nav}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.item}
            onPress={() => {
  if (tab.route === "Logout") {
    handleLogout();
  } else {
    onChange && onChange(tab.route);
  }
}}
            // onPress={() => onChange && onChange(tab.route)}
          >
            <Icon
              size={24}
              color={isActive ? "#E76BA3" : "#9C8A95"}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? "#E76BA3" : "#9C8A95" }
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
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },

  item: {
    alignItems: "center",
    justifyContent: "center"
  },

  label: {
    fontSize: 11,
    marginTop: 4
  }
});
