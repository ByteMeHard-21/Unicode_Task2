import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };


    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
            <View style={styles.topSection}></View>

            <View style={styles.body}>

                <View style={styles.profileContainer}>
                    {user.image ? (
                        <Image source={{ uri: user.image }} style={styles.profile_dp} />
                    ) : (
                        <Image source={require('../assets/profile_dp.png')} style={styles.profile_dp} />
                    )}

                    <View style={styles.nameContainer}>
                        {user.name ? (
                            <Text style={styles.userName}>{user.name}</Text>
                        ) : (
                            <Text style={styles.userName}>User Name</Text>
                        )}
                    </View>
                </View>


                <View style={styles.show_box}>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail" size={30} color="#4347e6" style={styles.icon} />
                        <Text style={styles.infoText}>{user.email}</Text>
                    </View>
                </View>


                <View style={styles.show_box}>
                    <View style={styles.infoRow}>
                        <Ionicons name="call" size={30} color="#4347e6" style={styles.icon} />
                        <Text style={styles.infoText}>{user.mobile || "Not Available"}</Text>
                    </View>
                </View>

                <View style={styles.show_box}>
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar" size={30} color="#4347e6" style={styles.icon} />
                        <Text style={styles.infoText}>{user.dob || "0 - 0 - 0"}</Text>
                    </View>
                </View>

                <View style={styles.show_box}>
                    <View style={styles.infoRow}>
                        <Ionicons name="location" size={30} color="#4347e6" style={styles.icon} />
                        <Text style={styles.infoText}>{user.location || "Earth"}</Text>
                    </View>
                </View>


                <View style={styles.show_box}>
                    <View style={styles.infoRow}>
                        <Ionicons name="chatbox-ellipses" size={30} color="#4347e6" style={styles.icon} />
                        <Text style={styles.infoText}>{user.bio || "No bio available"}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4347e6",
    },
    topSection: {
        height: 150,
        backgroundColor: "#4347e6",
    },
    body: {
        backgroundColor: "#fff",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: -70,
        marginBottom: 50,
    },
    profile_dp: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 5,
        borderColor: "#fff",
        marginBottom: 15,
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    show_box: {
        width: '90%',
        marginBottom: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
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
});
