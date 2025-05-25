import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import TextField from "@/components/TextField";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

const userinfo = () => {
  const [genderRef, setGenderRef] = useState("");
  const [weightRef, setWeightRef] = useState("");
  const [phoneRef, setPhoneRef] = useState("");
  const [ageRef, setAgeRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!genderRef || !weightRef || !ageRef) {
      Alert.alert("Enter Info", "Please fill all of the required fields");
      return;
    }
    console.log("gender: ", genderRef);
    console.log("age: ", ageRef);
    console.log("weight: ", weightRef);
    console.log("phone: ", phoneRef);
    //   await signUpWithEmail();
    router.replace("/(tabs)");
    // theres an error here but it should run fine ^^
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* back button */}
        <BackButton iconSize={28}></BackButton>

        {/* welcome */}
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            User Info
          </Typo>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Let's get some info from you
          </Typo>
          <TextField label="Age" value={ageRef} onChangeText={setAgeRef} />
          <TextField
            label="Gender"
            value={genderRef}
            onChangeText={setGenderRef}
          />
          <TextField
            label="Weight"
            value={weightRef}
            onChangeText={setWeightRef}
          />
          <TextField
            label="Phone Number"
            value={phoneRef}
            onChangeText={setPhoneRef}
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Continue
            </Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default userinfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
