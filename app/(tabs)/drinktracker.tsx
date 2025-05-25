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
    const abv = parseFloat(alcoholContent);
    if (isNaN(abv) || abv > 100 || abv < 0) {
      Alert.alert(
        "Invalid Alcohol Content",
        "Please enter a valid percentage between 0 and 100."
      );
      return;
    }

    const volumeMl = parseFloat(volume) * 29.5735;
    const now = new Date();

    // Insert the new drink
    const { error: insertError } = await supabase.from("drinks").insert([
      {
        user_id: userId,
        drink_name: description,
        abv,
        volume_ml: volumeMl,
        timestamp: now,
        metabolized: abv == 0 ? true : false,
      },
    ]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return;
    }

    // Get drinks and user
    const { data: drinks } = await supabase
      .from("drinks")
      .select()
      .order("timestamp", { ascending: true })
      .eq("user_id", userId);

    const { data: users } = await supabase
      .from("users")
      .select()
      .eq("id", userId);

    const user = users?.[0];
    if (!user || !drinks || drinks.length === 0) return;

    const W = user.weight * 453.592; // weight in grams
    const r = user.gender === "male" ? 0.68 : 0.55;
    const B = 0.015;

    const firstDrinkTime = new Date(drinks[0].timestamp);
    const totalHoursElapsed =
      (now.getTime() - firstDrinkTime.getTime()) / (1000 * 60 * 60);

    const totalMetabolizableGrams = (B * totalHoursElapsed * W * r) / 100;
    let metabolizableLeft = totalMetabolizableGrams;
    let remainingAlcoholGrams = 0;

    for (const drink of drinks) {
      const A = (drink.abv * drink.volume_ml * 0.789) / 100;

      if (metabolizableLeft >= A) {
        // Fully metabolized
        metabolizableLeft -= A;

        await supabase
          .from("drinks")
          .update({ metabolized: true })
          .eq("id", drink.id);
      } else {
        // Partially or not metabolized
        const stillRemaining = A - metabolizableLeft;
        metabolizableLeft = 0;
        remainingAlcoholGrams += stillRemaining;

        await supabase
          .from("drinks")
          .update({ metabolized: false })
          .eq("id", drink.id);
      }
    }

    const BAC = (remainingAlcoholGrams / (W * r)) * 100;
    await supabase.from("users").update({ current_bac: BAC }).eq("id", userId);
  };

  return (
    <ScreenWrapper>
      <Typo size={22} color={colors.neutral100} fontWeight={"600"}>
        Add a drink to log
      </Typo>
      <TextField
        label="Drink Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextField label="Volume (oz)" value={volume} onChangeText={setVolume} />
      <TextField
        label="Alcohol Content (% vol.)"
        value={alcoholContent}
        onChangeText={setAlcoholContent}
      />
      <Button onPress={handleLogDrink}>
        <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
          Log Drink
        </Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default drinktracker;
