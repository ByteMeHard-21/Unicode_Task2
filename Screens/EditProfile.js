import React, { useState, useContext } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Image, Alert, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
    const { user, updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        bio: user.bio,
        dob: user.dob,
        location: user.location,
        image: user.image,
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need permission to access your photos.');
            return;
        }


        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            handleChange('image', result.assets[0].uri);
        }
    };

    const handleSave = () => {
        updateUser(formData);
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.imageContainer}>
                    <Image
                        source={formData.image ? { uri: formData.image } : require('../assets/profile_dp.png')}
                        style={styles.image}
                    />

                    <TouchableOpacity style={styles.Dp_button} onPress={pickImage}>
                        <Text style={styles.DP_buttonText}>Change Profile Image</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.inputField}
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                        placeholder="Enter your name"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.inputField}
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        placeholder="Enter your email"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Mobile</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.inputField}
                        value={formData.mobile}
                        onChangeText={(text) => handleChange('mobile', text)}
                        placeholder="Enter your mobile number"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Date of Birth</Text>
                    <TextInput
                        style={styles.inputField}
                        value={formData.dob}
                        onChangeText={(text) => handleChange('dob', text)}
                        placeholder="Enter your date of birth"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                        style={styles.inputField}
                        value={formData.location}
                        onChangeText={(text) => handleChange('location', text)}
                        placeholder="Enter your location"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Bio</Text>
                    <TextInput
                        style={[styles.inputField, styles.bioInputField]}
                        value={formData.bio}
                        onChangeText={(text) => handleChange('bio', text)}
                        placeholder="Enter your bio"
                        multiline
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        alignItems: 'center',

    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    inputLabel: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    inputField: {
        height: 50,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 15,
        backgroundColor: '#e8e8e8ff',
    },
    bioInputField: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 20,
    },
    button: {
        backgroundColor: '#4347e6',
        paddingVertical: 17,
        paddingHorizontal: 80,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    Dp_button: {
        backgroundColor: '#4347e6',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    DP_buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
});
