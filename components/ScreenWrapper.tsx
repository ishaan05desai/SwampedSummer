import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import * as SystemUI from "expo-system-ui";
import React from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const { height } = Dimensions.get("window");
const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS == "ios" ? height * 0.06 : 0;
  SystemUI.setBackgroundColorAsync(colors.neutral900); // Match your app's dark theme
  return (
    <View
      style={[
        {
          paddingTop,
          flex: 1,
          backgroundColor: colors.neutral900,
        },
        style,
      ]}
    >
      <StatusBar
        barStyle={"default"}
        translucent={false}
        backgroundColor={colors.neutral900}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
