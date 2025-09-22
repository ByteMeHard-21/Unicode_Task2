// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const USER_STORAGE_KEY = 'user_date';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {

                    setUser({
                        name: 'xyz',
                        email: 'xyz@example.com',
                        bio: 'This is my bio.',
                        image: null,
                    });
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    const updateUser = async (updatedUser) => {
        const newUser = {
            ...user,
            ...updatedUser,
        };

        setUser(newUser);

        try {
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        } catch (error) {
            console.error('Failed to save user data', error);
        }
    };

    if (loading) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
