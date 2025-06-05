import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { supabase } from "@/config/supabase";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View , TouchableWithoutFeedback , Keyboard} from "react-native";
const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: emailRef.current,
      password: passwordRef.current,
      options: {
        emailRedirectTo: "https://www.youtube.com/",
      },
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
  }
  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign up", "Please fill all of the fields");
      return;
    }
    console.log("email: ", emailRef.current);
    console.log("password: ", passwordRef.current);
    console.log("good to go");
    await signUpWithEmail();
    router.replace("/userinfo");
    // theres an error here but it should run fine ^^
  };

  const handleForgotPassword = async () => {
    Alert.alert("womp womp", "placeholder (seriously this needs to be fixed)");
  };

  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/* back button */}
          <BackButton iconSize={28} />

          {/* welcome */}
          <View style={{ gap: 5, marginTop: spacingY._20 }}>
            <Typo size={30} fontWeight={"800"}>
              Let&#39;s Get Started
            </Typo>
          </View>

          {/* form */}
          <View style={styles.form}>
            <Typo size={16} color={colors.textLighter}>
              Create your account
            </Typo>
            <Input
              placeholder="Enter your name"
              onChangeText={(value) => (nameRef.current = value)}
              icon={
                <Icons.User
                  size={verticalScale(26)}
                  color={colors.neutral300}
                  weight="fill"
                />
              }
            />
            <Input
              placeholder="Enter your email"
              onChangeText={(value) => (emailRef.current = value)}
              icon={
                <Icons.At
                  size={verticalScale(26)}
                  color={colors.neutral300}
                  weight="fill"
                />
              }
            />
            <Input
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
              icon={
                <Icons.LockKey
                  size={verticalScale(26)}
                  color={colors.neutral300}
                  weight="fill"
                />
              }
            />

            <Button loading={isLoading} onPress={handleSubmit}>
              <Typo fontWeight={"700"} color={colors.black} size={21}>
                Sign Up
              </Typo>
            </Button>
          </View>

          {/* footer  */}
          <View style={styles.footer}>
            <Typo size={15}>Already have an account?</Typo>
            <Pressable onPress={() => router.push("/(auth)/login")}>
              <Typo size={15} fontWeight={"700"} color={colors.primary}>
                Log in
              </Typo>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default Register;

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
