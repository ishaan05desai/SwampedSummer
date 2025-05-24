import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import TextField from "@/components/TextField";
import Typo from "@/components/Typo";
import { supabase } from "@/config/supabase";
import { colors } from "@/constants/theme";
import React, { useState } from "react";
import { Alert } from "react-native";
const drinktracker = () => {
  const [description, setDescription] = useState("");
  const [volume, setVolume] = useState("");
  const [alcoholContent, setAlcoholContent] = useState("");
  const checkBAC = async () => {
    const abv = parseFloat(alcoholContent);
    console.log("Checking BAC:", abv);
    if (isNaN(abv) || abv > 100 || abv < 0) {
      Alert.alert(
        "Invalid Alcohol Content",
        "Please enter a valid percentage between 0 and 100."
      );
      return;
    }
    await handleLogDrink();
  };
  const handleLogDrink = async () => {
    const { error } = await supabase.from("drinks").insert([
      {
        user_id: "5ad68413-1f4a-40a0-9633-1c76b0000246",
        drink_name: description,
        abv: parseFloat(alcoholContent),
        volume_ml: parseFloat(volume) * 29.5735,
        timestamp: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Insert successful");
    }
  };
  const [text, onChangeText] = React.useState();
  return (
    <ScreenWrapper>
      <Typo size={22} color={colors.neutral100} fontWeight={"600"}>
        Add a drink to log
      </Typo>
      <TextField
        label="Drink Description"
        value={description}
        onChangeText={setDescription}
      ></TextField>
      <TextField
        label="Volume (oz)"
        value={volume}
        onChangeText={setVolume}
      ></TextField>
      <TextField
        label="Alcohol Content (% vol.)"
        value={alcoholContent}
        onChangeText={setAlcoholContent}
      ></TextField>
      <Button onPress={checkBAC}>
        <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
          Log Drink
        </Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default drinktracker;
