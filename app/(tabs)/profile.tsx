import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
// --- 1. UPDATED aIMPORT STATEMENT ---
import {
    launchImageLibraryAsync,
    launchCameraAsync,
    requestMediaLibraryPermissionsAsync,
    requestCameraPermissionsAsync,
    MediaType, // Import MediaType directly
} from "expo-image-picker";
import { colors, spacingY, spacingX } from "@/constants/theme";
import { PencilSimple, User as UserIcon } from "phosphor-react-native";

const Profile = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImageFromLibrary = async () => {
        // --- 2. UPDATED FUNCTION CALLS (removed 'ImagePicker.') ---
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Photo library access is required to choose an image. Please enable it in your phone settings.");
            return;
        }

        try {
            let result = await launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImageUri(result.assets[0].uri);
                // TODO: Upload image to your backend (e.g., Supabase Storage)
                console.log("Image URI from library: ", result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image from library: ", error);
            Alert.alert("Error", "Could not pick image from library.");
        }
    };

    const takePhotoWithCamera = async () => {
        // --- 2. UPDATED FUNCTION CALLS (removed 'ImagePicker.') ---
        const { status } = await requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Camera access is required to take a photo. Please enable it in your phone settings.");
            return;
        }

        try {
            let result = await launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImageUri(result.assets[0].uri);
                // TODO: Upload image to your backend
                console.log("Image URI from camera: ", result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error taking photo with camera: ", error);
            Alert.alert("Error", "Could not take photo.");
        }
    };

    const handleEditPicture = () => {
        Alert.alert(
            "Change Profile Picture",
            "Choose an option:",
            [
                { text: "Take Photo...", onPress: takePhotoWithCamera },
                { text: "Choose from Library...", onPress: pickImageFromLibrary },
                { text: "Cancel", style: "cancel" },
            ],
            { cancelable: true }
        );
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Typo size={24} fontWeight="bold" style={styles.title}>
                    Your Profile
                </Typo>

                <View style={styles.profileImageContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <UserIcon size={60} color={colors.textLighter} />
                        </View>
                    )}
                    <TouchableOpacity style={styles.editButton} onPress={handleEditPicture}>
                        <PencilSimple size={20} color={colors.white} weight="bold" />
                    </TouchableOpacity>
                </View>

                {/* Other profile information can go here */}
            </View>
        </ScreenWrapper>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._20,
    },
    title: {
        marginBottom: spacingY._30,
    },
    profileImageContainer: {
        position: "relative",
        marginBottom: spacingY._30,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.neutral200,
    },
    placeholderImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.neutral200,
        justifyContent: "center",
        alignItems: "center",
    },
    editButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: colors.primary || "rgba(0,0,0,0.6)",
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.white,
    },
});