import React from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

const MobileShell: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.inner}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default MobileShell;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  inner: {
    width: "100%",
    maxWidth: 390,
    flex: 1
  }
});
