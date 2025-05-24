import { colors } from "@/constants/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const TextField = ({ label, value, onChangeText }: Props) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={styles.background}
      textColor="white"
      theme={{
        roundness: 20,
        colors: {
          primary: colors.neutral100, // focused outline
          secondary: colors.neutral100,
          placeholder: "gray", // placeholder label color
          background: colors.neutral900,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.neutral900,
    marginVertical: 8,
    color: "white",
  },
});

export default TextField;
