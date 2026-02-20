import React from "react";
import {
  View,
  StyleSheet,
  // SafeAreaView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import BottomNav from "./components/BottomNav";
// import { useNavigation, useRoute } from "@react-navigation/native";


type Props = {
  children: React.ReactNode;
  active: string;
};

export default function PageWrapper({ children }: Props) {
//     const route = useRoute();
// const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {children}
        </View>
        {/* <BottomNav
  active={route.name}
  onChange={route.name}
/> */}

        {/* <BottomNav active={active} onChange={tab:"0"} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eae2ef"
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 96 // space for bottom nav
  }
});
