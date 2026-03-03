import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Screens */
import AgeStep from "./screens/AgeStep";
import DOBStep from "./screens/DOB";
import LastPeriodStep from "./screens/LastPeriod";
import Home from "./screens/Home";
import Fertility from "./screens/Fertility";
import StartJourney from "./screens/StartJourney";
import AI from "./screens/AIChat";
import Profile from "./screens/Profile";
import Insights from "./screens/Insights";
import CycleLength from "./screens/CycleLength";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OTPScreen from "./screens/OTPScreen";
import RegistrationScreen from "./screens/registration";
import RegisterOTPScreen from "./screens/registrationOTP";
import HormoneDashboard from "./screens/homeDashboardScreen";
import StepSix from "./screens/StepEight";

export type RootStackParamList = {
  StartJourney: undefined;
  AgeStep: undefined;
  DOBStep: undefined;
  StepSix: undefined;
  StepSeven: undefined;
  StepEight: undefined;
  LastPeriod: undefined;
  Home: undefined;
  Fertility: undefined;
  AI: undefined;
  Insights: undefined;
  Profile: undefined;
  CycleLength: undefined;
   Welcome: undefined;
   HomeDashboard:undefined
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  OTP: { contact: string };
  RegisterOTP: { contact: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name="Welcome" component={WelcomeScreen} />
           <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
           <Stack.Screen name="RegisterOTP" component={RegisterOTPScreen} />
        <Stack.Screen name="StartJourney" component={StartJourney} />
        <Stack.Screen name="AgeStep" component={AgeStep} />
        <Stack.Screen name="DOBStep" component={DOBStep} />
        <Stack.Screen name="StepSix" component={StepSix} />
        <Stack.Screen name="StepSeven" component={DOBStep} />
        <Stack.Screen name="StepEight" component={DOBStep} />
        <Stack.Screen name="LastPeriod" component={LastPeriodStep} />
        <Stack.Screen name="CycleLength" component={CycleLength} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeDashboard" component={HormoneDashboard} />
        <Stack.Screen name="Fertility" component={Fertility} />
        <Stack.Screen name="AI" component={AI} />
        <Stack.Screen name="Insights" component={Insights} />
        <Stack.Screen name="Profile" component={Profile} />
      
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
