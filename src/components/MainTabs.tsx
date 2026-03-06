import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

/* YOUR SCREENS */
// import HormoneDashboard from "../screens/HormoneDashboard";
// import PeriodCalendar from "../screens/calenderLog";
// import AI from "../screens/AI";
// import Log from "../screens/Log";
import Profile from "../screens/Profile";
import HormoneDashboard from "../screens/homeDashboardScreen";
import PeriodCalendar from "../screens/PeriodCalendar";
import AI from "../screens/AIChat";
import Log from "../screens/Log";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          let iconName = "";

          if (route.name === "HomeDashboard") iconName = "home";
          if (route.name === "PeriodCalendar") iconName = "calendar";
          if (route.name === "AI") iconName = "sparkles";
          if (route.name === "Log") iconName = "list";
          if (route.name === "Profile") iconName = "person";

          return (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.activeIcon
              ]}
            >
              <Ionicons
                name={iconName}
                size={20}
                color={focused ? "#fff" : "#7d8597"}
              />
            </View>
          );
        },

        tabBarActiveTintColor: "#c27ba0",
        tabBarInactiveTintColor: "#7d8597",

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginBottom: 5
        },

        tabBarStyle: styles.tabBar
      })}
    >
      <Tab.Screen
        name="HomeDashboard"
        component={HormoneDashboard}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="PeriodCalendar"
        component={PeriodCalendar}
        options={{ title: "Calendar" }}
      />

      <Tab.Screen
        name="AI"
        component={AI}
        options={{ title: "AI Insights" }}
      />

      <Tab.Screen
        name="Log"
        component={Log}
        options={{ title: "Log" }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopWidth: 0,
    elevation: 10,
    backgroundColor: "#ffffff",
    paddingBottom: 8,
    paddingTop: 8
  },

  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center"
  },

  activeIcon: {
    backgroundColor: "#c27ba0",
    shadowColor: "#c27ba0",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6
  }
});
