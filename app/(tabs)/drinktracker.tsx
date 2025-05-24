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
  const userId = "5ad68413-1f4a-40a0-9633-1c76b0000246";

  const handleLogDrink = async () => {
    //Check whether the user input is valid for ABV
    const abv = parseFloat(alcoholContent);
    console.log("Checking ABV:", abv);
    if (isNaN(abv) || abv > 100 || abv < 0) {
      Alert.alert(
        "Invalid Alcohol Content",
        "Please enter a valid percentage between 0 and 100."
      );
      return;
    }

    console.log("continued");
    //Insert Drink into DB
    const { error } = await supabase.from("drinks").insert([
      {
        user_id: userId,
        drink_name: description,
        abv: parseFloat(alcoholContent),
        volume_ml: parseFloat(volume) * 29.5735,
        timestamp: new Date(),
      },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Insert successful");
    }

    const { data: drinks } = await supabase
      .from("drinks")
      .select()
      .eq("metabolized", false);
    //Update the BAC of the user
    const { data: users } = await supabase
      .from("users")
      .select()
      .eq("id", userId);
    const user = users?.[0];

    let BAC = 0;
    if (drinks != null) {
      for (let i = 0; i < drinks.length; i++) {
        console.log("loop", i);
        let BACi = 0;
        //BAC (g/dL) = (A / (W * r)) - B * T:
        const W = user.weight * 453.592; //User weight in grams
        const r = user.gender == "male" ? 0.68 : 0.55; //Widmark factor
        const B = 0.015; //Elimination rate g/100mL/hour
        const now = new Date();
        const T =
          (now.getTime() - new Date(drinks[i].timestamp).getTime()) /
          (1000 * 60 * 60); //Time since last BAC update in hours
        const A = (drinks[i].abv * drinks[i].volume_ml * 0.789) / 100;
        BACi = A / (W * r) - B * T;
        console.log(BACi);
        if (BACi <= 0) {
          console.log("Drink has been metabolized: ", drinks[i].drink_name);
          await supabase
            .from("drinks")
            .update({ metabolized: true })
            .eq("id", drinks[i].id);
        } else {
          BAC += BACi;
        }
      }
    }
    BAC = Math.max(0, BAC) * 100;
    await supabase.from("users").update({ current_bac: BAC }).eq("id", userId);
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
      <Button onPress={handleLogDrink}>
        <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
          Log Drink
        </Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default drinktracker;
