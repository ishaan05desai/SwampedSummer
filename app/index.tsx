import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/welcome");
      // router.replace("/(tabs)");
      // theres an error here but it should run fine ^^
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/SwampedLogo_PNG.png")}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});
