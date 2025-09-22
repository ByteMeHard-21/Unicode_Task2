// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { UserContext } from '../context/UserContext';

const ProfileScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);

    return (
        <View style={styles.container}>
            {user.image ? (
                <Image source={{ uri: user.image }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={{ color: '#999' }}>No Profile Image</Text>
                </View>
            )}

            <Text style={styles.label}>Name: <Text style={styles.value}>{user.name}</Text></Text>
            <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
            <Text style={styles.label}>Bio: <Text style={styles.value}>{user.bio}</Text></Text>

            <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center' },
    label: { fontSize: 16, marginBottom: 10 },
    value: { fontWeight: 'bold' },
    image: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
});
