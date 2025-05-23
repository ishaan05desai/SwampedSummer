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
      theme={{ roundness: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.neutral900,
    marginVertical: 8,
  },
});

export default TextField;
